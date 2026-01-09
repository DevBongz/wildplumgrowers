import { getProducts } from "@/lib/shopify"
import { ShopClient } from "@/components/shop/shop-client"
import { Footer } from "@/components/footer"
import { Newsletter } from "@/components/home/newsletter"

export const revalidate = 3600 // Revalidate every hour

export default async function ShopPage() {
  const products = await getProducts({ first: 50 })

  return (
    <div className="min-h-screen bg-charcoal pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mushroom-brown/10 to-charcoal">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cream mb-4 text-balance">
            Shop <span className="text-gradient">Grow Kits</span>
          </h1>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto text-pretty">
            Everything you need to cultivate fresh, organic mushrooms at home. Choose your perfect kit.
          </p>
        </div>
      </section>

      <ShopClient products={products} />

      <Newsletter />
      <Footer />
    </div>
  )
}
