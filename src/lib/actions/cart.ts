import { cart } from '../stores';

const API_URL = "/api/cart";

export const loadCart = async () => {
  const res = await fetch(`${API_URL}/get`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  if (res.cart) {
    cart.set(res.cart)
  }
  return res;
}


export const addToCart = async ({ selectedVariantId }: { selectedVariantId: string }) => {
  const res = await fetch(`${API_URL}/add-item`, {
    method: 'POST',
    body: JSON.stringify({ selectedVariantId }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  if (res.cart) {
    cart.set(res.cart)
  }
  return res;
}

export const deleteCartItem = async ({ itemId }: { itemId: string }) => {
  const res = await fetch(`${API_URL}/delete-item`, {
    method: 'POST',
    body: JSON.stringify({ itemId }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());

  cart.set(res.cart)
  return res;
}

export const updateCartItem = async ({ lineId, quantity }: { lineId: string, quantity: number }) => {
  const res = await fetch(`${API_URL}/update-item`, {
    method: 'POST',
    body: JSON.stringify({ lineId, quantity }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  cart.set(res.cart)
  return res;
}


export const checkout = async () => {
  const res = await fetch(`${API_URL}/checkout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  return res.url;
}

