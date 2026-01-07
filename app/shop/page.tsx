"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { products, categories } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Check } from "lucide-react"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/home/newsletter"

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem(product)
    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-charcoal pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mushroom-brown/10 to-charcoal">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4 text-balance">Shop <span className="text-gradient">Grow Kits</span></h1>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto text-pretty">
            Everything you need to cultivate fresh, organic mushrooms at home. Choose your perfect kit.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 sticky top-20 z-40 bg-charcoal/80 backdrop-blur-md border-b border-cream/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-mushroom-orange text-charcoal"
                    : "bg-cream/5 text-cream/60 hover:bg-cream/10 hover:text-cream border border-cream/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-mushroom-orange/50 transition-all duration-300"
              >
                <Link href={`/products/${product.id}`} className="block">
                  <div className="aspect-square relative overflow-hidden bg-earth-beige/20">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="inline-block px-3 py-1 rounded-full bg-olive/20 text-olive text-xs font-medium mb-3">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2 group-hover:text-mushroom-orange transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-cream/60 text-sm mb-4 line-clamp-2 text-pretty">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cream">${product.price}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-5">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full rounded-full font-semibold transition-all ${
                      addedItems.has(product.id)
                        ? "bg-olive hover:bg-olive text-cream"
                        : "bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal"
                    }`}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  )
}
