import { addToCart, createCart, getCart, removeFromCart, updateCart } from "$lib/shopify";
import { loadCart } from "$lib/stores";

export const addToCartAction = async ({ selectedVariantId }: { selectedVariantId: string }) => {
  let cartId = localStorage.getItem('cartId') || '';
  let cart;
  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    localStorage.setItem('cartId', cartId);
  }

  try {
    await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    await loadCart()
  } catch (e) {
    return 'Error adding item to cart';
  }
}

export const deleteCartItemAction = async ({ itemId }: { itemId: string }) => {
  const cartId = localStorage.getItem('cartId') || '';
  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    await removeFromCart(cartId, [itemId]);
    await loadCart()
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export const editCartItemAction = async ({ lineId, variantId, quantity }: { lineId: string, variantId: string, quantity: number }) => {
  const cartId = localStorage.getItem('cartId') || '';
  if (!cartId) {
    return 'Missing cart ID';
  }
  try {
    if (quantity === 0) {
      await deleteCartItemAction({ itemId: lineId });
    }
    else {
      await updateCart(cartId, [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity
        }
      ]);
      await loadCart();
    }
  } catch (e) {
    return 'Error updating item quantity';
  }
}