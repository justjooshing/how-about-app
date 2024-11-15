import { Platform } from "react-native";

const platformUrl = Platform.select({
  android: "192.168.1.117",
  default: "localhost",
});

export const base_url =
  process.env.NODE_ENV === "development"
    ? `http://${platformUrl}:3000`
    : process.env.EXPO_PUBLIC_API_URL;
