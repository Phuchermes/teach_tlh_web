import { Slot, Redirect } from "expo-router";
import { useAuth } from "../../contexts/AuthContext";
import * as WebBrowser from "expo-web-browser";

// 🔥 QUAN TRỌNG: giúp đóng tab OAuth + trả kết quả về app
WebBrowser.maybeCompleteAuthSession();

export default function AuthLayout(){

  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Redirect href="/" />;
  }

  return <Slot />;
}