import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function Stats(){

return(

<ThemedView
style={{
width:"100%",
alignItems:"center",
paddingVertical:80
}}
>

<ThemedView
style={{
flexDirection:"row",
flexWrap:"wrap",
gap:60,
justifyContent:"center",
maxWidth:1200
}}
>

<Stat number="1000+" label="HỌC VIÊN"/>

<Stat number="+5" label="KN GIẢNG DẠY"/>

<Stat number="800+" label="HỌC VIÊN ĐẠT 8+, 9+"/>

<Stat number="100+" label="HỌC VIÊN DƯỚI TB LÊN 6+, 7+"/>

<Stat number="95%" label="HỌC VIÊN TOEIC ĐẠT TARGET"/>



</ThemedView>

</ThemedView>

)

}

function Stat({number,label}){

return(

<ThemedView style={{alignItems:"center"}}>

<ThemedText
style={{
fontSize:34,
fontWeight:"bold"
}}
>
{number}
</ThemedText>

<ThemedText
style={{
opacity:0.7,
marginTop:6
}}
>
{label}
</ThemedText>

</ThemedView>

)

}

