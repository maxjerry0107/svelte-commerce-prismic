import { getCustomerOrders } from '$lib/shopify/index.js';


export const load = async ({ cookies, depends }) => {
  const accessToken = cookies.get('accessToken') || "";
  const orders = await getCustomerOrders({ accessToken })
  return {
    orders
  }
}