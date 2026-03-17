import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import { useEffect } from "react";
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth(){

const router = useRouter();

const redirectUri = makeRedirectUri();

const [request,response,promptAsync] =
Google.useAuthRequest({

webClientId:
"303218003640-go1576tj0b23m432qdrqavhcuemqjao8.apps.googleusercontent.com",

redirectUri,

scopes:["profile","email"]

});

useEffect(()=>{

if(response?.type === "success"){

const token = response.authentication.accessToken;

fetch("https://www.googleapis.com/oauth2/v2/userinfo",{
headers:{
Authorization:`Bearer ${token}`
}
})
.then(res=>res.json())
.then(userInfo=>{

login(userInfo);

router.replace("/");

});

}

},[response]);

return {promptAsync};

}