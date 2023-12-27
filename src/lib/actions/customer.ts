import type { CustomerCreateInput } from "$lib/shopify/types";
import { user } from "$lib/stores";

const API_URL = "/api/customer";

export const customerUpdate = async ({ firstName, lastName, email, phone, acceptsMarketing }: CustomerCreateInput) => {
  if (phone?.trim() == "") {
    phone = null;
  }
  const res = await fetch(`${API_URL}/update`, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, phone, acceptsMarketing }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  if (res.customer) {
    user.set(res.customer)
  }
  return res;
}