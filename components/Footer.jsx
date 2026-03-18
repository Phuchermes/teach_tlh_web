import { View, useWindowDimensions } from "react-native";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function Footer() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ThemedView
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: 60,
      }}
    >
      <ThemedView
        style={{
          maxWidth: 1440,
          width: "100%",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          gap: 30,
          paddingHorizontal: 20,
        }}
      >
        {/* BRAND */}
        <ThemedView style={{ maxWidth: 260 }}>
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#ceaa27",
              marginBottom: 10,
            }}
          >
            TLH Academy
          </ThemedText>

          <ThemedText>
            TEACH WITH CARE - LEARN WITH MIND
            Chúng tôi giúp học sinh đạt mục tiêu học tập.
          </ThemedText>
        </ThemedView>

        {/* COURSES */}
        <ThemedView>
          <ThemedText style={{ fontWeight: "bold", marginBottom: 10 }}>
            Courses
          </ThemedText>

          <FooterLink text="LUYỆN THI THPTQG - TUYỂN SINH 10 " />
          <FooterLink text="LUYỆN THI CHỨNG CHỈ TOEIC - CAMBRIDGE " />
          <FooterLink text="TIẾNG ANH PHỔ THÔNG 6 - 12" />
            <FooterLink text="TIẾNG ANH GIAO TIẾP" />
        </ThemedView>

        {/* COMPANY */}
        <ThemedView>
          <ThemedText style={{ fontWeight: "bold", marginBottom: 10 }}>
            Academy
          </ThemedText>

          <FooterLink text="About" />
          <FooterLink text="Teachers" />
          <FooterLink text="Contact" />
        </ThemedView>

        {/* CONTACT */}
        <ThemedView>
          <ThemedText style={{ fontWeight: "bold", marginBottom: 10 }}>
            Contact
          </ThemedText>

          <FooterLink text="Email: huongtl1710@gmail.com" />
          <FooterLink text="Phone: 0916361710" />
          <FooterLink text="145 đường số 5, Gò Vấp, HCM" />
        </ThemedView>
      </ThemedView>

      <ThemedView style={{ marginTop: 40 }}>
        <ThemedText style={{ opacity: 0.5 }}>
          © 2026 TLH Academy
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

function FooterLink({ text }) {
  return (
    <ThemedText
      style={{
        opacity: 0.7,
        marginBottom: 6,
      }}
    >
      {text}
    </ThemedText>
  );
}