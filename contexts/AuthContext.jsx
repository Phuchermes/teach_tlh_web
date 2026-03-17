import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://100.113.47.2:3000";

export function AuthProvider({ children }) {

const [user,setUser] = useState(null);

/* load user khi mở app */

useEffect(()=>{

async function loadUser(){

try{

const saved = await AsyncStorage.getItem("user");

if(saved){
setUser(JSON.parse(saved));
}

}catch(err){
console.log(err);
}

}

loadUser();

},[]);


/* LOGIN */

async function login(data){

try{

if(data.phone && data.password){

const res = await axios.post(`${API_URL}/api/auth/login`,{
phone:data.phone,
password:data.password
});

console.log("LOGIN REQUEST", data.phone, data.password);

const {user: userData, token} = res.data;

setUser(userData);

await AsyncStorage.setItem("user",JSON.stringify(userData));
await AsyncStorage.setItem("token",token);

return {success:true};

}
else{

/* social login */

const res = await axios.post(
`${API_URL}/api/auth/social-login`,
data
);

const {user: userData} = res.data;

setUser(userData);

await AsyncStorage.setItem(
"user",
JSON.stringify(userData)
);

return {success:true};

}

}catch(err){
console.log("LOGIN ERROR:",err.response?.data);
console.log("FULL ERROR:", err);
console.log("RESPONSE:", err.response);
console.log("REQUEST:", err.request);
return {
success:false,
message:err.response?.data?.msg || "Login failed"
};

}

}


/* REGISTER */

async function register({phone,name,password}){

try{

const res = await axios.post(`${API_URL}/api/auth/register`,{
phone,
name,
password
});

/* backend chỉ trả msg */

return {success:true};

}catch(err){
console.log("REGISTER ERROR:",err.response?.data);
console.log("FULL ERROR:", err);
console.log("RESPONSE:", err.response);
console.log("REQUEST:", err.request);
return {
success:false,
message:err.response?.data?.msg || "Register failed"
};

}

}


/* LOGOUT */

async function logout(){

setUser(null);

await AsyncStorage.removeItem("user");
await AsyncStorage.removeItem("token");

}

return(

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

)

}

export function useAuth(){
return useContext(AuthContext);
}