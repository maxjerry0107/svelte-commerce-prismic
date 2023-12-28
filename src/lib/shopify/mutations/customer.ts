
export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
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