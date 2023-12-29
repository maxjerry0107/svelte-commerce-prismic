
import { customerAddressCreate, customerAddressDelete, customerAddressUpdate, customerDefaultAddressUpdate, customerUpdate } from '$lib/shopify/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies, params, locals }) {
  const { slug } = params;
  let status = "error";
  const accessToken = cookies.get('accessToken') || "";
  switch (slug) {
    case "update":
      {
        const { firstName, lastName, email, phone, acceptsMarketing } = await request.json();
        const { customer, customerUserErrors, customerAccessToken } = await customerUpdate({ accessToken, customer: { firstName, lastName, email, phone, acceptsMarketing } });
        if (customer) {
          locals.customer = customer;
          if (customerAccessToken)
            cookies.set("accessToken", customerAccessToken?.accessToken, {
              path: "/", maxAge: 60 * 60 * 24 * 7 // 1 week
            })
        }
        return json({ customer, customerUserErrors });
      }
    case "create-address":
      {
        const { firstName, lastName, company, address1, address2, city, country, province, zip, phone } = await request.json();
        const { customerAddress, customerUserErrors } = await customerAddressCreate({
          accessToken, address: {
            firstName, lastName, company, address1, address2, city, country, province, zip, phone
          }
        });
        return json({ customerAddress, customerUserErrors });
      }
    case "update-address":
      {
        const { firstName, lastName, company, address1, address2, city, country, province, zip, phone, addressId } = await request.json();
        const { customerAddress, customerUserErrors } = await customerAddressUpdate({
          accessToken, address: {
            firstName, lastName, company, address1, address2, city, country, province, zip, phone
          }, addressId
        });
        return json({ customerAddress, customerUserErrors });
      }
    case "delete-address":
      {
        const { addressId } = await request.json();
        const { deletedCustomerAddressId, customerUserErrors } = await customerAddressDelete({
          accessToken, addressId
        });
        return json({ deletedCustomerAddressId, customerUserErrors });
      }
    case "default-address-update":
      {
        const { addressId } = await request.json();
        const customer = await customerDefaultAddressUpdate({
          accessToken, addressId
        });
        if (customer) {
          status = "success";
          locals.customer = customer;
        }
        else status = "error";
        return json({ status, customer });
      }
  }
}