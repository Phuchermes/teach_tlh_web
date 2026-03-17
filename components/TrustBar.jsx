import { View } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function TrustBar(){

return(

<ThemedView
style={{
width:"100%",
alignItems:"center",
paddingVertical:40
}}
>

<ThemedView
style={{
flexDirection:"row",
flexWrap:"wrap",
gap:40,
justifyContent:"center",
maxWidth:1440
}}
>

<Item text="⭐ 100+ học sinh"/>

<Item text="⭐ 5 năm giảng dạy"/>

<Item text="⭐ TOEIC 900+"/>

<Item text="⭐ 95% đậu đại học"/>

</ThemedView>

</ThemedView>

)

}

function Item({text}){

return(

<ThemedView
style={{
paddingHorizontal:20,
paddingVertical:10,
borderRadius:8,
// backgroundColor:"#2a2a3c"
}}
>

<ThemedText style={{fontSize:15}}>
{text}
</ThemedText>

</ThemedView>

)

}

