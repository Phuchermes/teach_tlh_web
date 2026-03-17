import { View, Text, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useRef } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Platform } from "react-native";

export default function QRScreen() {
  const qrRef = useRef();

 const qrValue =
  Platform.OS === "web"
    ? "http://192.168.88.254:8081/countdown?target=2026-03-20T09:00:00"
    : "tlhacademy://countdown?time=5";

  const exportQR = () => {
    qrRef.current.toDataURL((data) => {
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
        QR mở TLH App
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
        <Text style={{ fontWeight: "bold" }}>Xuất QR</Text>
      </TouchableOpacity>
    </View>
  );
}