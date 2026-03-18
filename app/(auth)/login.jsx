import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { makeRedirectUri } from "expo-auth-session";

import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";

import { useAuth } from "../../contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {

  const router = useRouter();
  const { login } = useAuth();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  /* ======================
     REDIRECT URI (FIX CHUẨN WEB)
  ====================== */

  const redirectUri = makeRedirectUri({
    useProxy: false,
  });

  /* ======================
     GOOGLE AUTH
  ====================== */

  const [request, response, promptAsync] =
    Google.useAuthRequest({
      webClientId:
        "303218003640-go1576tj0b23m432qdrqavhcuemqjao8.apps.googleusercontent.com",
      redirectUri,
      scopes: ["profile", "email"],
      extraParams: {
        prompt: "consent",
        select_account: true,
      },
    });

  /* ======================
     FACEBOOK AUTH
  ====================== */

  const [fbRequest, fbResponse, fbPromptAsync] =
    Facebook.useAuthRequest({
      clientId: "2391880657993636",
      scopes: ["public_profile", "email"],
      redirectUri,
    });

  /* ======================
     GOOGLE RESPONSE
  ====================== */

  useEffect(() => {
    if (response?.type === "success") {
      (async () => {
        try {
          setSocialLoading(true);

          const token = response.authentication.accessToken;

          const userRes = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const userInfo = await userRes.json();

          /* ✅ CHỈ GỌI LOGIN (KHÔNG GỌI API TRƯỚC) */
          const res = await login({
            provider: "google",
            email: userInfo.email,
            name: userInfo.name,
            avatar: userInfo.picture,
          });

          if (res.success) {
            router.replace("/");
          } else {
            alert(res.message);
          }

        } catch (err) {
          console.log(err);
          alert("Google login failed");
        } finally {
          setSocialLoading(false);
        }
      })();
    }
  }, [response]);

  /* ======================
     FACEBOOK RESPONSE
  ====================== */

  useEffect(() => {
    if (fbResponse?.type === "success") {
      (async () => {
        try {
          setSocialLoading(true);

          const token = fbResponse.authentication.accessToken;

          const userRes = await fetch(
            `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`
          );

          const userInfo = await userRes.json();

          const res = await login({
            provider: "facebook",
            email: userInfo.email,
            name: userInfo.name,
            avatar: userInfo.picture?.data?.url,
            id: userInfo.id,
          });

          if (res.success) {
            router.replace("/");
          } else {
            alert(res.message);
          }

        } catch (err) {
          console.log(err);
          alert("Facebook login failed");
        } finally {
          setSocialLoading(false);
        }
      })();
    }
  }, [fbResponse]);

  /* ======================
     LOGIN NORMAL
  ====================== */

  async function handleLogin() {
    if (!phone || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);

      const res = await login({
        phone,
        password,
      });

      if (res.success) {
        router.replace("/");
      } else {
        alert(res.message);
      }

    } catch (err) {
      alert("Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  }

  /* ======================
     UI
  ====================== */

  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <ThemedView style={{ width: "100%", maxWidth: 420 }}>
        <ThemedText
          style={{
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          Đăng Nhập
        </ThemedText>

        <Input
          placeholder="Số Điện Thoại"
          value={phone}
          onChangeText={setPhone}
        />

        <Input
          placeholder="Mật Khẩu"
          secure
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            backgroundColor: "#c09808",
            paddingVertical: 14,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 20,
            opacity: loading ? 0.7 : 1,
          }}
        >
          <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </ThemedText>
        </TouchableOpacity>

        <Divider />

        <OAuthButton
          title={socialLoading ? "Đang xử lý..." : "Continue with Google"}
          onPress={() => promptAsync({ useProxy: false })}
          disabled={socialLoading}
        />

        <OAuthButton
          title={socialLoading ? "Đang xử lý..." : "Continue with Facebook"}
          onPress={() => fbPromptAsync({ useProxy: false })}
          disabled={socialLoading}
        />

        <AuthFooter router={router} />
      </ThemedView>
    </ThemedView>
  );
}

/* ====================== COMPONENTS ====================== */

function Input({ placeholder, value, onChangeText, secure }) {
  return (
    <ThemedTextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secure}
      onChangeText={onChangeText}
      style={{
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
        fontSize: 16,
      }}
    />
  );
}

function Divider() {
  return (
    <ThemedView style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
      <ThemedView style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
      <ThemedText style={{ marginHorizontal: 10, opacity: 0.6 }}>OR</ThemedText>
      <ThemedView style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
    </ThemedView>
  );
}

function OAuthButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        padding: 13,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 12,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <ThemedText>{title}</ThemedText>
    </TouchableOpacity>
  );
}

function AuthFooter({ router }) {
  return (
    <ThemedView style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
      <ThemedText>Chưa có tài khoản?</ThemedText>
      <TouchableOpacity onPress={() => router.replace("/register")}>
        <ThemedText style={{ color: "#c09808", marginLeft: 6 }}>
          Sign Up
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}