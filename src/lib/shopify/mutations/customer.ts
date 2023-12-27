
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