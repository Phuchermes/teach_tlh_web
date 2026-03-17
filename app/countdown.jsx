import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function CountdownScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const targetParam = params.target;
  const redirect = "/(dashboard)/dashboard";

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!targetParam) return;

    const targetTime = new Date(targetParam).getTime();

    const update = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        router.replace(redirect);
        return;
      }

      setTimeLeft(diff);
    };

    update();
    const timer = setInterval(update, 1000);

    return () => clearInterval(timer);
  }, []);

  // ===== FORMAT TIME =====
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0f172a",
      }}
    >
      {/* <Text style={{ color: "#fff", fontSize: 20 }}>
        Khai trương sau:
      </Text> */}

      <Text style={{ color: "#38bdf8", fontSize: 40, marginTop: 10 }}>
        {days}d {hours}h {minutes}m {seconds}s
      </Text>
    </View>
  );
}