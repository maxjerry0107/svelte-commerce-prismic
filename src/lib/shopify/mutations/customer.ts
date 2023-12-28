import { customerFragment } from "../fragments/customer";

export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        ...customer
      }
    }
  }
  ${customerFragment}
`;

export const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const customerAccessTokenDeleteMutation = /* GraphQL */ `
  mutation customerAccessTokenDelete($accessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $accessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`

export const customerUpdateMutation = /* GraphQL */ `
  mutation customerUpdate($customer: CustomerUpdateInput!, $accessToken: String!) {
    customerUpdate(customer: $customer, customerAccessToken: $accessToken) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
        firstName
        lastName
        displayName
        email
        phone
        acceptsMarketing
      }
    }
  }
`;

export const customerAddressCreateMutation = /* GraphQL */  `
  mutation customerAddressCreate($address: MailingAddressInput!, $accessToken: String!) {
    customerAddressCreate(address: $address, customerAccessToken: $accessToken) {
      customerAddress {
        id
        address1
        address2
        city
        company
        country
        firstName
        lastName
        phone
        province
        zip
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`


export const customerAddressUpdateMutation = /* GraphQL */  `
  mutation customerAddressUpdate($address: MailingAddressInput!, $accessToken: String!, $addressId: ID!) {
    customerAddressUpdate(address: $address, customerAccessToken: $accessToken, id: $addressId) {
      customerAddress {
        id
        address1
        address2
        city
        company
        country
        firstName
        lastName
        phone
        province
        zip
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`

export const customerAddressDeleteMutation = /* GraphQL */ `
  mutation customerAddressDelete($accessToken: String!, $addressId: ID!) {
    customerAddressDelete(customerAccessToken: $accessToken, id: $addressId) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`


export const customerDefaultAddressUpdateMutation = /* GraphQL */ `
  mutation customerDefaultAddressUpdate($addressId: ID!, $accessToken: String!) {
    customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $accessToken) {
      customer {
        ...customer
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${customerFragment}
`