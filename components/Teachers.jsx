import { Image, useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const teachers = [
  {
    name: "Ms Lan Hương",
    score: "TOEIC 990/990",
    info:
      "- Cử nhân Sư phạm Anh - ĐH Sư phạm TP.HCM\n- Thạc sĩ Ngôn ngữ Anh - ĐH Công nghệ TP.HCM",
    exp:
      "- Trên 5 năm kinh nghiệm luyện thi\n- 90% học sinh 8+, 9+\n- Học sinh dưới TB lên 6+, 7+\n- TOEIC cấp tốc 500+",
    slogan:
      "TÂM Ở ĐÂU - TẦM Ở ĐÓ\nDạy bằng tất cả sự trân trọng",
  },
];

export default function Teachers() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: isMobile ? 60 : 100,
      }}
    >
      <ThemedText
        style={{
          fontSize: isMobile ? 24 : 28,
          fontWeight: "bold",
          marginBottom: 40,
        }}
      >
        Giáo viên
      </ThemedText>

      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "center",
          width: "100%",
        }}
      >
        {teachers.map((t, i) => (
          <TeacherCard key={i} {...t} isMobile={isMobile} />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

/* ======================
TEACHER CARD
====================== */

function TeacherCard({ name, score, info, exp, slogan, isMobile }) {
  return (
    <ThemedView
      style={{
        width: isMobile ? "90%" : 850,
        padding: 24,
        borderRadius: 20,
        alignItems: "center",
        gap: 10,

        // 💥 thêm card style
        backgroundColor: "rgba(255,255,255,0.03)",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <Image
        source={require("../img/class/IMG_3848.jpg")}
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
        }}
      />

      <ThemedView style={{ height: 10 }} />

      <ThemedText
        style={{
          fontWeight: "bold",
          fontSize: isMobile ? 20 : 25,
        }}
      >
        {name}
      </ThemedText>

      <ThemedText
        style={{
          fontSize: isMobile ? 18 : 22,
          color: "#3b82f6",
          fontWeight: "600",
        }}
      >
        {score}
      </ThemedText>

      {/* INFO */}
      <ThemedText
        style={{
          marginTop: 10,
          fontSize: isMobile ? 14 : 16,
          opacity: 0.85,
          textAlign: "center",
          lineHeight: 22,
        }}
      >
        {info}
      </ThemedText>

      {/* EXP */}
      <ThemedText
        style={{
          marginTop: 6,
          fontSize: isMobile ? 14 : 16,
          opacity: 0.85,
          textAlign: "center",
          lineHeight: 22,
        }}
      >
        {exp}
      </ThemedText>

      {/* SLOGAN */}
      <ThemedText
        style={{
          marginTop: 12,
          fontSize: isMobile ? 14 : 16,
          fontStyle: "italic",
          textAlign: "center",
          opacity: 0.9,
        }}
      >
        {slogan}
      </ThemedText>
    </ThemedView>
  );
}