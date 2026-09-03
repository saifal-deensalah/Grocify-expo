import { GroceryItem, useGroceryStore } from "@/store/grocery-store";
import { FontAwesome6 } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const priorityPillBg: Record<GroceryItem["priority"], string> = {
  Low: "bg-priority-low",
  Medium: "bg-priority-medium",
  High: "bg-priority-high",
};

const priorityPillText: Record<GroceryItem["priority"], string> = {
  Low: "text-priority-low-foreground",
  Medium: "text-priority-medium-foreground",
  High: "text-priority-high-foreground",
};

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore();

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-start gap-3">
        <Pressable
          className={`mt-1 size-6 items-center justify-center rounded-full border-2 border-border ${
            item.purchased ? "bg-primary" : "bg-card"
          }`}
          onPress={() => togglePurchased(item.id)}
        >
          {item.purchased && (
            <FontAwesome6 name="check" size={12} color="#fff" />
          )}
        </Pressable>

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text
              className={`flex-1 text-lg font-semibold text-card-foreground ${
                item.purchased ? "line-through opacity-50" : ""
              }`}
            >
              {item.name}
            </Text>
            <View
              className={`rounded-full px-3 py-1 ${priorityPillBg[item.priority]}`}
            >
              <Text
                className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}
              >
                {item.priority}
              </Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-center gap-2">
            <View className="rounded-full bg-secondary px-3 py-1">
              <Text className="text-xs font-semibold text-secondary-foreground">
                {item.category}
              </Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() =>
                updateQuantity(item.id, Math.max(1, item.quantity - 1))
              }
            >
              <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
            </Pressable>

            <Text className="min-w-9 text-center text-base font-semibold text-foreground">
              {item.quantity}
            </Text>

            <Pressable
              className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
            </Pressable>
          </View>
        </View>

        <Pressable
          className="h-9 w-9 items-center justify-center rounded-xl bg-destructive"
          onPress={() => removeItem(item.id)}
        >
          <FontAwesome6 name="trash" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingItemCard;
