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
              address1
              address2
              city
              company
              country
              countryCodeV2
              formattedArea
              firstName
              lastName
              latitude
              longitude
              name
              phone
              province
              provinceCode
              zip
            }
            shippingAddress {
              address1
              address2
              city
              company
              country
              countryCodeV2
              formattedArea
              firstName
              lastName
              latitude
              longitude
              name
              phone
              province
              provinceCode
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
                    title
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
                      transformedSrc(maxWidth: 80)
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
