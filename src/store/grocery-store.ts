import { create } from "zustand";

export type GroceryCategory =
  "Produce" | "Dairy" | "Meat" | "Bakery" | "Snacks";
export type GroceryPriority = "Low" | "Medium" | "High";
export type GroceryItem = {
  id: string;
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
  purchased: boolean;
};

export type GroceryItemInput = {
  name: string;
  category: GroceryCategory;
  quantity: number;
  priority: GroceryPriority;
};

type ItemsResponse = {
  items: GroceryItem[];
};
type ItemResponse = {
  item: GroceryItem;
};
type GroceryStore = {
  items: GroceryItem[];
  isLoading: boolean;
  error: string | null;
  loadItems: () => Promise<void>;
  addItem: (item: GroceryItemInput) => Promise<GroceryItem | void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  togglePurchased: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearItems: () => void;
};
export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  loadItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch("/api/items");
      const payload = (await response.json()) as ItemsResponse;

      if (!response.ok) throw new Error(`Request faild (${response.status})`);
      set({ items: payload.items });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  addItem: async (input: GroceryItemInput) => {
    set({ error: null });
    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name,
          category: input.category,
          quantity: Math.max(1, input.quantity),
          priority: input.priority,
        }),
      });
      const payload = (await response.json()) as ItemResponse;
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      set((state) => ({ items: [...state.items, payload.item] }));
      return payload.item;
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
  updateItem: async (id: string, quantity: number) => {
    const nextQuantity = Math.max(1, quantity);
    set({ error: null });

    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      const payload = (await response.json()) as ItemResponse;
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.error("Error updating item:", error);
      set({ error: (error as Error).message });
    }
  },
  togglePurchased: async (id: string) => {
    const currentItem = get().items.find((item) => item.id === id);
    if (!currentItem) return;

    const nextPurchased = !currentItem.purchased;
    set({ error: null });
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchased: nextPurchased }),
      });
      const payload = (await response.json()) as ItemResponse;
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? payload.item : item,
        ),
      }));
    } catch (error) {
      console.error("Error toggling purchased:", error);
      set({ error: (error as Error).message });
    }
  },
  removeItem: async (id: string) => {
    set({ error: null });
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error removing item:", error);
      set({ error: (error as Error).message });
    }
  },
  clearItems: async () => {
    set({ items: [] });
    try {
      const response = await fetch("/api/items/clear-purchased", {
        method: "POST",
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      const items = get().items.filter((item) => !item.purchased);
      set({ items });
    } catch (error) {
      console.error("Error clearing items:", error);
      set({ error: (error as Error).message });
    }
  },
}));
