// config/api.js

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  console.warn("Missing EXPO_PUBLIC_API_URL");
}

export default API_URL;