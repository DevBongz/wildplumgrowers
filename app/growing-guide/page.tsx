"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Footer } from "@/components/footer"
import { Play, Droplets, Thermometer, Sun, Scissors, RefreshCw } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: Droplets,
    title: "Unpack & Mist",
    description: "Remove your kit from packaging. Mist the substrate 2-3 times daily with clean water.",
    tip: "Use filtered or distilled water for best results.",
  },
  {
    number: 2,
    icon: Thermometer,
    title: "Maintain Temperature",
    description: "Keep your kit at 65-75°F (18-24°C). Room temperature is usually perfect.",
    tip: "Avoid direct heat sources or cold drafts.",
  },
  {
    number: 3,
    icon: Sun,
    title: "Provide Indirect Light",
    description: "Place in a location with indirect natural light. A kitchen counter works great.",
    tip: "Mushrooms need some light but avoid direct sunlight.",
  },
  {
    number: 4,
    icon: Droplets,
    title: "Watch Them Grow",
    description: "Pins will appear in 5-7 days. Continue misting 2-3 times daily.",
    tip: "Mushrooms double in size every 24 hours during fruiting!",
  },
  {
    number: 5,
    icon: Scissors,
    title: "Harvest",
    description: "When caps begin to flatten (7-10 days), harvest by cutting at the base with clean scissors.",
    tip: "Harvest before they release spores for best flavor.",
  },
  {
    number: 6,
    icon: RefreshCw,
    title: "Second Flush",
    description: "After harvesting, rest the kit for 7 days, then resume misting for another harvest.",
    tip: "Most kits produce 2-3 flushes of mushrooms.",
  },
]

const faqs = [
  {
    question: "How long does it take to grow mushrooms?",
    answer:
      "From opening your kit to first harvest is typically 7-10 days. You'll see pins (baby mushrooms) starting around day 5, and they'll be ready to harvest within a few days after that.",
  },
  {
    question: "How often should I mist my kit?",
    answer:
      "Mist your kit 2-3 times daily with clean water. The substrate should stay moist but not waterlogged. If your environment is very dry, you may need to mist more frequently.",
  },
  {
    question: "What temperature is best for growing?",
    answer:
      "Oyster mushrooms thrive at room temperature, ideally 65-75°F (18-24°C). Avoid placing your kit near heaters, air conditioners, or in direct sunlight.",
  },
  {
    question: "How many harvests can I get from one kit?",
    answer:
      "Most kits produce 2-3 flushes of mushrooms. After each harvest, rest the kit for about a week, then resume misting. Each subsequent flush may be slightly smaller than the previous one.",
  },
  {
    question: "My mushrooms haven't grown yet. What should I do?",
    answer:
      "Check that you're misting regularly and the kit is in proper conditions (temperature and humidity). If it's been more than 14 days with no growth, contact our support team — we're here to help!",
  },
  {
    question: "How do I know when to harvest?",
    answer:
      "Harvest when the caps begin to flatten out and before they start to release spores (visible as a white powder). The mushrooms should be firm and the gills should be clearly visible.",
  },
]

export default function GrowingGuidePage() {
  return (
    <div className="min-h-screen bg-charcoal pt-20">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mushroom-brown/10 to-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cream mb-6 text-balance">Growing <span className="text-gradient">Guide</span></h1>
          <p className="text-xl text-cream/70 leading-relaxed mb-8 text-pretty">
            Everything you need to know to successfully grow your own oyster mushrooms. Follow these simple steps and
            you'll be harvesting in 10 days.
          </p>

          {/* Video Placeholder */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-earth-beige/20 border border-cream/10 group cursor-pointer">
            <Image src="/mushroom-grow-kit-growing-timelapse-thumbnail.jpg" alt="Growing Guide Video" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/50 group-hover:bg-charcoal/40 transition-colors">
              <div className="w-20 h-20 rounded-full bg-mushroom-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-charcoal ml-1" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growing Steps */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-cream mb-4">6 Simple Steps to Success</h2>
            <p className="text-lg text-cream/60 text-pretty">No experience needed — just follow along</p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div
                  key={step.number}
                  className="flex gap-6 p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-olive/30 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-olive/20 to-mushroom-brown/20 flex items-center justify-center mb-2">
                      <Icon className="h-8 w-8 text-olive" />
                    </div>
                    <div className="text-center text-2xl font-bold text-cream/40">{step.number}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-cream mb-2">{step.title}</h3>
                    <p className="text-cream/70 mb-3 leading-relaxed text-pretty">{step.description}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-olive/10 text-olive text-sm">
                      💡 Tip: {step.tip}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal to-mushroom-brown/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight text-cream mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-cream/60 text-pretty">Got questions? We've got answers.</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-cream/10 rounded-2xl px-6 bg-cream/5 data-[state=open]:border-olive/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-cream hover:text-olive hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-cream/70 pb-6 leading-relaxed text-pretty">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-6 text-balance">
            Ready to Cultivate Wonder?
          </h2>
          <p className="text-lg text-cream/60 mb-8 text-pretty">
            Get your grow kit today and start your mushroom growing journey.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full"
          >
            <Link href="/shop">Shop Grow Kits</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
