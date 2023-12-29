
import type { Customer } from '$lib/shopify';
import { customerCreate, customerLogin, customerLogout, disassociateCustomerWithCheckout, getCustomer } from '$lib/shopify/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, params, locals }) {
  const { slug } = params;
  let customer: Customer | null = null;
  switch (slug) {
    case "login":
      {
        const { email, password } = await request.json();
        const { customerAccessToken, customerUserErrors } = await customerLogin({ email, password });
        if (customerAccessToken) {
          const { accessToken } = customerAccessToken;
          customer = await getCustomer({ accessToken })
          locals.customer = customer;
          cookies.set("accessToken", accessToken, {
            path: "/", maxAge: 60 * 60 * 24 * 7 // 1 week
          })
        }
        return json({ customer, customerUserErrors });
      }
    case "signup":
      {
        const { firstName, lastName, email, password } = await request.json();
        const { customer, customerUserErrors } = await customerCreate({ firstName, lastName, email, password });
        return json({ customer, customerUserErrors });
      }
    case "logout":
      {
        const accessToken = cookies.get('accessToken') || "";
        const { userErrors, deletedAccessToken, deletedCustomerAccessTokenId } = await customerLogout({ accessToken })
        if (deletedAccessToken) {
          cookies.delete('accessToken', { path: '/' })
          locals.customer = undefined;
        }
        const checkoutId = cookies.get("checkoutId") || "";
        await disassociateCustomerWithCheckout({ checkoutId });
        return json({ deletedAccessToken, userErrors, deletedCustomerAccessTokenId });
      }
  }
}