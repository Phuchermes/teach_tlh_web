import { View, TouchableOpacity, Linking, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer"

export default function RegisterGift() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const openFanpage = () => {
    Linking.openURL("https://www.facebook.com/share/1Cpzk4pFVn/"); // thay link page
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* CARD */}
      <ThemedView
        style={{
          width: "100%",
          maxWidth: 700,
          padding: isMobile ? 20 : 40,
          borderRadius: 20,
          backgroundColor: "rgba(255,255,255,0.03)",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* TITLE */}
        <ThemedText
          style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: "#c09808",
          }}
        >
          🎁 Đăng kí sớm để nhận quà siêu dễ thương
        </ThemedText>

        {/* STEPS */}
        <Step text="Bước 1: Quét mã hoặc bấm vào link để truy cập fanpage" />
        <Step text="Bước 2: Like + Share bài trên trang cá nhân" />
        <Step text="Bước 3: Tag 3 người bạn để cùng đăng kí học chung và nhận quà" />
        <Step text="Bước 4: Chụp màn hình gửi cho page" />
        <Spacer/>
        <ThemedText 
        style={{
            fontSize: isMobile ? 22 : 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
            color: "#c07608",
          }}>🎁 Số lượng có hạn: 20 bạn đầu tiên</ThemedText>
        {/* <Step text="Số lượng có hạn: 20 bạn đầu tiên" /> */}

        {/* BUTTON */}
        <TouchableOpacity
          onPress={openFanpage}
          style={{
            marginTop: 30,
            backgroundColor: "#4832c5",
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
            👉 Đi tới Fanpage
          </ThemedText>
        </TouchableOpacity>

        {/* BACK */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginTop: 12,
            alignItems: "center",
          }}
        >
          <ThemedText style={{ opacity: 0.6 }}>
            ← Quay lại
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

/* ====================== */

function Step({ text }) {
  return (
    <ThemedText
      style={{
        marginBottom: 10,
        fontSize: 16,
        lineHeight: 22,
        opacity: 0.9,
      }}
    >
      {text}
    </ThemedText>
  );
}