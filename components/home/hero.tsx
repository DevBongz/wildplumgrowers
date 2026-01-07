"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size based on container (constrained, not full screen)
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Preload images (26 frames)
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

    // Scroll-based animation
    const handleScroll = () => {
      if (loading) return
      const scrollTop = window.scrollY
      const maxScroll = window.innerHeight * 2
      const scrollFraction = Math.min(scrollTop / maxScroll, 1)
      const frameIndex = Math.floor(scrollFraction * (frameCount - 1))

      const img = images[frameIndex]
      if (img?.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // Use contain scaling to fit image without cropping
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
        const scaledWidth = img.width * scale
        const scaledHeight = img.height * scale
        const x = (canvas.width - scaledWidth) / 2
        const y = (canvas.height - scaledHeight) / 2
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial render

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [loading])

  return (
    <section className="relative h-[300vh]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal flex items-end justify-center">
        {/* Constrained canvas container */}
        <div 
          ref={containerRef}
          className="relative w-full max-w-5xl h-[50vh] md:h-[70vh] mb-0"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          {/* Gradient fade overlay to blend animation edges with background */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            {/* Side fades */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-charcoal via-charcoal/30 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-charcoal via-charcoal/30 to-transparent" />
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-charcoal via-charcoal/30 to-transparent" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
            <div className="text-center">
              <div className="mb-4 text-cream/60 text-sm tracking-tight">Loading Experience</div>
              <div className="w-64 h-1 bg-cream/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-mushroom-orange transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <div className="mt-2 text-cream/40 text-xs">{loadProgress}%</div>
            </div>
          </div>
        )}

        {/* Text Overlays */}
        {!loading && (
          <>
            {/* Initial Text - Centered on mobile, left-center on desktop */}
            <div className="absolute inset-x-0 top-0 bottom-[50vh] md:bottom-0 md:inset-0 flex items-center md:items-center justify-center md:justify-start px-6 md:px-16 pointer-events-none hero-text-1">
              <div className="max-w-2xl text-center md:text-left md:-mt-32">
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-cream mb-3 md:mb-4 text-balance">
                  Cultivate <span className="text-gradient">Wonder</span>
                </h1>
                <p className="text-base md:text-xl text-cream/60 mb-6 md:mb-8 text-pretty max-w-sm mx-auto md:mx-0">
                  Grow your own organic oyster mushrooms at home. No experience needed.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4 pointer-events-auto justify-center md:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full text-sm md:text-base"
                  >
                    <Link href="/shop">
                      Shop Grow Kits <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-cream/20 text-cream hover:bg-cream/10 bg-transparent text-sm md:text-base"
                  >
                    <Link href="/growing-guide">Growing Guide</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mid-Scroll Text - Hidden on mobile */}
            <div className="hidden md:flex absolute inset-0 items-center justify-end px-8 md:px-16 pointer-events-none hero-text-2">
              <div className="max-w-xl text-right">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
                  From Substrate to Harvest
                </h2>
                <p className="text-lg text-cream/60 text-pretty">In just 10 days</p>
              </div>
            </div>

            {/* Final Text - Hidden on mobile */}
            <div className="hidden md:flex absolute inset-x-0 bottom-4 justify-center pointer-events-none hero-text-3">
              <div className="text-center">
                <p className="text-mushroom-orange text-sm">Scroll to explore</p>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
