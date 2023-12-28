
import { user } from "$lib/stores";
import type { CustomerUpdateInput, MailingAddressInput } from "../shopify";

const API_URL = "/api/customer";

export const customerUpdate = async ({ firstName, lastName, email, phone, acceptsMarketing }: CustomerUpdateInput) => {
  if (phone?.trim() == "") {
    phone = undefined;
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

export const customerAddressUpdate = async ({ address: { firstName, lastName, company, address1, address2, city, country, province, zip, phone }, addressId }: { address: MailingAddressInput, addressId: string }) => {
  let url = "update-address"
  if (addressId == "") url = "create-address"
  else url = "update-address";
  const res = await fetch(`${API_URL}/${url}`, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, company, address1, address2, city, country, province, zip, phone, addressId }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  return res;
}

export const customerAddressDelete = async ({ addressId }: { addressId: string }) => {
  const res = await fetch(`${API_URL}/delete-address`, {
    method: 'POST',
    body: JSON.stringify({ addressId }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  return res;
}

export const customerDefaultAddressUpdate = async ({ addressId }: { addressId: string }) => {
  const res = await fetch(`${API_URL}/default-address-update`, {
    method: 'POST',
    body: JSON.stringify({ addressId }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  if (res.customer) {
    user.set(res.customer)
  }
  return res;
}