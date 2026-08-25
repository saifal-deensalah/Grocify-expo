import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useSocialAuth from "../hooks/useSocialAuth";

export default function SignInScreen() {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === "oauth_google";
  const isAppleClicked = loadingStrategy === "oauth_apple";
  const isGitHubClicked = loadingStrategy === "oauth_github";

  const isLoading = isGoogleClicked || isAppleClicked || isGitHubClicked;
  return (
    <SafeAreaView
      className="flex-1 bg-green-900 dark:border-s-emerald-950"
      edges={["top"]}
    >
      <View className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/30" />
      <View className="absolute -right-20 top-40 h-72 w-72 rounded-full bg-emerald-400/20" />

      <View className="px-6 pt-4" style={{ marginTop: 40 }}>
        <Text className="text-center text-white text-5xl font-extrabold tracking-tight text-primary-foreground uppercase dark:text--foreground font-mono">
          Grocify
        </Text>
        <Text className="mt-1 text-center text-white text-[14px] text-primary-foreground/80 dark:text-foreground/75">
          Plan smarter, Shop happier.
        </Text>
        <Image
          source={require("../../../assets/images/auth.png")}
          style={{
            width: "100%",
            height: 300,
            alignSelf: "center",
            marginTop: 40,
          }}
          resizeMode="contain"
        />
      </View>

      <View className="mt-8 flex-1 rounded-t-[46px] bg-card px-6 pb-8 pt-6 bg-green-950">
        <View className="self-center rounded-full bg-secundary px-3 py-1 bg-green-900">
          <Text className="text-xs font-semibold text-white uppercase tracking-[1px] text-secoundry-foreground">
            Welcome Back
          </Text>
        </View>
        <Text className="mt-4 text-center text-sm font-semibold color-white dark:text-foreground">
          Choose a social provider and jump right into your personalized {"\n"}
          grocery experience.
        </Text>
        <View className="mt-6">
          <Pressable
            className="mb-3 h-14 flex-row items-center rounded-2xl border active:opacity-90 px-2"
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white ml-2">
              <Image
                source={require("../../../assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <View className="flex-1 flex-row items-center justify-between">
              <Text className="ml-4 text-base font-medium text-foreground">
                {isGoogleClicked
                  ? "Continuing with Google..."
                  : "Continue with Google"}
              </Text>
              <FontAwesome
                name="angle-right"
                size={16}
                color="#5f6e66"
                style={{ marginRight: 12 }}
              />
            </View>
          </Pressable>
          <Pressable
            className="mb-3 h-14 flex-row items-center rounded-2xl border active:opacity-90 px-2"
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white ml-2">
              <Image
                source={require("../../../assets/images/github.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <View className="flex-1 flex-row items-center justify-between">
              <Text className="ml-4 text-base font-medium text-foreground">
                {isGitHubClicked
                  ? "Continuing with GitHub..."
                  : "Continue with GitHub"}
              </Text>
              <FontAwesome
                name="angle-right"
                size={16}
                color="#5f6e66"
                style={{ marginRight: 12 }}
              />
            </View>
          </Pressable>
          <Pressable
            className="mb-3 h-14 flex-row items-center rounded-2xl border active:opacity-90 px-2 bg-white"
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_apple")}
          >
            <View className="h-8 w-8 items-center justify-center rounded-full bg-white ml-2">
              <Image
                source={require("../../../assets/images/apple.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>

            <View className="flex-1 flex-row items-center justify-between">
              <Text className="ml-4 text-base font-medium text-foreground">
                {isAppleClicked
                  ? "Continuing with Apple..."
                  : "Continue with Apple"}
              </Text>
              <FontAwesome
                name="angle-right"
                size={16}
                color="#5f6e66"
                style={{ marginRight: 12 }}
              />
            </View>
          </Pressable>

          <Text className="mt-3 text-white text-center text—sm leading—5 text—muted—foreground">
            By continuing, you agree to our Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
