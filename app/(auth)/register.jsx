import { useState } from "react";
import { TouchableOpacity } from "react-native";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import { useRouter } from "expo-router";

import { useAuth } from "../../contexts/AuthContext";

export default function SignUpScreen(){

const [phone,setPhone]=useState("");
const [name,setName]=useState("");
const [password,setPassword]=useState("");

const [loading,setLoading] = useState(false);

const { register } = useAuth();
const router = useRouter();

/* ======================
REGISTER
====================== */

async function handleRegister(){

if(!name || !phone || !password){
alert("Vui lòng nhập đầy đủ thông tin");
return;
}

if(password.length < 6){
alert("Mật khẩu tối thiểu 6 ký tự");
return;
}

try{

setLoading(true);

const res = await register({
phone,
name,
password
});

if(res.success){
alert("Đăng ký thành công");
router.replace("/login");
}else{
alert(res.message);
}

}catch(err){
alert("Lỗi đăng ký");
}finally{
setLoading(false);
}

}

/* ======================
UI
====================== */

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
Đăng Kí Tài Khoản
</ThemedText>

<Input
placeholder="Họ Và Tên"
value={name}
onChangeText={setName}
/>

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
onPress={handleRegister}
disabled={loading}
style={{
backgroundColor:"#c09808",
paddingVertical:14,
borderRadius:8,
alignItems:"center",
marginTop:10,
opacity: loading ? 0.7 : 1
}}
>

<ThemedText style={{color:"#fff",fontWeight:"600"}}>
{loading ? "Đang xử lý..." : "Đăng Ký"}
</ThemedText>

</TouchableOpacity>

<AuthFooter router={router}/>

</ThemedView>

</ThemedView>

)

}

/* ======================
INPUT
====================== */

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

/* ======================
FOOTER
====================== */

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
Đã có tài khoản?
</ThemedText>

<TouchableOpacity
onPress={()=>router.replace("/login")}
style={{marginLeft:6}}
>
<ThemedText
style={{
color:"#c09808",
fontWeight:"600"
}}
>
Sign In
</ThemedText>
</TouchableOpacity>

</ThemedView>

)

}