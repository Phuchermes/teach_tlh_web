import { Image } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const teachers=[
{
name:"Ms Lan Hương",
score:"TOEIC 990+",
info: "- Cử nhân Sư phạm Anh - ĐH Sư phạm TP.HCM,\n- Thạc sĩ Ngôn ngữ Anh - ĐH Công nghệ TP.HCM",
exp: "- Trên 5 năm kinh nghiệm luyện thi 90% học sinh 8+, 9+, dưới TB lên 6+, 7+, TOEIC cấp tốc 500+",
slogan:"TÂM Ở ĐÂU - TẦM Ở ĐÓ\nDạy bằng tất cả sự trân trọng",
}

];

export default function Teachers(){

return(

<ThemedView
style={{
width:"100%",
alignItems:"center",
paddingVertical:100
}}
>

<ThemedText
style={{
fontSize:28,
fontWeight:"bold",
marginBottom:40
}}
>
Giáo viên
</ThemedText>

<ThemedView
style={{
flexDirection:"row",
flexWrap:"wrap",
gap:40,
justifyContent:"center"
}}
>

{teachers.map((t,i)=>(
<TeacherCard key={i} {...t}/>
))}

</ThemedView>

</ThemedView>

)

}

function TeacherCard({name,score, info,exp, slogan,img}){

return(

<ThemedView
style={{
width:850,
alignItems:"center",
gap:5
}}
>

<Image
source={require("../img/class/IMG_3848.jpg")}
style={{
width:120,
height:120,
borderRadius:60
}}
/>

<ThemedView style={{height:25}}/>

<ThemedText
style={{
fontWeight:"bold",
fontSize:25
}}
>
{name}
</ThemedText>

<ThemedText
style={{
opacity:1,fontSize:25, gap:5
}}
>
{score}
</ThemedText>

<ThemedText
style={{
opacity:1,fontSize:18
}}
>
{info}
</ThemedText>

<ThemedText
style={{
opacity:1,fontSize:18
}}
>
{exp}
</ThemedText>

<ThemedText
style={{
opacity:1,fontSize:18
}}
>
{slogan}
</ThemedText>

</ThemedView>

)

}

