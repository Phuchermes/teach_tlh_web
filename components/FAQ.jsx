import { useState } from "react";
import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

/* ======================
FAQ DATA
====================== */

const faqs=[
{
q:"Học phí hợp lý",
a:"HỌC PHÍ CHỈ TỪ 75K / BUỔI. Sĩ số nhỏ tối đa 15 học sinh giúp giáo viên theo sát từng bạn."
},
{
q:"Phòng học hiện đại",
a:"PHÒNG HỌC MÁY LẠNH, được trang bị hiện đại, không gian học tập thoải mái."
},
{
q:"Giáo viên chất lượng",
a:"Học cùng giáo viên chuyên môn cao, trình độ Thạc sĩ, 100% chuẩn sư phạm, tâm huyết và giàu kinh nghiệm."
},
{
q:"Chương trình học hiệu quả",
a:"Chương trình học đúng trọng tâm, luôn đổi mới phương pháp, đảm bảo vững đầu ra cho học sinh."
},
{
q:"Nhiều hỗ trợ học tập",
a:"Miễn phí buổi học đầu tiên và tăng cường ôn tập trước các kỳ thi quan trọng."
},
{
q:"Hình thức học đa dạng",
a:"Lớp học linh hoạt: OFFLINE - ONLINE - KÈM NHÓM NHỎ hoặc 1:1."
}
];

/* ======================
COMPONENT
====================== */

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const { width } = useWindowDimensions();

  const isMobile = width < 768;

  return (
    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: isMobile ? 60 : 100,
        paddingHorizontal: 20,
      }}
    >
      <ThemedText
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Tại sao chọn LTH
      </ThemedText>

      <View
        style={{
          width: "100%",
          maxWidth: 700,
        }}
      >
        {faqs.map((f, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setOpen(open === i ? null : i)}
            style={{
              paddingVertical: 18,
              borderBottomWidth: 1,
              borderColor: "#333",
            }}
          >
            <ThemedText style={{ fontWeight: "bold" }}>
              {f.q}
            </ThemedText>

            {open === i && (
              <ThemedText
                style={{
                  marginTop: 10,
                  opacity: 0.7,
                  lineHeight: 22,
                }}
              >
                {f.a}
              </ThemedText>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}