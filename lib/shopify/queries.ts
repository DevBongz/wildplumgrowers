// Shopify GraphQL Queries

// Fragment for product fields (reusable)
const productFragment = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    descriptionHtml
    availableForSale
    tags
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    seo {
      title
      description
    }
    updatedAt
  }
`

// Get all products
export const getProductsQuery = `
  ${productFragment}
  query getProducts($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

// Get single product by handle
export const getProductByHandleQuery = `
  ${productFragment}
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFields
    }
  }
`

// Get single product by ID
export const getProductByIdQuery = `
  ${productFragment}
  query getProductById($id: ID!) {
    product(id: $id) {
      ...ProductFields
    }
  }
`

// Get products by collection handle
export const getCollectionProductsQuery = `
  ${productFragment}
  query getCollectionProducts($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      seo {
        title
        description
      }
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
`

// Get all collections
export const getCollectionsQuery = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          image {
            url
            altText
          }
          seo {
            title
            description
          }
        }
      }
    }
  }
`

// Get collection by handle
export const getCollectionByHandleQuery = `
  ${productFragment}
  query getCollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      image {
        url
        altText
      }
      seo {
        title
        description
      }
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  }
`

// Search products
export const searchProductsQuery = `
  ${productFragment}
  query searchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          ...ProductFields
        }
      }
    }
  }
`

// Get cart
export const getCartQuery = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                selectedOptions {
                  name
                  value
                }
                product {
                  id
                  handle
                  title
                  featuredImage {
                    url
                    altText
                  }
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
      }
    }
  }
`

// Get page by handle
export const getPageByHandleQuery = `
  query getPageByHandle($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      handle
      title
      body
      bodySummary
      seo {
        title
        description
      }
      updatedAt
    }
  }
`

// Get all pages
export const getPagesQuery = `
  query getPages($first: Int!) {
    pages(first: $first) {
      edges {
        node {
          id
          handle
          title
          bodySummary
          updatedAt
        }
      }
    }
  }
`

// Get menu by handle
export const getMenuQuery = `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      id
      handle
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`

