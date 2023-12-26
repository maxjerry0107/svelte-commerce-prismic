import { checkoutFragment } from "../fragments/checkout";

export const getCheckoutQuery = /* GraphQL */ `
  query($checkoutId: ID!) {
    node(id: $checkoutId) {
      ...checkout
    }
  }
  ${checkoutFragment}
`;