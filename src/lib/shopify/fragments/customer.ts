export const customerFragment = /* GraphQL */ `
  fragment customer on Customer {
    id
    firstName
    lastName
    displayName
    email
    phone
    tags
    acceptsMarketing
    createdAt
  }
`;

export const customerAddressFragment = /* GraphQL */ `
  fragment customer on Customer {
    id
    defaultAddress {
      id
    }
    addresses(first:20) {
      edges {
        node {
          id
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
      }
    }
  }
`;