import { customerUpdate } from '$lib/shopify/index.js';
import type { Customer } from '$lib/shopify/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, params, locals }) {
  const { slug } = params;
  let customer: Customer | null = null;
  let status = "error";
  const accessToken = cookies.get('accessToken') || "";
  switch (slug) {
    case "update":
      {
        const { firstName, lastName, email, phone, acceptsMarketing } = await request.json();
        customer = await customerUpdate({ accessToken, customer: { firstName, lastName, email, phone, acceptsMarketing } });
        if (customer) {
          status = "success";
          locals.customer = customer;
        }
        else status = "error";
        break;
      }
  }
  return json({ status, customer });
}