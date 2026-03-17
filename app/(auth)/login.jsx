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

export default function SignInScreen(){

const router = useRouter();
const {login} = useAuth();

const [phone, setPhone] = useState("");
const [password,setPassword] = useState("");

/* GOOGLE AUTH */

const redirectUri = makeRedirectUri();

const [request,response,promptAsync] =
Google.useAuthRequest({

webClientId:
"303218003640-go1576tj0b23m432qdrqavhcuemqjao8.apps.googleusercontent.com",

redirectUri,

scopes:["profile","email"],

extraParams:{
prompt:"consent",
select_account:true
}

});

const [fbRequest, fbResponse, fbPromptAsync] =
Facebook.useAuthRequest({

clientId: "2391880657993636",
scopes:["public_profile","email"],
redirectUri

});

/* HANDLE GOOGLE RESPONSE */

useEffect(()=>{

if(response?.type === "success"){

const token = response.authentication.accessToken;

fetch("https://www.googleapis.com/oauth2/v2/userinfo",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(async userInfo=>{

const res = await fetch("http://100.113.47.2:3000/api/auth/social-login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:userInfo.name,
email:userInfo.email,
avatar:userInfo.picture,
provider:"google"
})
})

const data = await res.json()

await login({
provider: "google",
email: userInfo.email,
name: userInfo.name,
avatar: userInfo.picture
})
router.replace("/")

})

}

},[response]);

useEffect(()=>{

if(fbResponse?.type === "success"){

const token = fbResponse.authentication.accessToken;

fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`)
.then(res=>res.json())
.then(async userInfo=>{

const res = await fetch("http://100.113.47.2:3000/api/auth/social-login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:userInfo.name,
email:userInfo.email,
avatar:userInfo.picture?.data?.url,
provider:"facebook",
id:userInfo.id
})
})

const data = await res.json()

await login({
name:userInfo.name,
email:userInfo.email,
avatar:userInfo.picture?.data?.url,
provider:"facebook",
id:userInfo.id
})

router.replace("/")

})

}

},[fbResponse]);

async function handleLogin(){

if(!phone || !password){
alert("Vui lòng nhập đầy đủ thông tin");
return;
}

const res = await login({
phone: phone,
password: password
});

if(res.success){
router.replace("/");
}else{
alert(res.message);
}

}

return(

<ThemedView
style={{
flex:1,
alignItems:"center",
justifyContent:"center",
padding:20
}}
>

<ThemedView style={{width:"100%",maxWidth:420}}>

<ThemedText
style={{
fontSize:32,
fontWeight:"bold",
marginBottom:30
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
style={{
backgroundColor:"#c09808",
paddingVertical:14,
borderRadius:8,
alignItems:"center",
marginBottom:20
}}
>

<ThemedText style={{color:"#fff",fontWeight:"600"}}>
Đăng Nhập
</ThemedText>

</TouchableOpacity>

<TouchableOpacity
onPress={()=>router.push("/forgot-password")}
style={{alignSelf:"flex-end", marginBottom:20}}
>
<ThemedText
style={{
color:"#c09808",
fontWeight:"500"
}}
>
Quên mật khẩu?
</ThemedText>
</TouchableOpacity>

<Divider/>

<OAuthButton
title="Continue with Google"
onPress={()=>promptAsync()}
/>

<OAuthButton
title="Continue with Facebook"
onPress={()=>fbPromptAsync()}
/>

<AuthFooter router={router}/>

</ThemedView>

</ThemedView>

)

}

/* INPUT */

function Input({placeholder,value,onChangeText,secure}){

return(

<ThemedTextInput
placeholder={placeholder}
value={value}
secureTextEntry={secure}
onChangeText={onChangeText}
style={{
borderWidth:1,
borderColor:"#ddd",
padding:14,
borderRadius:8,
marginBottom:16,
fontSize:16
}}
/>

)

}

/* DIVIDER */

function Divider(){

return(

<ThemedView
style={{
flexDirection:"row",
alignItems:"center",
marginVertical:20
}}
>

<ThemedView style={{flex:1,height:1,backgroundColor:"#ddd"}}/>

<ThemedText style={{marginHorizontal:10,opacity:0.6}}>
OR
</ThemedText>

<ThemedView style={{flex:1,height:1,backgroundColor:"#ddd"}}/>

</ThemedView>

)

}

/* OAUTH BUTTON */

function OAuthButton({title,onPress}){

const isGoogle = title.includes("Google");
const isFacebook = title.includes("Facebook");

const backgroundColor =
isGoogle ? "#ffffff" :
isFacebook ? "#1877F2" :
"#f5f5f5";

const borderColor =
isGoogle ? "#ddd" :
isFacebook ? "#1877F2" :
"#ddd";

const textColor =
isGoogle ? "#222" :
isFacebook ? "#fff" :
"#222";

return(

<TouchableOpacity
onPress={onPress}
style={{
flexDirection:"row",
alignItems:"center",
justifyContent:"center",
paddingVertical:13,
borderRadius:8,
borderWidth:1,
borderColor:borderColor,
backgroundColor:backgroundColor,
marginBottom:12
}}
>

<Icon type={isGoogle ? "google" : isFacebook ? "facebook" : ""}/>

<ThemedText
style={{
color:textColor,
fontWeight:"500",
marginLeft:10
}}
>
{title}
</ThemedText>

</TouchableOpacity>

)

}

function Icon({type}){

if(type==="google"){
return(
<AntDesign
name="google"
size={18}
color="#DB4437"
/>
)
}

if(type==="facebook"){
return(
<FontAwesome
name="facebook"
size={18}
color="#fff"
/>
)
}

return null

}

function AuthFooter({router}){

return(

<ThemedView
style={{
flexDirection:"row",
justifyContent:"center",
marginTop:20
}}
>

<ThemedText style={{opacity:0.7}}>
Chưa có tài khoản?
</ThemedText>

<TouchableOpacity
onPress={()=>router.replace("/register")}
style={{marginLeft:6}}
>
<ThemedText
style={{
color:"#c09808",
fontWeight:"600"
}}
>
Sign Up
</ThemedText>
</TouchableOpacity>

</ThemedView>

)

}