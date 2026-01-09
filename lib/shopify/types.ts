// Shopify Types

export interface ShopifyImage {
  url: string
  altText: string | null
  width?: number
  height?: number
}

export interface ShopifyMoney {
  amount: string
  currencyCode: string
}

export interface ShopifyProductVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: ShopifyMoney
  compareAtPrice?: ShopifyMoney | null
}

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  options: {
    id: string
    name: string
    values: string[]
  }[]
  priceRange: {
    minVariantPrice: ShopifyMoney
    maxVariantPrice: ShopifyMoney
  }
  featuredImage: ShopifyImage | null
  images: {
    edges: {
      node: ShopifyImage
    }[]
  }
  variants: {
    edges: {
      node: ShopifyProductVariant
    }[]
  }
  seo: {
    title: string | null
    description: string | null
  }
  updatedAt: string
}

export interface ShopifyCollection {
  id: string
  handle: string
  title: string
  description: string
  image: ShopifyImage | null
  seo: {
    title: string | null
    description: string | null
  }
  products: {
    edges: {
      node: ShopifyProduct
    }[]
  }
}

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: {
    edges: {
      node: ShopifyCartLine
    }[]
  }
  cost: {
    subtotalAmount: ShopifyMoney
    totalAmount: ShopifyMoney
    totalTaxAmount?: ShopifyMoney
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    selectedOptions: {
      name: string
      value: string
    }[]
    product: {
      id: string
      handle: string
      title: string
      featuredImage: ShopifyImage | null
    }
    price: ShopifyMoney
  }
}

export interface ShopifyPage {
  id: string
  handle: string
  title: string
  body: string
  bodySummary: string
  seo: {
    title: string | null
    description: string | null
  }
  updatedAt: string
}

// API Response Types
export interface ShopifyProductsResponse {
  products: {
    edges: {
      node: ShopifyProduct
    }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export interface ShopifyProductResponse {
  product: ShopifyProduct | null
}

export interface ShopifyProductByHandleResponse {
  productByHandle: ShopifyProduct | null
}

export interface ShopifyCollectionsResponse {
  collections: {
    edges: {
      node: ShopifyCollection
    }[]
  }
}

export interface ShopifyCollectionResponse {
  collection: ShopifyCollection | null
}

export interface ShopifyCartResponse {
  cart: ShopifyCart | null
}

export interface ShopifyCreateCartResponse {
  cartCreate: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

export interface ShopifyAddToCartResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

export interface ShopifyUpdateCartResponse {
  cartLinesUpdate: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

export interface ShopifyRemoveFromCartResponse {
  cartLinesRemove: {
    cart: ShopifyCart | null
    userErrors: {
      field: string[]
      message: string
    }[]
  }
}

// Simplified types for app use
export interface Product {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  availableForSale: boolean
  tags: string[]
  options: {
    id: string
    name: string
    values: string[]
  }[]
  price: number
  compareAtPrice?: number
  currencyCode: string
  image: string
  images: string[]
  variants: ProductVariant[]
}

export interface ProductVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: number
  compareAtPrice?: number
}

export interface Collection {
  id: string
  handle: string
  title: string
  description: string
  image: string | null
  products: Product[]
}

export interface Cart {
  id: string
  checkoutUrl: string
  totalQuantity: number
  lines: CartLine[]
  subtotal: number
  total: number
  currencyCode: string
}

export interface CartLine {
  id: string
  quantity: number
  variantId: string
  variantTitle: string
  productId: string
  productHandle: string
  productTitle: string
  image: string | null
  price: number
  selectedOptions: {
    name: string
    value: string
  }[]
}

