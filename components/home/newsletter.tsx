"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-charcoal to-mushroom-brown/10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-cream mb-4 text-balance">
          Join the Wild Plum <span className="text-gradient">Network</span>
        </h2>
        <p className="text-lg text-cream/60 mb-8 text-pretty">
          Get growing tips, exclusive offers, and harvest inspiration delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-mushroom-orange"
          />
          <Button
            type="submit"
            size="lg"
            className="bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full whitespace-nowrap"
          >
            Subscribe
          </Button>
        </form>

        {subscribed && (
          <p className="mt-4 text-olive font-medium animate-in fade-in slide-in-from-bottom-2">
            Thanks for subscribing! Check your inbox.
          </p>
        )}
      </div>
    </section>
  )
}
