"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react"
import { Footer } from "@/components/footer"

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    setCheckoutError(null)

    try {
      // Use direct URL method to bypass Storefront API cart authentication issues
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, useDirectUrl: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Redirect to Shopify checkout
      window.location.href = data.checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      setCheckoutError(error instanceof Error ? error.message : 'Checkout failed. Please try again.')
      setIsCheckingOut(false)
    }
  }

  const shipping = subtotal >= 500 ? 0 : 75 // Free shipping over R500
  const total = subtotal + shipping

  // Format price for ZAR
  const formatPrice = (price: number) => `R ${price.toFixed(0)}`

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-charcoal pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cream/5 mb-6">
              <ShoppingBag className="h-10 w-10 text-cream/40" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-cream mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-cream/60 mb-8">Start your growing journey by adding some kits to your cart.</p>
            <Button
              asChild
              size="lg"
              className="bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full"
            >
              <Link href="/shop">
                Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-charcoal pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-2">Shopping Cart</h1>
          <p className="text-cream/60 mb-12">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-2xl bg-cream/5 border border-cream/10 hover:border-cream/20 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-earth-beige/20 flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`} className="group">
                      <h3 className="text-lg font-semibold text-cream group-hover:text-mushroom-orange transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-cream/60 mb-3">{item.category}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-cream/20 rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-cream/5 transition-colors text-cream"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-4 py-1 text-cream text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-cream/5 transition-colors text-cream"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-cream">{formatPrice(item.price * item.quantity)}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-cream/60 hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-2xl bg-cream/5 border border-cream/10">
                <h2 className="text-xl font-semibold text-cream mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-cream/80">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-cream/80">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  {subtotal < 500 && shipping > 0 && (
                    <p className="text-xs text-olive">Add {formatPrice(500 - subtotal)} more for free shipping!</p>
                  )}
                  <div className="pt-3 border-t border-cream/10 flex justify-between text-lg font-bold text-cream">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {checkoutError && (
                  <p className="text-red-400 text-sm mb-3">{checkoutError}</p>
                )}

                <Button
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full mb-3 disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Checkout...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-cream/20 text-cream hover:bg-cream/10 bg-transparent"
                >
                  <Link href="/shop">Continue Shopping</Link>
                </Button>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-cream/10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-cream/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-olive" />
                    <span>Secure Shopify checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cream/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-olive" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-cream/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-olive" />
                    <span>Free shipping over R500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
