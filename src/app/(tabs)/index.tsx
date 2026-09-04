import CompletedItems from "@/components/List/CompletedItems";
import ListHeroCard from "@/components/List/ListHeroCard";
import PendingItemCard from "@/components/List/PendingItemCard";
import TabScreenBackground from "@/components/TabScreenBackground";
import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

export default function ListScreen() {
  const { items } = useGroceryStore();
  const pendingItems = items.filter((item) => !item.purchased);

  return (
    <FlatList
      className="flex-1 bg-background"
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PendingItemCard item={item} />}
      contentContainerStyle={{ padding: 20, gap: 20 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <View style={{ gap: 14 }}>
          <TabScreenBackground />
          <ListHeroCard />
          <View className="items—center justify—between px—l">
            <Text className="font—semibold uppercase tracking— [lpx] text—muted—foreground">
              Shopping items
            </Text>
            <Text className="text—sm text—muted—foreground">
              {pendingItems.length}
              active
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={<Text>NO ITEMS IN DB</Text>}
      ListFooterComponent={<CompletedItems />}
    />
  );
}
