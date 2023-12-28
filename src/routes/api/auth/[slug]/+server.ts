
import type { Customer } from '$lib/shopify';
import { customerCreate, customerLogin, customerLogout, disassociateCustomerWithCheckout, getCustomer } from '$lib/shopify/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, params, locals }) {
  const { slug } = params;
  let customer: Customer | null = null;
  let status = "error";
  switch (slug) {
    case "login":
      {
        const { email, password } = await request.json();
        const customerAccessToken = await customerLogin({ email, password });
        if (customerAccessToken) {
          const { accessToken } = customerAccessToken;
          customer = await getCustomer({ accessToken })
          locals.customer = customer;
          cookies.set("accessToken", accessToken, {
            path: "/", maxAge: 60 * 60 * 24 * 7 // 1 week
          })
          status = "success";
        }
        break;
      }
    case "signup":
      {
        const { firstName, lastName, email, password } = await request.json();
        customer = await customerCreate({ firstName, lastName, email, password });
        if (customer)
          status = "success";
        else status = "error";
        break;
      }
    case "logout":
      {
        const accessToken = cookies.get('accessToken');
        if (accessToken)
          await customerLogout({ accessToken })
        const checkoutId = cookies.get("checkoutId");
        if (checkoutId)
          await disassociateCustomerWithCheckout({ checkoutId })
        cookies.delete('accessToken', { path: '/' })
        locals.customer = undefined;
        status = "success";
        break;
      }
  }
  return json({ status, customer });
}