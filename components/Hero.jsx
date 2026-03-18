import { Image, Linking, useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import Button from "./Button";
import { useAuth } from "../contexts/AuthContext";

export default function Hero() {
  const { user, logout } = useAuth();
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  function openFanpage() {
    Linking.openURL("https://www.facebook.com/TLHACADEMYGOVAP145");
  }

  return (
    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: isMobile ? 60 : 120,
      }}
    >
      <ThemedView
        style={{
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          maxWidth: 1440,
          width: "100%",
          paddingHorizontal: 20,
          gap: 40,
        }}
      >
        {/* TEXT */}
        <ThemedView style={{ flex: 1 }}>
          <ThemedText
            style={{
              fontSize: isMobile ? 32 : 56,
              fontWeight: "bold",
              lineHeight: isMobile ? 40 : 64,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Teach with heart
          </ThemedText>

          <ThemedText
            style={{
              fontSize: isMobile ? 32 : 56,
              fontWeight: "bold",
              lineHeight: isMobile ? 40 : 64,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Learn with mind
          </ThemedText>

          <ThemedText
            style={{
              marginTop: 20,
              fontSize: isMobile ? 16 : 18,
              opacity: 0.7,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Phương pháp học logic giúp học sinh
            tăng điểm TOEIC và thi đại học.
          </ThemedText>

          <ThemedView style={{ height: 30 }} />

          <ThemedView
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: 20,
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <Button text="Đăng ký tư vấn" onPress={openFanpage} />
            <Button text="Đăng ký khóa học" outline onPress={openFanpage} />
          </ThemedView>

          <ThemedView style={{ marginTop: 20 }}>
            <ThemedText style={{ opacity: 0.6, textAlign: isMobile ? "center" : "left" }}>
              ⭐ Hơn 100+ học sinh đã học tại TLH
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* IMAGE */}
        <Image
          source={require("../img/class/IMG_3864.png")}
          style={{
            width: isMobile ? "100%" : 520,
            height: isMobile ? 220 : 360,
            borderRadius: 20,
          }}
          resizeMode="cover"
        />
      </ThemedView>
    </ThemedView>
  );
}