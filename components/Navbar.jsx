import { useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../contexts/AuthContext";

import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";

export default function Navbar({ onNavigate }) {

  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (

    <ThemedView
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        alignItems: "center",
        backdropFilter: "blur(10px)",
        paddingVertical: 16
      }}
    >

      {/* MAIN NAV */}
      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1440,
          paddingHorizontal: 20
        }}
      >

        {/* LOGO */}
        <ThemedText style={{ fontSize: 22, fontWeight: "bold", color: "#c09808" }}>
          TLH Academy
        </ThemedText>

        {/* RIGHT SIDE */}
        <ThemedView style={{ flexDirection: "row", alignItems: "center", gap: 28 }}>

          {/* DESKTOP MENU */}
          {!isMobile && (
            <ThemedView style={{ flexDirection: "row", gap: 24 }}>
<MenuItem title="Home" onPress={() => onNavigate?.("home")} />
<MenuItem title="Courses" onPress={() => onNavigate?.("courses")} />
<MenuItem title="Teachers" onPress={() => onNavigate?.("teachers")} />
<MenuItem title="Contact" onPress={() => onNavigate?.("contact")} />
            </ThemedView>
          )}

          {/* MOBILE BUTTON */}
          {isMobile && (
            <TouchableOpacity onPress={() => setMenu(!menu)}>
              <ThemedText style={{ fontSize: 22 }}>☰</ThemedText>
            </TouchableOpacity>
          )}

          {/* AUTH DESKTOP */}
          {!isMobile && !user && (
            <ThemedView style={{ flexDirection: "row", gap: 12 }}>
              <SignInButton />
              <SignUpButton />
            </ThemedView>
          )}

          {!isMobile && user && (
            <ThemedView style={{ position: "relative" }}>
              <TouchableOpacity onPress={() => setOpen(!open)}>
                <ThemedText style={{ fontWeight: "600" }}>
                  {user.name}
                </ThemedText>
              </TouchableOpacity>

              {open && (
                <ThemedView
                  style={{
                    position: "absolute",
                    top: 36,
                    right: 0,
                    padding: 14,
                    borderRadius: 10,
                    minWidth: 180,
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 5
                  }}
                >
                  <ThemedText style={{ marginBottom: 6, fontWeight: "600" }}>
                    {user.name}
                  </ThemedText>

                  <ThemedText style={{ opacity: 0.6, marginBottom: 12 }}>
                    {user.phone}
                  </ThemedText>

                  <TouchableOpacity
                    onPress={() => {
                      logout();
                      setOpen(false);
                      router.replace("/");
                    }}
                  >
                    <ThemedText style={{ color: "red" }}>
                      Logout
                    </ThemedText>
                  </TouchableOpacity>

                </ThemedView>
              )}
            </ThemedView>
          )}

        </ThemedView>

      </ThemedView>

      {/* MOBILE MENU */}
      {isMobile && menu && (
        <ThemedView
          style={{
            width: "100%",
            padding: 20,
            gap: 16
          }}
        >

<MenuItem title="Home" onPress={() => { onNavigate?.("home"); setMenu(false); }} />
<MenuItem title="Courses" onPress={() => { onNavigate?.("courses"); setMenu(false); }} />
<MenuItem title="Teachers" onPress={() => { onNavigate?.("teachers"); setMenu(false); }} />
<MenuItem title="Contact" onPress={() => { onNavigate?.("contact"); setMenu(false); }} />

          {!user && (
            <>
              <SignInButton />
              <SignUpButton />
            </>
          )}

          {user && (
            <TouchableOpacity
              onPress={() => {
                logout();
                setMenu(false);
              }}
            >
              <ThemedText style={{ color: "red" }}>
                Logout
              </ThemedText>
            </TouchableOpacity>
          )}

        </ThemedView>
      )}

    </ThemedView>
  );
}

/* ======================
MENU ITEM
====================== */

function MenuItem({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedText style={{ opacity: 0.8 }}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

/* ======================
SIGN IN
====================== */

export function SignInButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/login")}
      style={{
        backgroundColor: "#4832c5",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
      }}
    >
      <ThemedText style={{ color: "#fff", fontWeight: "500" }}>
        Đăng Nhập
      </ThemedText>
    </TouchableOpacity>
  );
}

/* ======================
SIGN UP
====================== */

export function SignUpButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push("/register")}
      style={{
        backgroundColor: "#c09808",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8
      }}
    >
      <ThemedText style={{ color: "#fff", fontWeight: "600" }}>
        Đăng Ký
      </ThemedText>
    </TouchableOpacity>
  );
}