import { Platform } from "react-native";

const platformUrl = Platform.select({
  android: "192.168.1.117",
  default: "localhost",
});

export const base_url = `http://${platformUrl}:3000`;
