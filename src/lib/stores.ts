import { getCart } from '$lib/shopify';
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
