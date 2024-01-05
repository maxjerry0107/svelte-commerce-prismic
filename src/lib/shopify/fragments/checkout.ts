export const checkoutFragment = /* GraphQL */ `
  fragment checkout on Checkout {
    id
    webUrl
    lineItemsSubtotalPrice {
      amount
      currencyCode
    }
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    completedAt
    createdAt
    taxesIncluded
    orderStatusUrl
    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          variant {
            id
            sku
            title
            image {
              originalSrc
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
            product {
              id
              handle
              vendor
            }
          }
          quantity
          customAttributes {
            key
            value
          }
        }
      }
    }
  }
`;