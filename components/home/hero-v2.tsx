"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroV2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Text section animations based on scroll progress
  // Hero section: 0% - 15%
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [1, 1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  // Feature 1 (Premium Substrate): 18% - 35%
  const feature1Opacity = useTransform(scrollYProgress, [0.18, 0.23, 0.32, 0.38], [0, 1, 1, 0])
  const feature1Y = useTransform(scrollYProgress, [0.18, 0.23, 0.32, 0.38], [40, 0, 0, -40])

  // Stats section: 40% - 55%
  const statsOpacity = useTransform(scrollYProgress, [0.40, 0.45, 0.52, 0.58], [0, 1, 1, 0])
  const statsY = useTransform(scrollYProgress, [0.40, 0.45, 0.52, 0.58], [40, 0, 0, -40])

  // Feature 2 (Ready to Grow): 60% - 75%
  const feature2Opacity = useTransform(scrollYProgress, [0.60, 0.65, 0.72, 0.78], [0, 1, 1, 0])
  const feature2Y = useTransform(scrollYProgress, [0.60, 0.65, 0.72, 0.78], [40, 0, 0, -40])

  // CTA section: 80% - 100%
  const ctaOpacity = useTransform(scrollYProgress, [0.80, 0.88], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.80, 0.88], [40, 0])

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Canvas and image loading
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Preload images (26 frames)
    // For mobile-specific frames, you would use:
    // const basePath = isMobile ? '/mushroom-images/mobile' : '/mushroom-images'
    const frameCount = 26
    const images: HTMLImageElement[] = []
    let loadedImages = 0

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.src = `/mushroom-images/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
      img.onload = () => {
        loadedImages++
        setLoadProgress(Math.round((loadedImages / frameCount) * 100))
        if (loadedImages === frameCount) {
          setLoading(false)
        }
      }
      images.push(img)
    }
    imagesRef.current = images

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [isMobile])

  // Scroll-based frame animation
  useEffect(() => {
    if (loading) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const images = imagesRef.current
    const frameCount = images.length

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const frameIndex = Math.min(
        Math.floor(progress * (frameCount - 1)),
        frameCount - 1
      )

      const img = images[frameIndex]
      if (img?.complete) {
        const rect = canvas.getBoundingClientRect()
        ctx.clearRect(0, 0, rect.width, rect.height)
        
        // Use contain scaling
        const scale = Math.min(rect.width / img.width, rect.height / img.height)
        const scaledWidth = img.width * scale
        const scaledHeight = img.height * scale
        const x = (rect.width - scaledWidth) / 2
        const y = (rect.height - scaledHeight) / 2
        
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
      }
    })

    return () => unsubscribe()
  }, [loading, scrollYProgress])

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-charcoal">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <div className="absolute inset-0 flex items-end justify-center pb-0 md:pb-0">
          <div className="relative w-full max-w-5xl h-[55vh] md:h-[75vh]">
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full"
              style={{ imageRendering: 'auto' }}
            />
            {/* Gradient fade overlay */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-32 md:w-56 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-32 md:w-56 bg-gradient-to-l from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-charcoal via-charcoal/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal z-50">
            <div className="text-center">
              <div className="mb-4 text-cream/60 text-sm tracking-widest uppercase">Loading Experience</div>
              <div className="w-64 h-1 bg-cream/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-mushroom-orange"
                  initial={{ width: 0 }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-2 text-cream/40 text-xs">{loadProgress}%</div>
            </div>
          </div>
        )}

        {/* Text Overlays */}
        {!loading && (
          <>
            {/* Hero Section - Initial */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="absolute inset-0 flex flex-col items-center md:items-start justify-start pt-24 md:pt-32 px-6 md:px-16 pointer-events-none z-20"
            >
              <div className="text-center md:text-left max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="mb-4 block text-xs tracking-[0.4em] text-mushroom-orange uppercase"
                >
                  Cultivate Wonder
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream leading-tight"
                >
                  Oyster Mushroom
                  <span className="block text-gradient">Grow Kit</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mt-6 max-w-sm mx-auto md:mx-0 text-base md:text-lg text-cream/60"
                >
                  From substrate to harvest in 10 days.
                  <br />
                  No experience required.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-10 flex flex-col items-center md:items-start gap-2"
                >
                  <span className="text-xs tracking-widest text-cream/30 uppercase">Scroll to explore</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-8 w-[1px] bg-gradient-to-b from-mushroom-orange/60 to-transparent"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Feature 1 - Premium Substrate */}
            <motion.div
              style={{ opacity: feature1Opacity, y: feature1Y }}
              className="absolute inset-0 flex flex-col items-center md:items-start justify-start md:justify-center pt-24 md:pt-0 px-6 md:px-16 pointer-events-none z-20"
            >
              <div className="max-w-xl text-center md:text-left">
                <span className="text-xs tracking-[0.3em] text-mushroom-orange uppercase">
                  01 — Premium Substrate
                </span>
                
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cream leading-snug">
                  Organic hardwood
                  <br />
                  <span className="text-cream/60">enriched with nutrients</span>
                </h2>
                
                <p className="mt-6 max-w-md mx-auto md:mx-0 text-base md:text-lg text-cream/50 leading-relaxed">
                  Our substrate blend combines sustainably sourced oak sawdust 
                  with wheat bran and gypsum — the perfect foundation for 
                  thriving mycelium networks.
                </p>

                <div className="mt-8 flex justify-center md:justify-start gap-8">
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-mushroom-orange">100%</span>
                    <span className="text-xs tracking-wide text-cream/40 uppercase">Organic</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold text-olive">3x</span>
                    <span className="text-xs tracking-wide text-cream/40 uppercase">Yield Boost</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              style={{ opacity: statsOpacity, y: statsY }}
              className="absolute inset-x-0 top-0 flex items-start justify-center pt-24 md:pt-32 pointer-events-none z-20"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 text-center bg-charcoal/60 backdrop-blur-sm px-8 py-6 rounded-2xl">
                <div>
                  <div className="text-4xl md:text-6xl font-bold text-mushroom-orange">10</div>
                  <div className="mt-2 text-xs tracking-widest text-cream/40 uppercase">Days to Harvest</div>
                </div>
                <div>
                  <div className="text-4xl md:text-6xl font-bold text-cream">98%</div>
                  <div className="mt-2 text-xs tracking-widest text-cream/40 uppercase">Success Rate</div>
                </div>
                <div>
                  <div className="text-4xl md:text-6xl font-bold text-olive">50K+</div>
                  <div className="mt-2 text-xs tracking-widest text-cream/40 uppercase">Happy Growers</div>
                </div>
                <div>
                  <div className="text-4xl md:text-6xl font-bold text-mushroom-orange">2-3</div>
                  <div className="mt-2 text-xs tracking-widest text-cream/40 uppercase">Flush Cycles</div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 - Ready to Grow */}
            <motion.div
              style={{ opacity: feature2Opacity, y: feature2Y }}
              className="absolute inset-0 flex flex-col items-center md:items-end justify-start md:justify-center pt-24 md:pt-0 px-6 md:px-16 pointer-events-none z-20"
            >
              <div className="max-w-xl text-center md:text-right">
                <span className="text-xs tracking-[0.3em] text-olive uppercase">
                  02 — Ready to Grow
                </span>
                
                <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-cream leading-snug">
                  Just add water,
                  <br />
                  <span className="text-cream/60">watch them flourish</span>
                </h2>
                
                <p className="mt-6 mx-auto md:ml-auto md:mr-0 max-w-md text-base md:text-lg text-cream/50 leading-relaxed">
                  Pre-colonized with White, Grey, and Brown Oyster varieties. 
                  Simply cut the bag, mist twice daily, and harvest your first 
                  flush in 7-10 days.
                </p>

                <div className="mt-8 flex justify-center md:justify-end gap-8">
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-3xl font-bold text-cream">7-10</span>
                    <span className="text-xs tracking-wide text-cream/40 uppercase">Days</span>
                  </div>
                  <div className="flex flex-col items-center md:items-end">
                    <span className="text-3xl font-bold text-mushroom-orange">2x</span>
                    <span className="text-xs tracking-wide text-cream/40 uppercase">Daily Misting</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="absolute inset-0 flex flex-col items-center md:items-start justify-start md:justify-center pt-24 md:pt-0 px-6 md:px-16 pointer-events-none z-20"
            >
              <div className="text-center md:text-left max-w-2xl">
                <span className="text-xs tracking-[0.3em] text-mushroom-orange uppercase">
                  Harvest Happiness
                </span>
                
                <h2 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-cream leading-snug">
                  Start your mushroom
                  <span className="block text-gradient">journey today</span>
                </h2>
                
                <p className="mt-6 max-w-lg text-base md:text-lg text-cream/50">
                  Each kit includes detailed growing instructions, a humidity tent, 
                  and our grower's support line. Fresh, gourmet mushrooms — grown by you.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-4 pointer-events-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full px-8"
                  >
                    <Link href="/shop">
                      Shop Grow Kits — $34 <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-cream/20 text-cream hover:bg-cream/10 bg-transparent"
                  >
                    <Link href="/growing-guide">Learn More</Link>
                  </Button>
                </div>

                <div className="mt-12 flex justify-center md:justify-start gap-8 text-xs text-cream/30">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Free Shipping
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    100% Guarantee
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

