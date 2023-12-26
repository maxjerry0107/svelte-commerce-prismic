import { checkoutFragment } from '../fragments/checkout';

export const checkoutCreateMutation = /* GraphQL */ `
  mutation checkoutCreate($input: CheckoutCreateInput = {}) {
    checkoutCreate(input: $input) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkout
      }
    }
  }
  ${checkoutFragment}
`;

export const checkoutLineItemAddMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkout
      }
    }
  }

  ${checkoutFragment}
`;


export const checkoutLineItemRemoveMutation = /* GraphQL */ `
  mutation checkoutLineItemRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkout
      }
    }
  }
  ${checkoutFragment}
`;


export const checkoutLineItemUpdateMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkout
      }
    }
  }

  ${checkoutFragment}
`;


export const associateCustomerWithCheckoutMutation = /* GraphQl */ `
  mutation associateCustomerWithCheckout($checkoutId: ID!, $accessToken: String!) {
    checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $accessToken) {
      checkout {
        ...checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
        email
        displayName
      }
    }
  }
  ${checkoutFragment}
`;

export const disassociateCustomerWithCheckoutMutation = /* GraphQl */ `
  mutation disassociateCustomerWithCheckout($checkoutId: ID!) {
    checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
      checkout {
        ...checkout
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
  ${checkoutFragment}
`;