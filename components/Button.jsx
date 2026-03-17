import { TouchableOpacity } from "react-native";
import ThemedText from "./ThemedText";

export default function Button({ text, outline, onPress }){

return(

<TouchableOpacity
onPress={onPress}
style={{
backgroundColor: outline ? "transparent" : "#c09808",
borderWidth: outline ? 2 : 0,
borderColor:"#c09808",
paddingVertical:12,
paddingHorizontal:24,
borderRadius:10
}}
>

<ThemedText
style={{
color: outline ? "#c09808" : "#fff",
fontWeight:"600"
}}
>
{text}
</ThemedText>

</TouchableOpacity>

)

}