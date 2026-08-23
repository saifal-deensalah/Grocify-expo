import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-blue-500 bg-yellow-200 p-2">
        Edit src/app/index.tsx to edit this screen.1234
      </Text>
      <Image
        source={"https://reactnative.dev/img/tiny_logo.png"}
        style={{ width: 200, height: 200, borderRadius: 100, marginTop: 20 }}
      />
      <Pressable
        style={{ backgroundColor: "blue", padding: 10, marginTop: 20 }}
        onPress={() => console.log("Pressable pressed!")}
      >
        <Text style={{ color: "white" }}>Press me!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
