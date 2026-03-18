import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function CTA() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  const [slots, setSlots] = useState(20);

  function handleRegister() {
    Linking.openURL("https://www.facebook.com/TLHACADEMYGOVAP145");
  }

  return (
    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: isMobile ? 60 : 120,
        paddingHorizontal: 20,
      }}
    >
      <ThemedText
        style={{
          fontSize: isMobile ? 24 : 32,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Sẵn sàng bắt đầu học?
      </ThemedText>

      <ThemedText
        style={{
          opacity: 0.7,
          marginTop: 10,
          textAlign: "center",
        }}
      >
        Đăng ký tư vấn miễn phí ngay hôm nay
      </ThemedText>

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          marginTop: 30,
          backgroundColor: "#3b82f6",
          paddingHorizontal: 30,
          paddingVertical: 14,
          borderRadius: 10,
        }}
      >
        <ThemedText
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 16,
          }}
        >
          Đăng ký học
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}