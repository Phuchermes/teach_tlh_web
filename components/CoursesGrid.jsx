import { View, Image, useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

const courses = [
  {
    title: "TOEIC Mastery",
    img: require("../img/class/IMG_3859.png"),
  },
  {
    title: "Tiếng Anh THCS",
    img: require("../img/class/IMG_3853.png"),
  },
  {
    title: "Tiếng Anh THPT",
    img: require("../img/class/IMG_3853.png"),
  },
  {
    title: "Luyện Thi Đại Học",
    img: require("../img/class/IMG_3869.png"),
  },
];

export default function CoursesGrid() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ThemedView style={{ alignItems: "center", paddingVertical: 80 }}>
      <ThemedText style={{ fontSize: 28, fontWeight: "bold" }}>
        Khóa học nổi bật
      </ThemedText>

      <ThemedView
        style={{
          flexDirection: isMobile ? "column" : "row",
          flexWrap: "wrap",
          gap: 30,
          marginTop: 40,
          justifyContent: "center",
        }}
      >
        {courses.map((c, i) => (
          <CourseCard key={i} {...c} isMobile={isMobile} />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

function CourseCard({ title, img, isMobile }) {
  return (
    <ThemedView
      style={{
        width: isMobile ? "100%" : 340,
        maxWidth: 340,
        borderRadius: 16,
        padding: 16,
      }}
    >
      <Image
        source={img}
        style={{
          width: "100%",
          height: 200,
          borderRadius: 12,
        }}
        resizeMode="cover"
      />

      <ThemedView style={{ height: 12 }} />

      <ThemedText style={{ fontSize: 18, fontWeight: "bold" }}>
        {title}
      </ThemedText>
    </ThemedView>
  );
}