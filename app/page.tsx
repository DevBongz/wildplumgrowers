import { Hero } from "@/components/home/hero"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Values } from "@/components/home/values"
import { Newsletter } from "@/components/home/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Values />
      <Newsletter />
      <Footer />
    </main>
  )
}
