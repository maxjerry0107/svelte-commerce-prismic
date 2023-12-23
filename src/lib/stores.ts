import { addToCart, createCart, getCart, removeFromCart, updateCart } from '$lib/shopify';
import { writable, type Writable } from 'svelte/store';
import type { Cart } from './shopify/types';

export const cart: Writable<Cart | undefined> = writable();

export const loadCart = async () => {
  let cartId = localStorage.getItem('cartId') || "";
  try {
    const cartResponse = await getCart(cartId);
    cart.set(cartResponse)
  } catch (error) {
    console.log(error);
  }
};


export const addToCartAction = async ({ selectedVariantId }: { selectedVariantId: string }) => {
  let cartId = localStorage.getItem('cartId') || '';
  let newCart;
  if (cartId) {
    newCart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    newCart = await createCart();
    cartId = newCart.id;
    localStorage.setItem('cartId', cartId);
  }

  try {
    newCart = await addToCart(cartId, [{ merchandiseId: selectedVariantId, quantity: 1 }]);
    cart.set(newCart)
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
    let newCart = await removeFromCart(cartId, [itemId]);
    cart.set(newCart)
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
      let newCart = await updateCart(cartId, [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity
        }
      ]);
      cart.set(newCart)
    }
  } catch (e) {
    return 'Error updating item quantity';
  }
}