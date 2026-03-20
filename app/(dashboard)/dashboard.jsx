import { useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import ThemedView from "../../components/ThemedView";
import TrustBar from "../../components/TrustBar";
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

export default function LandingPage() {

  const scrollRef = useRef(null);

  // 🔥 lưu vị trí thật
  const [positions, setPositions] = useState({
    courses: 0,
    teachers: 0,
    contact: 0,
  });

  const scrollTo = (key) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTo({
      y: positions[key] - 80,
      animated: true,
    });
  };

  return (
    <ThemedView style={{ flex: 1 }}>

      {/* NAVBAR */}
      <Navbar
        onNavigate={(section) => {
          if (section === "home") {
            scrollRef.current?.scrollTo({ y: 0, animated: true });
          }
          if (section === "courses") scrollTo("courses");
          if (section === "teachers") scrollTo("teachers");
          if (section === "contact") scrollTo("contact");
        }}
      />

      {/* CONTENT */}
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >

        <Hero />
        <TrustBar />
        <Stats />

        {/* COURSES */}
        <View
          onLayout={(e) =>
            setPositions((prev) => ({
              ...prev,
              courses: e.nativeEvent.layout.y,
            }))
          }
        >
          <CoursesGrid />
        </View>

        {/* TEACHERS */}
        <View
          onLayout={(e) =>
            setPositions((prev) => ({
              ...prev,
              teachers: e.nativeEvent.layout.y,
            }))
          }
        >
          <Teachers />
        </View>

        <Achievements />
        <MethodTimeline />
        <Testimonials />
        <FAQ />
        <CTA />

        {/* CONTACT */}
        <View
          onLayout={(e) =>
            setPositions((prev) => ({
              ...prev,
              contact: e.nativeEvent.layout.y,
            }))
          }
        >
          <Footer />
        </View>

      </ScrollView>

    </ThemedView>
  );
}