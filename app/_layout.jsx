import { AuthProvider } from "../contexts/AuthContext";
import { Slot } from "expo-router"
import * as WebBrowser from "expo-web-browser";


WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {

return(

<AuthProvider>
<Slot/>
</AuthProvider>

)

}