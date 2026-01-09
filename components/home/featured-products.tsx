import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/shopify"
import { ArrowRight } from "lucide-react"

export async function FeaturedProducts() {
  const products = await getProducts({ first: 6 })
  
  // Get first 3 grow kits (excluding accessories)
  const featured = products
    .filter(p => !p.tags.some(t => t.toLowerCase().includes('accessories') || t.toLowerCase().includes('spray')))
    .slice(0, 3)

  // Format price for ZAR
  const formatPrice = (price: number) => {
    return `R ${price.toFixed(0)}`
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal via-charcoal to-mushroom-brown/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
            Start Your Growing <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto text-pretty">
            Choose from our premium mushroom grow kits. Each kit includes everything you need for a successful
            harvest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group relative rounded-2xl overflow-hidden bg-cream/5 backdrop-blur-sm border border-cream/10 hover:border-mushroom-orange/50 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square relative overflow-hidden bg-earth-beige/20">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 rounded-full bg-olive/20 text-olive text-xs font-medium mb-3">
                  Grow Kit
                </div>
                <h3 className="text-xl font-semibold text-cream mb-2 group-hover:text-mushroom-orange transition-colors">
                  {product.title}
                </h3>
                <p className="text-cream/60 text-sm mb-4 text-pretty line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-cream">{formatPrice(product.price)}</span>
                  <span className="text-mushroom-orange text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-cream/20 text-cream hover:bg-cream/10 bg-transparent"
          >
            <Link href="/shop">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
