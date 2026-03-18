import { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, useWindowDimensions } from "react-native";

import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const achievements = [
  require("../img/cert/23592026.png"),
  require("../img/cert/23492026.png"),
  require("../img/cert/IMG_4140.jpg"),
  require("../img/cert/IMG_4142.jpg"),
  require("../img/cert/IMG_4153.jpg"),
];

export default function Achievements() {
  const [i, setI] = useState(0);
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  useEffect(() => {
    const t = setInterval(() => {
      setI((v) => (v + 1) % achievements.length);
    }, 10000);

    return () => clearInterval(t);
  }, []);

  function next() {
    setI((v) => (v + 1) % achievements.length);
  }

  function prev() {
    setI((v) => (v - 1 + achievements.length) % achievements.length);
  }

  return (
    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <ThemedText style={{ fontSize: 28, fontWeight: "bold" }}>
        Thành tích học sinh
      </ThemedText>

      <ThemedView
        style={{
          width: "100%",
          maxWidth: 800,
          position: "relative",
          alignItems: "center",
          paddingVertical: isMobile ? 30 : 80,
        }}
      >
        <Image
          source={achievements[i]}
          style={{
            width: "100%",
            height: isMobile ? 250 : 500,
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
            backgroundColor: "rgba(0,0,0,0.5)",
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderLeftWidth: 3,
              borderBottomWidth: 3,
              width: 10,
              height: 10,
              transform: [{ rotate: "45deg" }],
              borderColor: "#fff",
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
            backgroundColor: "rgba(0,0,0,0.5)",
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderRightWidth: 3,
              borderTopWidth: 3,
              width: 10,
              height: 10,
              transform: [{ rotate: "45deg" }],
              borderColor: "#fff",
            }}
          />
        </TouchableOpacity>

        {/* DOTS */}
        <ThemedView
          style={{
            position: "absolute",
            bottom: 10,
            flexDirection: "row",
            gap: 8,
          }}
        >
          {achievements.map((_, index) => (
            <ThemedView
              key={index}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  index === i ? "#fff" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}