import { HeroV2 } from "@/components/home/hero-v2"
import { FeaturedProducts } from "@/components/home/featured-products"
import { Values } from "@/components/home/values"
import { Newsletter } from "@/components/home/newsletter"
import { Footer } from "@/components/footer"

export default function HeroV2Page() {
  return (
    <main className="bg-charcoal">
      <HeroV2 />
      <FeaturedProducts />
      <Values />
      <Newsletter />
      <Footer />
    </main>
  )
}

