import { customerAddressFragment, customerFragment } from "../fragments/customer";

export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      ...customer
    }
  }
  ${customerFragment}
`;

export const getCustomerAddressesQuery = /* GraphQL */ `
  query getCustomer($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      ...customer
    }
  }
  ${customerAddressFragment}
`;