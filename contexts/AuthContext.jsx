import { createContext, useContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_URL from "../config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  /* ======================
     STORAGE HELPER (web + mobile)
  ====================== */

  const storage = {
    async get(key) {
      if (Platform.OS === "web") {
        return localStorage.getItem(key);
      }
      return await AsyncStorage.getItem(key);
    },
    async set(key, value) {
      if (Platform.OS === "web") {
        localStorage.setItem(key, value);
      } else {
        await AsyncStorage.setItem(key, value);
      }
    },
    async remove(key) {
      if (Platform.OS === "web") {
        localStorage.removeItem(key);
      } else {
        await AsyncStorage.removeItem(key);
      }
    }
  };

  /* ======================
     LOAD USER
  ====================== */

  useEffect(() => {
    async function loadUser() {
      try {
        const savedUser = await storage.get("user");
        const token = await storage.get("token");

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

      } catch (err) {
        console.log(err);
      }
    }

    loadUser();
  }, []);

  /* ======================
     LOGIN
  ====================== */

  async function login(data) {
    try {

      let res;

      /* ===== NORMAL LOGIN ===== */
      if (data.phone && data.password) {

        res = await axios.post(`${API_URL}/api/auth/login`, {
          phone: data.phone,
          password: data.password
        });

      } else {

        /* ===== SOCIAL LOGIN ===== */
        res = await axios.post(
          `${API_URL}/api/auth/social-login`,
          data
        );

      }

      const { user: userData, token } = res.data;

      /* ===== SET STATE ===== */
      setUser(userData);

      /* ===== SAVE STORAGE ===== */
      await storage.set("user", JSON.stringify(userData));

      if (token) {
        await storage.set("token", token);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      return { success: true };

    } catch (err) {

      console.log("LOGIN ERROR:", err.response?.data);
      console.log("FULL ERROR:", err);

      return {
        success: false,
        message: err.response?.data?.msg || "Login failed"
      };

    }
  }

  /* ======================
     REGISTER
  ====================== */

  async function register({ phone, name, password }) {
    try {

      await axios.post(`${API_URL}/api/auth/register`, {
        phone,
        name,
        password
      });

      return { success: true };

    } catch (err) {

      console.log("REGISTER ERROR:", err.response?.data);

      return {
        success: false,
        message: err.response?.data?.msg || "Register failed"
      };

    }
  }

  /* ======================
     LOGOUT
  ====================== */

  async function logout() {

    setUser(null);

    await storage.remove("user");
    await storage.remove("token");

    delete axios.defaults.headers.common["Authorization"];

  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}