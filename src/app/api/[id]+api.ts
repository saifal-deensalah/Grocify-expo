import {
    deleteGroceryItem,
    setGroceryItemPurchased,
    updateGroceryItemQuantity,
} from "@/lib/server/db/db-actions";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const item = body.quantity
      ? await updateGroceryItemQuantity(params.id, body.quantity)
      : await setGroceryItemPurchased(params.id, body.purchased ?? true);

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }
    return Response.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update item";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await deleteGroceryItem(params.id);
    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete item";
    return Response.json({ error: message }, { status: 500 });
  }
}
