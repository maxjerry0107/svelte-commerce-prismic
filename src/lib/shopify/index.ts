import { HIDDEN_PRODUCT_TAG, SHOPIFY_GRAPHQL_API_ENDPOINT } from '$lib/constants';
import { isShopifyError } from '$lib/type-guards';
import { ensureStartsWith } from '$lib/utils';
import type { Checkout, MailingAddress, MailingAddressInput } from '../../types/shopify';
import { associateCustomerWithCheckoutMutation, checkoutCreateMutation, checkoutLineItemAddMutation, checkoutLineItemRemoveMutation, checkoutLineItemUpdateMutation, disassociateCustomerWithCheckoutMutation } from './mutations/checkout';
import { customerAccessTokenCreateMutation, customerAccessTokenDeleteMutation, customerAddressCreateMutation, customerCreateMutation, customerUpdateMutation } from './mutations/customer';
import { getCheckoutQuery } from './queries/checkout';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getCustomerQuery } from './queries/customer';
import { getMenuQuery } from './queries/menu';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import type {
  Cart,
  Collection,
  CollectionWithProducts,
  Connection,
  Customer,
  CustomerAccessToken,
  CustomerCreateInput,
  CustomerLoginInput,
  Image,
  Menu,
  Page,
  Product,
  ShopifyAddToCheckoutOperation,
  ShopifyAssociateCustomerWithCheckoutOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionWithProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCheckoutOperation,
  ShopifyCustomerAddressCreateOperation,
  ShopifyCustomerCreateOperation,
  ShopifyCustomerLoginOperation,
  ShopifyCustomerLogoutOperation,
  ShopifyCustomerUpdateOperation,
  ShopifyDisassociateCustomerWithCheckoutOperation,
  ShopifyGetCheckoutOperation,
  ShopifyGetCustomerOperation,
  ShopifyMenuOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCheckoutOperation,
  ShopifyUpdateCheckoutOperation
} from './types';


const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(import.meta.env.VITE_SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};


const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    path: `/search/${collection.handle}`
  };
};


const reshapeCollectionWithProducts = (collection: Collection | undefined, products: Product[]): CollectionWithProducts | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    products
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};


export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}


export async function getCollectionWithProducts({
  handle,
  reverse,
  sortKey
}: {
  handle: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<CollectionWithProducts | undefined> {
  const res = await shopifyFetch<ShopifyCollectionWithProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      handle: handle,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  const collection = reshapeCollection(res.body.data.collection);
  const products = reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
  return reshapeCollectionWithProducts(collection, products);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    return [];
  }

  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    variables: {
      handle
    }
  });

  return (
    res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
      title: item.title,
      path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
    })) || []
  );
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function customerCreate({ firstName, lastName, email, password, acceptsMarketing }: CustomerCreateInput): Promise<Customer> {
  const res = await shopifyFetch<ShopifyCustomerCreateOperation>({
    query: customerCreateMutation,
    variables: {
      input: {
        firstName,
        lastName,
        email,
        password,
        acceptsMarketing,
      },
    },
    cache: 'no-store'
  });
  return res.body.data.customerCreate.customer;
}


export async function customerUpdate({ accessToken, customer }: { accessToken: string, customer: CustomerCreateInput }): Promise<Customer> {
  const res = await shopifyFetch<ShopifyCustomerUpdateOperation>({
    query: customerUpdateMutation,
    variables: {
      customer,
      accessToken
    },
    cache: 'no-store'
  });
  return res.body.data.customerUpdate.customer;
}

export async function customerLogin({ email, password }: CustomerLoginInput): Promise<CustomerAccessToken> {
  const res = await shopifyFetch<ShopifyCustomerLoginOperation>({
    query: customerAccessTokenCreateMutation,
    variables: {
      input: {
        email,
        password,
      },
    },
    cache: 'no-store'
  });
  return res.body.data.customerAccessTokenCreate.customerAccessToken;
}

