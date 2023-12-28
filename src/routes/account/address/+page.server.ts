import { getCustomerAddressData } from '$lib/shopify/index.js';

export const load = async ({ cookies, depends }) => {
  depends('customer:addresses');
  const accessToken = cookies.get('accessToken') || "";
  const addressData = await getCustomerAddressData({ accessToken })
  return {
    addressData
  }
}