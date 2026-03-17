import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const steps = [
{
title: "Placement Test",
desc: "Kiểm tra trình độ đầu vào để xây lộ trình học phù hợp."
},
{
title: "Core Grammar System",
desc: "Xây dựng nền tảng ngữ pháp logic giúp hiểu tiếng Anh nhanh hơn."
},
{
title: "Reading Strategy",
desc: "Học kỹ thuật đọc nhanh và phân tích câu hỏi."
},
{
title: "Listening Training",
desc: "Luyện nghe theo phương pháp Shadowing."
},
{
title: "Mock Tests",
desc: "Thi thử TOEIC định kỳ để theo dõi tiến bộ."
}
];

export default function MethodTimeline(){

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
fontWeight:"bold",
marginBottom:70
}}
>
TLH Learning Method
</ThemedText>

<ThemedView
style={{
maxWidth:1000,
width:"100%"
}}
>

{steps.map((s,i)=>(
<Step key={i} index={i} {...s}/>
))}

</ThemedView>

</ThemedView>

)

}

function Step({title,desc,index}){

return(

<ThemedView
style={{
flexDirection:"row",
marginBottom:50
}}
>

<ThemedView
style={{
width:40,
alignItems:"center"
}}
>

<ThemedView
style={{
width:18,
height:18,
borderRadius:20,
backgroundColor:"#3b82f6"
}}
/>

{index!==4 &&(

<ThemedView
style={{
width:2,
flex:1,
backgroundColor:"#444",
marginTop:6
}}
/>

)}

</ThemedView>

<ThemedView style={{flex:1,paddingLeft:20}}>

<ThemedText
style={{
fontSize:18,
fontWeight:"bold"
}}
>
{title}
</ThemedText>

<ThemedText
style={{
marginTop:6,
opacity:0.7
}}
>
{desc}
</ThemedText>

</ThemedView>

</ThemedView>

)

}

