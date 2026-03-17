import { View, Image } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const courses=[
{
title:"TOEIC Mastery",
img: require("../img/class/IMG_3859.png")
},
{
title:"THPT English",
img: require("../img/class/IMG_3853.png")
},
{
title:"Luyện Thi Đại Học",
img: require("../img/class/IMG_3869.png")
}
];

export default function CoursesGrid(){

return(

<ThemedView style={{alignItems:"center",paddingVertical:80}}>

<ThemedText
style={{fontSize:28,fontWeight:"bold"}}
>
Khóa học nổi bật
</ThemedText>

<ThemedView
style={{
flexDirection:"row",
gap:30,
marginTop:40
}}
>

{courses.map((c,i)=>(
<CourseCard key={i} {...c}/>
))}

</ThemedView>

</ThemedView>

)

}

function CourseCard({title,img}){

return(

<ThemedView
style={{
width:340,
borderRadius:16,
padding:16
}}
>

<Image
source={img}   // ⭐ sửa ở đây
style={{
width:"100%",
height:200,
borderRadius:12
}}
resizeMode="cover"
/>

<ThemedView style={{height:12}}/>

<ThemedText style={{fontSize:18,fontWeight:"bold"}}>
{title}
</ThemedText>

</ThemedView>

)

}