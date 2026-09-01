import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

const insightsScreen = () => {
  const { isLoading, items } = useGroceryStore();
  return (
    <View>
      <Text>insights</Text>
    </View>
  );
};

export default insightsScreen;
