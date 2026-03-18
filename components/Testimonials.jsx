import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, useWindowDimensions } from "react-native";

import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

/* ======================
BANNERS
====================== */

const banners = [
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
  require("../img/students/14.png"),
];

export default function Testimonials() {

  const [i, setI] = useState(0);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  /* ======================
  AUTO SLIDE
  ====================== */

  useEffect(() => {
    const t = setInterval(() => {
      setI(v => (v + 1) % banners.length);
    }, 6000); // 💥 giảm còn 6s cho mượt

    return () => clearInterval(t);
  }, []);

  /* ======================
  NAV
  ====================== */

  function next() {
    setI(v => (v + 1) % banners.length);
  }

  function prev() {
    setI(v => (v - 1 + banners.length) % banners.length);
  }

  /* ======================
  UI
  ====================== */

  return (

    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        marginTop: 60
      }}
    >

      <ThemedText style={{ fontSize: isMobile ? 22 : 28, fontWeight: "bold" }}>
        Học sinh nói gì
      </ThemedText>

      <View
        style={{
          width: "100%",
          maxWidth: 800,
          position: "relative",
          alignItems: "center",
          paddingVertical: isMobile ? 40 : 80
        }}
      >

        {/* IMAGE */}
        <Image
          source={banners[i]}
          style={{
            width: "100%",
            height: isMobile ? 300 : 500, // 💥 fix mobile
            borderRadius: 16
          }}
          resizeMode="contain"
        />

        {/* LEFT */}
        <TouchableOpacity
          onPress={prev}
          style={{
            position: "absolute",
            left: isMobile ? 10 : -70,
            top: "50%",
            marginTop: -25,
            backgroundColor: "rgba(0,0,0,0.5)",
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              borderLeftWidth: 3,
              borderBottomWidth: 3,
              width: 10,
              height: 10,
              transform: [{ rotate: "45deg" }],
              borderColor: "#fff"
            }}
          />
        </TouchableOpacity>

        {/* RIGHT */}
        <TouchableOpacity
          onPress={next}
          style={{
            position: "absolute",
            right: isMobile ? 10 : -70,
            top: "50%",
            marginTop: -25,
            backgroundColor: "rgba(0,0,0,0.5)",
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              borderRightWidth: 3,
              borderTopWidth: 3,
              width: 10,
              height: 10,
              transform: [{ rotate: "45deg" }],
              borderColor: "#fff"
            }}
          />
        </TouchableOpacity>

        {/* DOTS */}
        <View
          style={{
            position: "absolute",
            bottom: 10,
            flexDirection: "row",
            gap: 8
          }}
        >
          {banners.map((_, index) => (
            <View
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  index === i ? "#fff" : "rgba(255,255,255,0.4)"
              }}
            />
          ))}
        </View>

      </View>

    </ThemedView>

  );
}