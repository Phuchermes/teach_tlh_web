import { ScrollView } from "react-native";
import ThemedView from "../../components/ThemedView";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Stats from "../../components/Stats";
import CoursesGrid from "../../components/CoursesGrid";
import Teachers from "../../components/Teachers";
import MethodTimeline from "../../components/MethodTimeline";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Achievements from "../../components/Achievements";

export default function LandingPage(){

return(

<ThemedView style={{flex:1}}>

<Navbar/>

<ScrollView
showsVerticalScrollIndicator={false}
>

<Hero/>

{/* <TrustBar/> */}

<Stats/>

<CoursesGrid/>

<Teachers/>

<Achievements/>

<MethodTimeline/>

<Testimonials/>

<FAQ/>

<CTA/>

<Footer/>

</ScrollView>

</ThemedView>

)

}