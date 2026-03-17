import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import ThemedTextInput from "../components/ThemedTextInput";

export default function CourseRegister(){

const router = useRouter();

const [name,setName] = useState("");
const [phone,setPhone] = useState("");
const [email,setEmail] = useState("");
const [course,setCourse] = useState("");

function handleSubmit(){

if(!name || !phone){
alert("Vui lòng nhập đầy đủ thông tin");
return;
}

alert("Đăng ký thành công");

router.back();

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

<ThemedView style={{width:"100%",maxWidth:500}}>

<ThemedText
style={{
fontSize:32,
fontWeight:"bold",
marginBottom:30
}}
>
Đăng ký học
</ThemedText>

<Input
placeholder="Họ và tên"
value={name}
onChangeText={setName}
/>

<Input
placeholder="Số điện thoại"
value={phone}
onChangeText={setPhone}
/>

<Input
placeholder="Email"
value={email}
onChangeText={setEmail}
/>

<Input
placeholder="Khóa học muốn đăng ký"
value={course}
onChangeText={setCourse}
/>

<TouchableOpacity
onPress={handleSubmit}
style={{
backgroundColor:"#3b82f6",
paddingVertical:14,
borderRadius:10,
alignItems:"center",
marginTop:10
}}
>

<ThemedText
style={{
color:"white",
fontWeight:"600"
}}
>
Gửi đăng ký
</ThemedText>

</TouchableOpacity>

</ThemedView>

</ThemedView>

)

}

function Input({placeholder,value,onChangeText}){

return(

<ThemedTextInput
placeholder={placeholder}
value={value}
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