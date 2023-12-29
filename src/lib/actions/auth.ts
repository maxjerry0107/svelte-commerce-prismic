import type { CustomerAccessTokenCreateInput, CustomerAccessTokenDeletePayload, CustomerCreateInput, CustomerCreatePayload } from '$lib/shopify';
import { user } from "$lib/stores";

const API_URL = "/api/auth";

export const login = async ({ email, password }: CustomerAccessTokenCreateInput) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  if (res.customer) {
    user.set(res.customer)
  }
  return res;
}

export const signup = async ({ firstName, lastName, email, password }: CustomerCreateInput): Promise<CustomerCreatePayload> => {
  const res: CustomerCreatePayload = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify({ firstName, lastName, email, password }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  return res;
}

export const logout = async (): Promise<CustomerAccessTokenDeletePayload> => {
  const res: CustomerAccessTokenDeletePayload = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json());
  if (res.deletedAccessToken)
    user.set(undefined)
  return res;
}