export async function customerLogout({ accessToken }: { accessToken: string }): Promise<string> {
  const res = await shopifyFetch<ShopifyCustomerLogoutOperation>({
    query: customerAccessTokenDeleteMutation,
    variables: {
      accessToken
    },
    cache: 'no-store'
  });
  return res.body.data.customerAccessTokenDelete.deletedAccessToken;
}

export async function getCustomer({ accessToken }: { accessToken: string }): Promise<Customer> {
  const res = await shopifyFetch<ShopifyGetCustomerOperation>({
    query: getCustomerQuery,
    variables: {
      accessToken
    },
    cache: 'no-store'
  });
  return res.body.data.customer;
}






const normalizeCheckoutToCart = (checkout: Checkout): Cart => {
  const lineItems = removeEdgesAndNodes(checkout.lineItems);
  const totalQuantity = lineItems
    .map((item: any) => item.quantity)
    .reduce((x, y) => x + y, 0);
  return {
    id: checkout.id,
    email: checkout.email,
    cost: {
      subtotalAmount: checkout.subtotalPriceV2,
      totalAmount: checkout.totalPriceV2,
      totalTaxAmount: checkout.totalTaxV2
    },
    totalQuantity: totalQuantity,
    lines: lineItems,
    checkoutUrl: checkout.webUrl
  }
}


export async function getCheckout(checkoutId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyGetCheckoutOperation>({
    query: getCheckoutQuery,
    variables: { checkoutId },
    cache: 'no-store'
  });
  if (!res.body.data.node) {
    return undefined;
  }
  return normalizeCheckoutToCart(res.body.data.node);
}


export async function createCheckout(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCheckoutOperation>({
    query: checkoutCreateMutation,
    cache: 'no-store'
  });
  return normalizeCheckoutToCart(res.body.data.checkoutCreate.checkout);
}


export async function addItemsToCheckout(
  checkoutId: string,
  lineItems: { variantId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCheckoutOperation>({
    query: checkoutLineItemAddMutation,
    variables: {
      checkoutId,
      lineItems
    },
    cache: 'no-store'
  });
  return normalizeCheckoutToCart(res.body.data.checkoutLineItemsAdd.checkout);
}

export async function removeItemsFromCheckout(
  checkoutId: string,
  lineItemIds: string[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCheckoutOperation>({
    query: checkoutLineItemRemoveMutation,
    variables: {
      checkoutId,
      lineItemIds
    },
    cache: 'no-store'
  });
  return normalizeCheckoutToCart(res.body.data.checkoutLineItemsRemove.checkout);
}


export async function updateItemsCheckout(
  checkoutId: string,
  lineItems: { id: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCheckoutOperation>({
    query: checkoutLineItemUpdateMutation,
    variables: {
      checkoutId,
      lineItems
    },
    cache: 'no-store'
  });

  return normalizeCheckoutToCart(res.body.data.checkoutLineItemsUpdate.checkout);
}


export async function associateCustomerWithCheckout({ accessToken, checkoutId }: { accessToken: string, checkoutId: string }): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAssociateCustomerWithCheckoutOperation>({
    query: associateCustomerWithCheckoutMutation,
    variables: {
      accessToken,
      checkoutId,
    },
    cache: 'no-store'
  });
  return normalizeCheckoutToCart(res.body.data.checkoutCustomerAssociateV2.checkout);
}

export async function disassociateCustomerWithCheckout({ checkoutId }: { checkoutId: string }): Promise<Cart> {
  const res = await shopifyFetch<ShopifyDisassociateCustomerWithCheckoutOperation>({
    query: disassociateCustomerWithCheckoutMutation,
    variables: {
      checkoutId
    },
    cache: 'no-store'
  });
  return normalizeCheckoutToCart(res.body.data.checkoutCustomerDisassociateV2.checkout);
}




export async function customerAddressCreate({ accessToken, address }: { accessToken: string, address: MailingAddressInput }): Promise<MailingAddress> {
  const res = await shopifyFetch<ShopifyCustomerAddressCreateOperation>({
    query: customerAddressCreateMutation,
    variables: {
      accessToken, address
    },
    cache: 'no-store'
  });
  return res.body.data.customerAddressCreate.customerAddress;
}
