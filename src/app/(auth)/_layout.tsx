import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }
  if (isSignedIn) {
    return <Redirect href={"/_sitemap"} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
      <View nativeID="clerk-captcha" />
    </View>
  );
}
