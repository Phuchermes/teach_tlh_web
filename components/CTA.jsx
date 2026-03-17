import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function CTA(){

const router = useRouter();

/* ================================
STATE
================================ */

const [slots,setSlots] = useState(20);

/* ================================
REGISTER
================================ */

function handleRegister(){

Linking.openURL("https://www.facebook.com/TLHACADEMYGOVAP145");

}

/* ================================
UI
================================ */

return(

<ThemedView
style={{
width:"100%",
alignItems:"center",
paddingVertical:120
}}
>

<ThemedText
style={{
fontSize:32,
fontWeight:"bold"
}}
>
Sẵn sàng bắt đầu học?
</ThemedText>

<ThemedText
style={{
opacity:0.7,
marginTop:10
}}
>
Đăng ký tư vấn miễn phí ngay hôm nay
</ThemedText>

{/* BUTTON */}

<TouchableOpacity
onPress={handleRegister}
style={{
marginTop:30,
backgroundColor:"#3b82f6",
paddingHorizontal:30,
paddingVertical:14,
borderRadius:10
}}
>

<ThemedText
style={{
color:"white",
fontWeight:"600",
fontSize:16
}}
>
Đăng ký học
</ThemedText>

</TouchableOpacity>

</ThemedView>

)

}