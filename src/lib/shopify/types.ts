import type { Checkout, CheckoutLineItem, MailingAddress, MailingAddressInput, MoneyV2 } from "../../types/shopify";

export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Collection = ShopifyCollection & {
  path: string;
};
export type CollectionWithProducts = Collection & {
  products: Product[]
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionWithProductsOperation = {
  data: {
    collection: ShopifyCollection & {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};


export type VariantCombination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};


export type Customer = {
  acceptsMarketing: boolean;
  displayName: string;
  email?: string;
  firstName?: string;
  id: string;
  lastName?: string;
  phone?: string;
};

export type CustomerCreateInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  password?: string;
  acceptsMarketing?: boolean;
};

export type CustomerLoginInput = {
  email: string;
  password: string;
};

export type ShopifyCustomerCreateOperation = {
  data: {
    customerCreate: {
      customer: Customer;
    }
  };
  variables: {
    input: CustomerCreateInput;
  };
};


export type ShopifyCustomerUpdateOperation = {
  data: {
    customerUpdate: {
      customer: Customer;
    }
  };
  variables: {
    customer: CustomerCreateInput;
    accessToken: string;
  };
};

export type ShopifyCustomerLoginOperation = {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: CustomerAccessToken;
    }
  };
  variables: {
    input: CustomerLoginInput;
  };
};


export type ShopifyCustomerLogoutOperation = {
  data: {
    customerAccessTokenDelete: {
      deletedAccessToken: string;
    }
  };
  variables: {
    accessToken: string;
  };
};

export type CustomerAccessToken = {
  accessToken: string;
  expiresAt: any;
}


export type ShopifyGetCustomerOperation = {
  data: {
    customer: Customer
  };
  variables: {
    accessToken: string;
  };
};

export type ShopifyAssociateCustomerWithCheckoutOperation = {
  data: {
    checkoutCustomerAssociateV2: {
      checkout: Checkout;
    }
  };
  variables: {
    checkoutId: string;
    accessToken: string;
  };
};

export type ShopifyDisassociateCustomerWithCheckoutOperation = {
  data: {
    checkoutCustomerDisassociateV2: {
      checkout: Checkout;
    }
  };
  variables: {
    checkoutId: string;
  };
};


export type ShopifyGetCheckoutOperation = {
  data: {
    node: Checkout
  };
  variables: {
    checkoutId: string;
  };
};


export type ShopifyCreateCheckoutOperation = {
  data: { checkoutCreate: { checkout: Checkout } };
};


export type ShopifyAddToCheckoutOperation = {
  data: {
    checkoutLineItemsAdd: {
      checkout: Checkout;
    };
  };
  variables: {
    checkoutId: string;
    lineItems: {
      variantId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCheckoutOperation = {
  data: {
    checkoutLineItemsRemove: {
      checkout: Checkout;
    };
  };
  variables: {
    checkoutId: string;
    lineItemIds: string[];
  };
};

export type ShopifyUpdateCheckoutOperation = {
  data: {
    checkoutLineItemsUpdate: {
      checkout: Checkout;
    };
  };
  variables: {
    checkoutId: string;
    lineItems: {
      id: string;
      quantity: number;
    }[];
  };
};

export type Cart = {
  id: string;
  email?: string;
  cost: {
    subtotalAmount: MoneyV2;
    totalAmount: MoneyV2;
    totalTaxAmount: MoneyV2;
  };
  lines: CheckoutLineItem[];
  totalQuantity: number;
  checkoutUrl: string;
};


export type ShopifyCustomerAddressCreateOperation = {
  data: {
    customerAddressCreate: {
      customerAddress: MailingAddress;
    }
  };
  variables: {
    address: MailingAddressInput,
    accessToken: string
  };
};