import { Show, useClerk, useUser } from "@clerk/expo";
import { UserButton, UserProfileView } from "@clerk/expo/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={styles.container} className="bg-backgtound te">
      <Text style={styles.title}>Welcome!</Text>

      <Show when="signed-in">
        <Text>Hello {user?.emailAddresses[0]?.emailAddress}</Text>
        <Pressable style={styles.button} onPress={() => signOut()}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 18,
            overflow: "hidden",
          }}
        >
          <UserButton />
        </View>
        <UserProfileView style={{ flex: 1 }} />
      </Show>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
