import { useState,useEffect } from "react";
import { View,Image,TouchableOpacity } from "react-native";

import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";


/* ======================
BANNERS LOCAL
====================== */

const banners=[

require("../img/students/1.png"),
require("../img/students/2.png"),
require("../img/students/3.png"),
require("../img/students/4.png"),
require("../img/students/5.png"),
require("../img/students/6.png"),
require("../img/students/7.png"),
require("../img/students/8.png"),
require("../img/students/9.png"),
require("../img/students/10.png"),
require("../img/students/11.png"),
require("../img/students/12.png"),
require("../img/students/13.png"),
require("../img/students/14.png")


];

export default function BannerSlider(){

const [i,setI]=useState(0);

/* ======================
AUTO SLIDE
====================== */

useEffect(()=>{

const t=setInterval(()=>{

setI(v=>(v+1)%banners.length);

},10000);

return()=>clearInterval(t);

},[]);

/* ======================
BUTTONS
====================== */

function next(){
setI(v=>(v+1)%banners.length);
}

function prev(){
setI(v=>(v-1+banners.length)%banners.length);
}

/* ======================
UI
====================== */

return(

<ThemedView
style={{
width:"100%",
alignItems:"center",
marginTop:30,
position:"relative",
}}
>

<ThemedText style={{fontSize:28,fontWeight:"bold"}}>
Học sinh nói gì
</ThemedText>

<View
style={{
width:"100%",
maxWidth:800,
position:"relative",
alignItems:"center",paddingVertical:80
}}
>

<Image
source={banners[i]}
style={{
width:"100%",
maxHeight:650
}}
resizeMode="contain"
/>

{/* LEFT ARROW */}

<TouchableOpacity
onPress={prev}
style={{
position:"absolute",
left:-70,
top:"50%",
backgroundColor:"rgba(0,0,0,0.5)",
width:50,
height:50,
borderRadius:25,
alignItems:"center",
justifyContent:"center"
}}
>

<View
style={{
borderLeftWidth:3,
borderBottomWidth:3,
width:12,
height:12,
transform:[{rotate:"45deg"}],
borderColor:"#fff"
}}
/>

</TouchableOpacity>

{/* RIGHT ARROW */}

<TouchableOpacity
onPress={next}
style={{
position:"absolute",
right:-70,
top:"50%",
backgroundColor:"rgba(0,0,0,0.5)",
width:50,
height:50,
borderRadius:25,
alignItems:"center",
justifyContent:"center"
}}
>

<View
style={{
borderRightWidth:3,
borderTopWidth:3,
width:12,
height:12,
transform:[{rotate:"45deg"}],
borderColor:"#fff"
}}
/>

</TouchableOpacity>

{/* DOTS */}

<View
style={{
position:"absolute",
bottom:10,
flexDirection:"row",
gap:8
}}
>

{banners.map((_,index)=>(

<View
key={index}
style={{
width:10,
height:10,
borderRadius:5,
backgroundColor:index===i?"#fff":"rgba(255,255,255,0.4)"
}}
/>

))}

</View>

</View>

</ThemedView>

)

}