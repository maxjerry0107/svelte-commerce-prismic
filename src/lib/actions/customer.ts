import type { CustomerCreateInput } from "$lib/shopify/types";
import { user } from "$lib/stores";
import type { MailingAddressInput } from "../../types/shopify";

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


export const customerAddressCreate = async ({ firstName, lastName, company, address1, address2, city, country, province, zip, phone }: MailingAddressInput) => {
  const res = await fetch(`${API_URL}/create-address`, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, company, address1, address2, city, country, province, zip, phone }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  return res;
}