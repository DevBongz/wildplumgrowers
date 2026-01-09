// Shopify API Client

import {
  getProductsQuery,
  getProductByHandleQuery,
  getCollectionProductsQuery,
  getCollectionsQuery,
  getCollectionByHandleQuery,
  searchProductsQuery,
  getCartQuery,
  getPageByHandleQuery,
  getMenuQuery,
} from './queries'

import {
  createCartMutation,
  addToCartMutation,
  updateCartMutation,
  removeFromCartMutation,
} from './mutations'

import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ShopifyProductsResponse,
  ShopifyProductByHandleResponse,
  ShopifyCollectionsResponse,
  ShopifyCollectionResponse,
  ShopifyCartResponse,
  ShopifyCreateCartResponse,
  ShopifyAddToCartResponse,
  ShopifyUpdateCartResponse,
  ShopifyRemoveFromCartResponse,
  Product,
  Collection,
  Cart,
  CartLine,
} from './types'

// Environment variables
const domain = process.env.SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const apiVersion = '2024-01'

// Base fetch function
async function shopifyFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags,
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}): Promise<T> {
  const url = `https://${domain}/api/${apiVersion}/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags && { next: { tags } }),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors) {
    console.error('Shopify GraphQL Errors:', json.errors)
    throw new Error(json.errors[0]?.message || 'Shopify API error')
  }

  return json.data
}

// Transform Shopify product to simplified Product
function transformProduct(shopifyProduct: ShopifyProduct): Product {
  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    availableForSale: shopifyProduct.availableForSale,
    tags: shopifyProduct.tags,
    options: shopifyProduct.options,
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    compareAtPrice: shopifyProduct.variants.edges[0]?.node.compareAtPrice
      ? parseFloat(shopifyProduct.variants.edges[0].node.compareAtPrice.amount)
      : undefined,
    currencyCode: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    image: shopifyProduct.featuredImage?.url || '/placeholder.jpg',
    images: shopifyProduct.images.edges.map((edge) => edge.node.url),
    variants: shopifyProduct.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions,
      price: parseFloat(edge.node.price.amount),
      compareAtPrice: edge.node.compareAtPrice
        ? parseFloat(edge.node.compareAtPrice.amount)
        : undefined,
    })),
  }
}

// Transform Shopify collection to simplified Collection
function transformCollection(shopifyCollection: ShopifyCollection): Collection {
  return {
    id: shopifyCollection.id,
    handle: shopifyCollection.handle,
    title: shopifyCollection.title,
    description: shopifyCollection.description,
    image: shopifyCollection.image?.url || null,
    products: shopifyCollection.products?.edges.map((edge) => transformProduct(edge.node)) || [],
  }
}

// Transform Shopify cart to simplified Cart
function transformCart(shopifyCart: ShopifyCart): Cart {
  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    lines: shopifyCart.lines.edges.map((edge): CartLine => ({
      id: edge.node.id,
      quantity: edge.node.quantity,
      variantId: edge.node.merchandise.id,
      variantTitle: edge.node.merchandise.title,
      productId: edge.node.merchandise.product.id,
      productHandle: edge.node.merchandise.product.handle,
      productTitle: edge.node.merchandise.product.title,
      image: edge.node.merchandise.product.featuredImage?.url || null,
      price: parseFloat(edge.node.merchandise.price.amount),
      selectedOptions: edge.node.merchandise.selectedOptions,
    })),
    subtotal: parseFloat(shopifyCart.cost.subtotalAmount.amount),
    total: parseFloat(shopifyCart.cost.totalAmount.amount),
    currencyCode: shopifyCart.cost.totalAmount.currencyCode,
  }
}

// ============== PRODUCT FUNCTIONS ==============

export async function getProducts(options?: {
  first?: number
  sortKey?: 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED_AT' | 'UPDATED_AT'
  reverse?: boolean
}): Promise<Product[]> {
  const { first = 20, sortKey = 'BEST_SELLING', reverse = false } = options || {}

  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: getProductsQuery,
    variables: { first, sortKey, reverse },
    tags: ['products'],
  })

  return data.products.edges.map((edge) => transformProduct(edge.node))
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<ShopifyProductByHandleResponse>({
    query: getProductByHandleQuery,
    variables: { handle },
    tags: ['products', `product-${handle}`],
  })

  if (!data.productByHandle) return null
  return transformProduct(data.productByHandle)
}

export async function searchProducts(query: string, first = 20): Promise<Product[]> {
  const data = await shopifyFetch<ShopifyProductsResponse>({
    query: searchProductsQuery,
    variables: { query, first },
    cache: 'no-store',
  })

  return data.products.edges.map((edge) => transformProduct(edge.node))
}

// ============== COLLECTION FUNCTIONS ==============

export async function getCollections(first = 20): Promise<Collection[]> {
  const data = await shopifyFetch<ShopifyCollectionsResponse>({
    query: getCollectionsQuery,
    variables: { first },
    tags: ['collections'],
  })

  return data.collections.edges.map((edge) => ({
    id: edge.node.id,
    handle: edge.node.handle,
    title: edge.node.title,
    description: edge.node.description,
    image: edge.node.image?.url || null,
    products: [],
  }))
}

export async function getCollectionByHandle(
  handle: string,
  productsFirst = 50
): Promise<Collection | null> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: getCollectionByHandleQuery,
    variables: { handle, first: productsFirst },
    tags: ['collections', `collection-${handle}`],
  })

  if (!data.collection) return null
  return transformCollection(data.collection)
}

export async function getCollectionProducts(
  handle: string,
  first = 50
): Promise<Product[]> {
  const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
    query: getCollectionProductsQuery,
    variables: { handle, first },
    tags: ['collections', `collection-${handle}`],
  })

  if (!data.collection) return []
  return data.collection.products.edges.map((edge) => transformProduct(edge.node))
}

// ============== CART FUNCTIONS ==============

export async function createCart(
  lines?: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const data = await shopifyFetch<ShopifyCreateCartResponse>({
    query: createCartMutation,
    variables: { lines },
    cache: 'no-store',
  })

  if (data.cartCreate.userErrors.length > 0) {
    console.error('Cart creation errors:', data.cartCreate.userErrors)
    throw new Error(data.cartCreate.userErrors[0].message)
  }

  if (!data.cartCreate.cart) return null
  return transformCart(data.cartCreate.cart)
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<ShopifyCartResponse>({
    query: getCartQuery,
    variables: { cartId },
    cache: 'no-store',
  })

  if (!data.cart) return null
  return transformCart(data.cart)
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  const data = await shopifyFetch<ShopifyAddToCartResponse>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  if (data.cartLinesAdd.userErrors.length > 0) {
    console.error('Add to cart errors:', data.cartLinesAdd.userErrors)
    throw new Error(data.cartLinesAdd.userErrors[0].message)
  }

  if (!data.cartLinesAdd.cart) return null
  return transformCart(data.cartLinesAdd.cart)
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<Cart | null> {
  const data = await shopifyFetch<ShopifyUpdateCartResponse>({
    query: updateCartMutation,
    variables: { cartId, lines },
    cache: 'no-store',
  })

  if (data.cartLinesUpdate.userErrors.length > 0) {
    console.error('Update cart errors:', data.cartLinesUpdate.userErrors)
    throw new Error(data.cartLinesUpdate.userErrors[0].message)
  }

  if (!data.cartLinesUpdate.cart) return null
  return transformCart(data.cartLinesUpdate.cart)
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const data = await shopifyFetch<ShopifyRemoveFromCartResponse>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: 'no-store',
  })

  if (data.cartLinesRemove.userErrors.length > 0) {
    console.error('Remove from cart errors:', data.cartLinesRemove.userErrors)
    throw new Error(data.cartLinesRemove.userErrors[0].message)
  }

  if (!data.cartLinesRemove.cart) return null
  return transformCart(data.cartLinesRemove.cart)
}

// ============== PAGE FUNCTIONS ==============

export async function getPage(handle: string) {
  const data = await shopifyFetch<{ pageByHandle: { title: string; body: string } | null }>({
    query: getPageByHandleQuery,
    variables: { handle },
    tags: ['pages', `page-${handle}`],
  })

  return data.pageByHandle
}

// ============== MENU FUNCTIONS ==============

export async function getMenu(handle: string) {
  const data = await shopifyFetch<{
    menu: {
      items: {
        title: string
        url: string
        items: { title: string; url: string }[]
      }[]
    } | null
  }>({
    query: getMenuQuery,
    variables: { handle },
    tags: ['menus'],
  })

  return data.menu?.items || []
}

