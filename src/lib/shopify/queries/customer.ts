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

export const getCustomerOrdersQuery = /* GraphQL */ `
  query getCustomerWithOrders($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      orders(first: 20) {
        edges {
          node {
            id
            orderNumber
            processedAt
            statusUrl
            currencyCode
            financialStatus
            fulfillmentStatus
            totalPrice {
              amount
              currencyCode
            }
            totalShippingPrice {
              amount
              currencyCode
            }
            billingAddress {
              firstName
              lastName
              phone
              address1
              city
              province
              country
              zip
            }
            shippingAddress {
              firstName
              lastName
              phone
              address1
              city
              province
              country
              zip
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                  originalTotalPrice {
                    amount
                    currencyCode
                  }
                  variant {
                    id
                    sku
                    product {
                      handle
                      vendor
                    }
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    image {
                      altText
                      originalSrc
                      transformedSrc(maxWidth: 700)
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
