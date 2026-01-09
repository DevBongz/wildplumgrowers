"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Check } from "lucide-react"
import type { Product } from "@/lib/shopify/types"

interface ShopClientProps {
  products: Product[]
}

// Extract unique product types for filtering
function getCategories(products: Product[]): string[] {
  const types = new Set<string>()
  products.forEach((p) => {
    // Use tags to determine category
    if (p.tags.some(t => t.toLowerCase().includes('grow kit'))) {
      types.add('Grow Kits')
    }
    if (p.tags.some(t => t.toLowerCase().includes('accessories') || t.toLowerCase().includes('spray'))) {
      types.add('Accessories')
    }
  })
  return ['All', ...Array.from(types)]
}

function getProductCategory(product: Product): string {
  if (product.tags.some(t => t.toLowerCase().includes('accessories') || t.toLowerCase().includes('spray'))) {
    return 'Accessories'
  }
  return 'Grow Kits'
}

export function ShopClient({ products }: ShopClientProps) {
  const categories = getCategories(products)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => getProductCategory(p) === selectedCategory)

  const handleAddToCart = (product: Product) => {
    // Convert Shopify product to cart item format
    const cartItem = {
      id: product.handle,
      name: product.title,
      price: product.price,
      image: product.image,
      category: getProductCategory(product),
      description: product.description,
      variantId: product.variants[0]?.id, // Store variant ID for Shopify checkout
    }
    addItem(cartItem)
    setAddedItems((prev) => new Set(prev).add(product.handle))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.handle)
        return next
      })
    }, 2000)
  }

  // Format price for ZAR
  const formatPrice = (price: number) => {
    return `R ${price.toFixed(0)}`
  }

  return (
    <>
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
                <Link href={`/products/${product.handle}`} className="block">
                  <div className="aspect-square relative overflow-hidden bg-earth-beige/20">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="inline-block px-3 py-1 rounded-full bg-olive/20 text-olive text-xs font-medium mb-3">
                      {getProductCategory(product)}
                    </div>
                    <h3 className="text-lg font-semibold text-cream mb-2 group-hover:text-mushroom-orange transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-cream/60 text-sm mb-4 line-clamp-2 text-pretty">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cream">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-5">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.availableForSale}
                    className={`w-full rounded-full font-semibold transition-all ${
                      !product.availableForSale
                        ? "bg-cream/20 text-cream/40 cursor-not-allowed"
                        : addedItems.has(product.handle)
                        ? "bg-olive hover:bg-olive text-cream"
                        : "bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal"
                    }`}
                  >
                    {!product.availableForSale ? (
                      "Out of Stock"
                    ) : addedItems.has(product.handle) ? (
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

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cream/60 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

