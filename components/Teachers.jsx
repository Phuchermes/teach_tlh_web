import { Image, useWindowDimensions } from "react-native";
import { forwardRef } from "react";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const teachers = [
  {
    name: "Ms Lan Hương",
    score: "TOEIC 990/990",
    info:
      "⭐ Cử nhân Sư phạm Anh - ĐH Sư phạm TP.HCM\n⭐ Thạc sĩ Ngôn ngữ Anh - ĐH Công nghệ TP.HCM",
    exp:
      "⭐ Trên 5 năm kinh nghiệm luyện thi lớp 10, THPTQG với hơn 1000 học viên tín nhiệm.",
    exp2:"⭐ Tác giả Biên soạn các bộ đề Thực chiến - Dự đoán độc quyền siêu sát với đề thi thực tế giúp 90% bạn đạt 8+, 9+ trong kì thi vào lớp 10 & THPTQG", 
    exp3:"⭐ Giúp hơn 100 bạn mất gốc, dưới TB tiến bộ vượt bậc lên 6+, 7+",   
    exp4:"⭐ 95% học viên TOEIC đạt 700+; Ôn cấp tốc TOEIC từ 2- 3 tháng từ 0 - 500 giúp nhiều học viên đủ điều kiện tốt nghiệp ĐH và làm việc trong ngành hàng không",   
    exp5:"⭐ Được vinh danh Giáo viên thực tập XUẤT SẮC - Kì thực tập sư phạm TP.HCM 2020",
    slogan:
      "TÂM Ở ĐÂU - TẦM Ở ĐÓ\nDạy bằng tất cả sự trân trọng",
  },
];

const Teachers = forwardRef((props, ref) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ThemedView
      ref={ref} // 🔥 QUAN TRỌNG
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
});

export default Teachers;

/* ====================== */

function TeacherCard({ name, score, info, exp, exp2, exp3, exp4, exp5,  slogan, isMobile }) {
  return (
    <ThemedView
      style={{
        width: isMobile ? "90%" : 850,
        padding: 24,
        borderRadius: 20,
        alignItems: "center",
        gap: 10,
        backgroundColor: "rgba(255,255,255,0.03)",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
<ThemedView
  style={{
    width: isMobile ? 160 : 220,   // 👈 to lên
    height: isMobile ? 160 : 220,  // 👈 vuông
    borderRadius: 999,             // 👈 tròn hoàn toàn
    overflow: "hidden",            // 👈 cắt phần dư
  }}
>
  <Image
    source={require("../img/class/4B4A2420.jpg")}
    style={{
      width: "100%",
      height: isMobile ? 260 : 320, // 👈 ảnh CAO hơn khung
      transform: [{ translateY: 0 }], // 👈 kéo ảnh lên (giữ đầu)
    }}
    resizeMode="cover"
  />
</ThemedView>

      <ThemedView style={{ height: 10 }} />

      <ThemedText style={{ fontWeight: "bold", fontSize: isMobile ? 20 : 25 }}>
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

      <ThemedText style={{ marginTop: 10, textAlign: "center", fontSize:20 }}>
        {info}
      </ThemedText>

      <ThemedText style={{ marginTop: 6, textAlign: "center", fontSize:15 }}>
        {exp}
      </ThemedText>
      
      <ThemedText style={{ marginTop: 6, textAlign: "center", fontSize:15 }}>
        {exp2}
      </ThemedText>

      <ThemedText style={{ marginTop: 6, textAlign: "center", fontSize:15 }}>
        {exp3}
      </ThemedText>

      <ThemedText style={{ marginTop: 6, textAlign: "center", fontSize:15 }}>
        {exp4}
      </ThemedText>

      <ThemedText style={{ marginTop: 6, textAlign: "center", fontSize:15 }}>
        {exp5}
      </ThemedText>

      <ThemedText style={{ marginTop: 12, fontStyle: "italic", textAlign: "center", fontSize:25 }}>
        {slogan}
      </ThemedText>
    </ThemedView>
  );
}