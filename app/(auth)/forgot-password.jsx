import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";

import axios from "axios";

const API_URL = "http://100.113.47.2:3000";

/* STYLE */

const inputStyle = {
borderWidth:1,
borderColor:"#ddd",
padding:12,
borderRadius:8,
marginBottom:12,
fontSize:15
}

const buttonStyle = {
backgroundColor:"#c09808",
paddingVertical:12,
borderRadius:8,
alignItems:"center",
marginTop:4
}

export default function ForgotPassword(){

const [phone,setPhone] = useState("");
const [otp,setOtp] = useState("");
const [serverOtp,setServerOtp] = useState("");
const [password,setPassword] = useState("");
const router = useRouter();
const [step,setStep] = useState(1);

/* STEP 1: REQUEST OTP */

async function handleRequestOTP(){

if(!phone){
alert("Nhập số điện thoại");
return;
}

try{

const res = await axios.post(`${API_URL}/api/auth/request-otp`,{
phone
});

setServerOtp(res.data.otp);

setStep(2);

}catch(err){

alert(err?.response?.data?.msg || "Lỗi gửi OTP");

}

}

/* STEP 2: VERIFY OTP */

async function handleVerifyOTP(){

if(!otp){
alert("Nhập OTP");
return;
}

try{

await axios.post(`${API_URL}/api/auth/verify-otp`,{
phone,
otp
});

setStep(3);

}catch(err){

alert(err?.response?.data?.msg || "OTP sai");

}

}

/* STEP 3: RESET PASSWORD */

async function handleReset(){

if(!password){
alert("Nhập mật khẩu mới");
return;
}

if(password.length < 6){
alert("Mật khẩu tối thiểu 6 ký tự");
return;
}

try{

await axios.post(`${API_URL}/api/auth/reset-password`,{
phone,
password,
otp
});

alert("Đổi mật khẩu thành công");

router.replace("/login");

}catch(err){

alert(err?.response?.data?.msg || "Lỗi reset mật khẩu");

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

<ThemedText style={{fontSize:26,fontWeight:"bold",marginBottom:20}}>
Quên mật khẩu
</ThemedText>

{/* PHONE */}

<ThemedTextInput
placeholder="Số điện thoại"
value={phone}
onChangeText={setPhone}
style={inputStyle}
/>

{/* STEP 1 */}

{step === 1 && (

<TouchableOpacity
onPress={handleRequestOTP}
style={buttonStyle}
>

<ThemedText style={{color:"#fff",fontWeight:"600"}}>
Gửi OTP
</ThemedText>

</TouchableOpacity>

)}

{/* STEP 2 */}

{step >= 2 && (

<>

<ThemedText style={{marginBottom:6,fontSize:22,opacity:1, gap:5}}>
Mã OTP: {serverOtp}
</ThemedText>

<ThemedTextInput
placeholder="Nhập OTP"
value={otp}
onChangeText={setOtp}
keyboardType="number-pad"
style={inputStyle}
/>

{step === 2 && (

<TouchableOpacity
onPress={handleVerifyOTP}
style={buttonStyle}
>

<ThemedText style={{color:"#fff",fontWeight:"600"}}>
Xác nhận OTP
</ThemedText>

</TouchableOpacity>

)}

</>

)}

{/* STEP 3 */}

{step === 3 && (

<>

<ThemedTextInput
placeholder="Mật khẩu mới"
value={password}
onChangeText={setPassword}
secureTextEntry
style={inputStyle}
/>

<TouchableOpacity
onPress={handleReset}
style={buttonStyle}
>

<ThemedText style={{color:"#fff",fontWeight:"600"}}>
Reset mật khẩu
</ThemedText>

</TouchableOpacity>

</>

)}

</ThemedView>

</ThemedView>

)

}