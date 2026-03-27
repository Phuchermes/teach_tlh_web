import { View, Text, TouchableOpacity, Platform } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRef } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import QR_URL from "../config/api"; // 🔥 dùng chung

export default function QRScreen() {
  const qrRef = useRef();

  /* 🔥 DÙNG LINK BACKEND (QUAN TRỌNG) */
  const qrValue = `${QR_URL}/countdown?target=2026-03-28T09:00:00`;

  const exportQR = () => {
  qrRef.current.toDataURL((data) => {

    // 👉 WEB
    if (Platform.OS === "web") {
      const a = document.createElement("a");
      a.href = "data:image/png;base64," + data;
      a.download = "qr.png";
      a.click();
      return;
    }

    // 👉 MOBILE
    const filePath = FileSystem.cacheDirectory + "qr.png";

    FileSystem.writeAsStringAsync(filePath, data, {
      encoding: FileSystem.EncodingType.Base64,
    }).then(() => {
      Sharing.shareAsync(filePath);
    });

  });
};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        QR TLH Academy
      </Text>

      <QRCode
        value={qrValue}
        size={250}
        getRef={(c) => (qrRef.current = c)}
      />

      <TouchableOpacity
        onPress={exportQR}
        style={{
          marginTop: 20,
          padding: 12,
          backgroundColor: "#38bdf8",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>
  {Platform.OS === "web" ? "Tải QR" : "Xuất QR"}
</Text>
      </TouchableOpacity>
    </View>
  );
}