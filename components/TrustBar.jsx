import { useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function TrustBar() {

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (

    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: isMobile ? 30 : 40
      }}
    >

      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: isMobile ? 16 : 40,
          justifyContent: "center",
          maxWidth: 1200,
          width: "100%"
        }}
      >

        <Item text="1000+ Học Viên" isMobile={isMobile}/>
        {/* <Item text="5 Năm KN Giảng Dạy" isMobile={isMobile}/> */}
        <Item text="800+ Học viên Đạt 8+, 9+" isMobile={isMobile}/>
        <Item text="95% Học Viên TOEIC Đạt Target" isMobile={isMobile}/>

      </ThemedView>

    </ThemedView>

  );
}

/* ======================
ITEM
====================== */

function Item({ text, isMobile }) {

  return (

    <ThemedView
      style={{
        paddingHorizontal: isMobile ? 14 : 20,
        paddingVertical: isMobile ? 8 : 10,
        borderRadius: 999,

        // 💥 làm nổi bật
        backgroundColor: "rgba(255,255,255,0.05)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.08)"
      }}
    >

      <ThemedText
        style={{
          fontSize: isMobile ? 13 : 15,
          fontWeight: "500"
        }}
      >
        ⭐ {text}
      </ThemedText>

    </ThemedView>

  );
}