import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Sprout, Heart, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-charcoal pt-20">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mushroom-brown/10 to-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cream mb-6 text-balance">
            Cultivating <span className="text-gradient">Wonder</span>, One Kit at a Time
          </h1>
          <p className="text-xl text-cream/70 leading-relaxed text-pretty">
            We believe everyone should experience the magic of growing their own food. That's why we created Wild Plum
            Growers — to make mycology accessible, sustainable, and truly delightful.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src="/person-harvesting-oyster-mushrooms-in-cozy-kitchen.jpg" alt="Our Story" fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-cream mb-6">Our Story</h2>
              <div className="space-y-4 text-cream/70 leading-relaxed">
                <p className="text-pretty">
                  Wild Plum Growers was born from a simple observation: growing mushrooms at home was either too
                  complicated or too expensive. We knew there had to be a better way.
                </p>
                <p className="text-pretty">
                  After years of perfecting our organic substrate blend and simplifying the growing process, we created
                  kits that anyone can use — no mycology degree required. Just mist, wait, and harvest.
                </p>
                <p className="text-pretty">
                  Today, over 50,000 growers have cultivated their own mushrooms with Wild Plum Growers. From apartment
                  kitchens to suburban homes, we're helping people reconnect with their food and discover the wonder of
                  home cultivation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal to-mushroom-brown/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
              What We <span className="text-gradient">Stand For</span>
            </h2>
            <p className="text-lg text-cream/60 max-w-2xl mx-auto text-pretty">
              Our values guide everything we do, from sourcing to customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10">
              <Sprout className="h-12 w-12 text-olive mb-4" />
              <h3 className="text-2xl font-semibold text-cream mb-3">Sustainability First</h3>
              <p className="text-cream/70 leading-relaxed text-pretty">
                We use 100% organic materials, biodegradable packaging, and sustainable growing practices. Every kit is
                designed to minimize waste and maximize yields.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10">
              <Heart className="h-12 w-12 text-olive mb-4" />
              <h3 className="text-2xl font-semibold text-cream mb-3">Organic Quality</h3>
              <p className="text-cream/70 leading-relaxed text-pretty">
                No shortcuts, no chemicals, no compromises. Our substrate and spawn are certified organic, ensuring you
                grow the purest mushrooms possible.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10">
              <Users className="h-12 w-12 text-olive mb-4" />
              <h3 className="text-2xl font-semibold text-cream mb-3">Community & Support</h3>
              <p className="text-cream/70 leading-relaxed text-pretty">
                You're never alone on your growing journey. Our community and expert support team are here to help you
                succeed, from first mist to final harvest.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10">
              <Award className="h-12 w-12 text-olive mb-4" />
              <h3 className="text-2xl font-semibold text-cream mb-3">Excellence & Innovation</h3>
              <p className="text-cream/70 leading-relaxed text-pretty">
                We're constantly improving our kits and developing new varieties. Our 98% success rate speaks to our
                commitment to quality and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-6 text-balance">
            Ready to Start <span className="text-gradient">Growing?</span>
          </h2>
          <p className="text-lg text-cream/60 mb-8 text-pretty">
            Join thousands of home growers and experience the magic of cultivating your own mushrooms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full"
            >
              <Link href="/shop">Shop Grow Kits</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-cream/20 text-cream hover:bg-cream/10 bg-transparent"
            >
              <Link href="/growing-guide">View Growing Guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
