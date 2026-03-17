import { Image, Linking, TouchableOpacity } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";
export default function Hero(){

    const {user, logout} = useAuth();

function openFanpage(){
Linking.openURL("https://www.facebook.com/TLHACADEMYGOVAP145");
}

return(

<ThemedView
style={{
width:"100%",
alignItems:"center",
paddingVertical:120
}}
>

<ThemedView
style={{
flexDirection:"row",
alignItems:"center",
maxWidth:1440,
width:"100%",
paddingHorizontal:20,
gap:40
}}
>

<ThemedView style={{flex:1}}>

<ThemedText
style={{
fontSize:56,
fontWeight:"bold",
lineHeight:64
}}
>
Teach with heart
</ThemedText>

<ThemedText
style={{
fontSize:56,
fontWeight:"bold",
lineHeight:64
}}
>
Learn with mind
</ThemedText>

<ThemedText
style={{
marginTop:20,
fontSize:18,
opacity:0.7
}}
>
Phương pháp học logic giúp học sinh
tăng điểm TOEIC và thi đại học.
</ThemedText>

<ThemedView style={{height:30}}/>

<ThemedView style={{flexDirection:"row",gap:20}}>

<Button
text="Đăng ký tư vấn"
onPress={openFanpage}
/>

<Button
text="Đăng ký khóa học"
outline
onPress={openFanpage}
/>


{/* <ThemedView style={{flexDirection:"row",alignItems:"center"}}>

{user ? (

<TouchableOpacity onPress={logout}>
<ThemedText style={{color:"#fff"}}>Logout</ThemedText>
</TouchableOpacity>

) : (

<TouchableOpacity onPress={()=>router.push("/login")}>
<ThemedText style={{color:"#fff"}}>Login</ThemedText>
</TouchableOpacity>

)}

</ThemedView> */}



</ThemedView>

<ThemedView style={{marginTop:20}}>

<ThemedText style={{opacity:0.6}}>
⭐ Hơn 100+ học sinh đã học tại TLH
</ThemedText>

</ThemedView>

</ThemedView>

<Image
source={require("../img/class/IMG_3864.png")}
style={{
width:520,
height:360,
borderRadius:20
}}
resizeMode="cover"
/>

</ThemedView>

</ThemedView>

)

}