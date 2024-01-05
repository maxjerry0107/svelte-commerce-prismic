import { addItemsToCheckout, associateCustomerWithCheckout, createCheckout, getCheckout, removeItemsFromCheckout, updateItemsCheckout } from '$lib/shopify/index.js';
import { json } from '@sveltejs/kit';
import Multipassify from 'multipassify';

export async function POST({ request, cookies, params, locals }) {
  const { slug } = params;
  let status = "error";
  let checkoutId = cookies.get("checkoutId") || "";
  let cart = null;
  if (checkoutId) {
    cart = await getCheckout(checkoutId);
    if (cart?.completed) {
      cart = null;
      cookies.delete("checkoutId", {
        path: "/"
      })
    }
  }
  switch (slug) {
    case "get":
      if (!cart) {
        cart = await createCheckout();
        checkoutId = cart.id;
        cookies.set("checkoutId", checkoutId, {
          path: "/", maxAge: 60 * 60 * 24 * 7 // 1 week
        })
      }
      status = "success";
      break;
    case "add-item":
      const { selectedVariantId } = await request.json();
      try {
        cart = await addItemsToCheckout(checkoutId, [{ variantId: selectedVariantId, quantity: 1 }]);
        status = "success";
      } catch (e) {
        status = "error";
      }
      break;
    case "delete-item":
      if (!checkoutId) {
        status = 'error';
        break;
      }
      const { itemId } = await request.json();
      try {
        cart = await removeItemsFromCheckout(checkoutId, [itemId]);
        status = "success";
      } catch (e) {
        status = 'error';
      }
      break;
    case "update-item":
      if (!checkoutId) {
        status = "error";
      }
      const { lineId, quantity } = await request.json();
      try {
        if (quantity === 0)
          cart = await removeItemsFromCheckout(checkoutId, [lineId]);
        else
          cart = await updateItemsCheckout(checkoutId, [
            {
              id: lineId,
              quantity
            }
          ]);
        status = "success";
      } catch (e) {
        status = "error";
      }
      break;
    case "checkout":
      const accessToken = cookies.get('accessToken');
      if (accessToken) {
        cart = await associateCustomerWithCheckout({ checkoutId, accessToken })
        const customer = {
          email: locals.customer?.email,
          return_to: cart.checkoutUrl,
        };
        const url = new Multipassify(import.meta.env.VITE_SHOPIFY_STORE_MULTIPASS_TOKEN).generateUrl(
          customer,
          import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
        );
        return json({ url })
      }
      break;
  }
  return json({ status, cart });
}