import { useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function Stats() {

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (

    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: isMobile ? 50 : 80
      }}
    >

      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 1200,
          width: "100%",
          gap: isMobile ? 30 : 60
        }}
      >

        <Stat number="1000+" label="HỌC VIÊN" isMobile={isMobile}/>
        {/* <Stat number="+5" label="KN GIẢNG DẠY" isMobile={isMobile}/> */}
        <Stat number="800+" label="HỌC VIÊN ĐẠT 8+, 9+" isMobile={isMobile}/>
        <Stat number="100+" label="HỌC VIÊN DƯỚI TB LÊN 6+, 7+" isMobile={isMobile}/>
        <Stat number="95%" label="HỌC VIÊN TOEIC ĐẠT TARGET" isMobile={isMobile}/>

      </ThemedView>

    </ThemedView>

  );
}

/* ======================
STAT ITEM
====================== */

function Stat({ number, label, isMobile }) {

  return (

    <ThemedView
      style={{
        alignItems: "center",
        minWidth: isMobile ? "40%" : 160
      }}
    >

      <ThemedText
        style={{
          fontSize: isMobile ? 26 : 34,
          fontWeight: "bold"
        }}
      >
        {number}
      </ThemedText>

      <ThemedText
        style={{
          opacity: 0.7,
          marginTop: 6,
          textAlign: "center",
          fontSize: isMobile ? 13 : 14
        }}
      >
        {label}
      </ThemedText>

    </ThemedView>

  );
}