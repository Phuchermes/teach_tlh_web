import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function AuthRedirect(){

  const router = useRouter();

  useEffect(() => {
    // 🔥 khi Google redirect về đây → quay lại home
    router.replace("/");
  }, []);

  return null;
}