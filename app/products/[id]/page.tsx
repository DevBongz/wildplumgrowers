"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Check, ChevronRight, Minus, Plus, Package, Shield, Headphones } from "lucide-react"
import { Footer } from "@/components/footer"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const product = products.find((p) => p.id === resolvedParams.id)

  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-charcoal pt-20">
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
            <span className="text-cream">{product.name}</span>
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
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-olive/20 text-olive text-sm font-medium mb-4">
                {product.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-mushroom-orange mb-6">${product.price}</p>
              <p className="text-lg text-cream/70 mb-8 leading-relaxed text-pretty">{product.description}</p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-olive/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-olive" />
                  </div>
                  <span className="text-cream/80 text-sm">100% organic substrate and spawn</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-olive/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-olive" />
                  </div>
                  <span className="text-cream/80 text-sm">No experience needed - perfect for beginners</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-olive/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-olive" />
                  </div>
                  <span className="text-cream/80 text-sm">Harvest in 7-10 days</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-olive/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-olive" />
                  </div>
                  <span className="text-cream/80 text-sm">Multiple harvests from one kit</span>
                </div>
              </div>

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
                size="lg"
                className={`w-full md:w-auto rounded-full font-semibold mb-8 transition-all ${
                  added
                    ? "bg-olive hover:bg-olive text-cream"
                    : "bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal"
                }`}
              >
                {added ? (
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
                  <p className="text-xs text-cream/60">Free Shipping Over $75</p>
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
                  href={`/products/${related.id}`}
                  className="group rounded-2xl overflow-hidden bg-cream/5 border border-cream/10 hover:border-mushroom-orange/50 transition-all duration-300"
                >
                  <div className="aspect-square relative overflow-hidden bg-earth-beige/20">
                    <Image
                      src={related.image || "/placeholder.svg"}
                      alt={related.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-cream mb-2 group-hover:text-mushroom-orange transition-colors">
                      {related.name}
                    </h3>
                    <span className="text-xl font-bold text-cream">${related.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
