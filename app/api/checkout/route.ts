import { NextRequest, NextResponse } from 'next/server'
import { createCart } from '@/lib/shopify'

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!

export async function POST(request: NextRequest) {
  try {
    const { items, useDirectUrl } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Filter items with variant IDs
    const validItems = items.filter((item: { variantId?: string }) => item.variantId)

    if (validItems.length === 0) {
      return NextResponse.json(
        { error: 'No valid items with variant IDs' },
        { status: 400 }
      )
    }

    // Method 1: Direct Cart URL (simpler, bypasses Storefront API cart)
    // Format: https://store.myshopify.com/cart/variant_id:quantity,variant_id:quantity
    if (useDirectUrl) {
      const cartItems = validItems.map((item: { variantId: string; quantity: number }) => {
        // Extract numeric ID from gid://shopify/ProductVariant/123456
        const numericId = item.variantId.split('/').pop()
        return `${numericId}:${item.quantity}`
      }).join(',')

      const checkoutUrl = `https://${SHOPIFY_STORE_DOMAIN}/cart/${cartItems}`
      return NextResponse.json({ checkoutUrl })
    }

    // Method 2: Storefront API Cart (original method)
    const lines = validItems.map((item: { variantId: string; quantity: number }) => ({
      merchandiseId: item.variantId,
      quantity: item.quantity,
    }))

    const cart = await createCart(lines)

    if (!cart || !cart.checkoutUrl) {
      return NextResponse.json(
        { error: 'Failed to create checkout' },
        { status: 500 }
      )
    }

    return NextResponse.json({ checkoutUrl: cart.checkoutUrl })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}

