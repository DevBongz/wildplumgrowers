"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Check, ChevronRight, Minus, Plus, Package, Shield, Headphones } from "lucide-react"
import type { Product } from "@/lib/shopify/types"

interface ProductClientProps {
  product: Product
  relatedProducts: Product[]
}

// Format price for ZAR
const formatPrice = (price: number) => {
  return `R ${price.toFixed(0)}`
}

function getProductCategory(product: Product): string {
  if (product.tags.some(t => t.toLowerCase().includes('accessories') || t.toLowerCase().includes('spray'))) {
    return 'Accessories'
  }
  return 'Grow Kit'
}

export function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    const cartItem = {
      id: product.handle,
      name: product.title,
      price: product.price,
      image: product.image,
      category: getProductCategory(product),
      description: product.description,
      variantId: product.variants[0]?.id,
    }
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-charcoal/50 backdrop-blur-sm border-b border-cream/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-cream/60">
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-cream transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-cream">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-earth-beige/20 border border-cream/10">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-olive/20 text-olive text-sm font-medium mb-4">
                {getProductCategory(product)}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
                {product.title}
              </h1>
              <p className="text-2xl font-bold text-mushroom-orange mb-6">{formatPrice(product.price)}</p>
              <p className="text-lg text-cream/70 mb-8 leading-relaxed text-pretty">{product.description}</p>

              {/* Features from HTML description */}
              {product.descriptionHtml && (
                <div 
                  className="prose prose-invert prose-sm mb-8 [&_ul]:space-y-2 [&_li]:text-cream/80 [&_p]:text-cream/70"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-cream/80 text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-cream/20 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-cream/5 transition-colors text-cream"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-2 text-cream font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-cream/5 transition-colors text-cream"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                disabled={!product.availableForSale}
                size="lg"
                className={`w-full md:w-auto rounded-full font-semibold mb-8 transition-all ${
                  !product.availableForSale
                    ? "bg-cream/20 text-cream/40 cursor-not-allowed"
                    : added
                    ? "bg-olive hover:bg-olive text-cream"
                    : "bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal"
                }`}
              >
                {!product.availableForSale ? (
                  "Out of Stock"
                ) : added ? (
                  <>
                    <Check className="mr-2 h-5 w-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-cream/10">
                <div className="text-center">
                  <Package className="h-8 w-8 text-olive mx-auto mb-2" />
                  <p className="text-xs text-cream/60">Free Shipping Over R500</p>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 text-olive mx-auto mb-2" />
                  <p className="text-xs text-cream/60">30-Day Guarantee</p>
                </div>
                <div className="text-center">
                  <Headphones className="h-8 w-8 text-olive mx-auto mb-2" />
                  <p className="text-xs text-cream/60">Expert Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal to-mushroom-brown/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-cream mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.handle}`}
                  className="group rounded-2xl overflow-hidden bg-cream/5 border border-cream/10 hover:border-mushroom-orange/50 transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-earth-beige/20">
                    <Image
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-cream mb-2 group-hover:text-mushroom-orange transition-colors">
                      {related.title}
                    </h3>
                    <span className="text-xl font-bold text-cream">{formatPrice(related.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

