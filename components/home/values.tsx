import { Sprout, Heart, Users } from "lucide-react"

const values = [
  {
    icon: Sprout,
    title: "Sustainability",
    description: "We use organic, renewable materials and sustainable growing practices that respect our planet.",
  },
  {
    icon: Heart,
    title: "Organic Quality",
    description: "100% organic substrate and spawn. No chemicals, no shortcuts. Just pure, natural mushrooms.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Join 50,000+ growers worldwide. Share your harvests and learn from our supportive community.",
  },
]

export function Values() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mushroom-brown/5 to-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
            Growing with <span className="text-gradient">Purpose</span>
          </h2>
          <p className="text-lg text-cream/60 max-w-2xl mx-auto text-pretty">
            Our mission goes beyond mushrooms. We're cultivating a sustainable future, one kit at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-cream/5 border border-cream/10 hover:border-olive/50 transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-olive/20 to-mushroom-brown/20 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8 text-olive" />
                </div>
                <h3 className="text-xl font-semibold text-cream mb-3">{value.title}</h3>
                <p className="text-cream/60 text-pretty">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-cream/10">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-mushroom-orange mb-2">50K+</div>
            <div className="text-cream/60 text-sm">Happy Growers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-mushroom-orange mb-2">98%</div>
            <div className="text-cream/60 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-mushroom-orange mb-2">10</div>
            <div className="text-cream/60 text-sm">Days to Harvest</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-mushroom-orange mb-2">100%</div>
            <div className="text-cream/60 text-sm">Organic</div>
          </div>
        </div>
      </div>
    </section>
  )
}
