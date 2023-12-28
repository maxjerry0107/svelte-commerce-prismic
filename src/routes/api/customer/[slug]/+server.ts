import { customerAddressCreate, customerUpdate } from '$lib/shopify/index.js';
import type { Customer } from '$lib/shopify/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, params, locals }) {
  const { slug } = params;
  let status = "error";
  const accessToken = cookies.get('accessToken') || "";
  switch (slug) {
    case "update":
      {
        let customer: Customer | null = null;
        const { firstName, lastName, email, phone, acceptsMarketing } = await request.json();
        customer = await customerUpdate({ accessToken, customer: { firstName, lastName, email, phone, acceptsMarketing } });
        if (customer) {
          status = "success";
          locals.customer = customer;
        }
        else status = "error";
        return json({ status, customer });
      }
    case "create-address":
      {
        const { firstName, lastName, company, address1, address2, city, country, province, zip, phone } = await request.json();
        const customerAddress = await customerAddressCreate({
          accessToken, address: {
            firstName, lastName, company, address1, address2, city, country, province, zip, phone
          }
        });
        if (customerAddress) {
          status = "success";
        }
        else status = "error";
        return json({ status, customerAddress });
      }
  }
}