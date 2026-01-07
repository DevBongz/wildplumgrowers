"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Footer } from "@/components/footer"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-charcoal pt-20">
      {/* Hero */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mushroom-brown/10 to-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-cream mb-6 text-balance">Get in <span className="text-gradient">Touch</span></h1>
          <p className="text-xl text-cream/70 leading-relaxed text-pretty">
            Have questions about growing? Need help with your order? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-cream mb-8">Contact Information</h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-olive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream mb-1">Email</h3>
                    <a
                      href="mailto:hello@wildplumgrowers.com"
                      className="text-cream/70 hover:text-mushroom-orange transition-colors"
                    >
                      hello@wildplumgrowers.com
                    </a>
                    <p className="text-cream/50 text-sm mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-olive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream mb-1">Phone</h3>
                    <a href="tel:+15551234567" className="text-cream/70 hover:text-mushroom-orange transition-colors">
                      (555) 123-4567
                    </a>
                    <p className="text-cream/50 text-sm mt-1">Mon-Fri, 9am-5pm PST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-olive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-cream mb-1">Location</h3>
                    <p className="text-cream/70">Portland, Oregon</p>
                    <p className="text-cream/50 text-sm mt-1">Growing from the Pacific Northwest</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-cream/5 border border-cream/10">
                <h3 className="font-semibold text-cream mb-3">Need immediate help?</h3>
                <p className="text-cream/70 text-sm mb-4 text-pretty">
                  Check out our Growing Guide for step-by-step instructions and troubleshooting tips.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-cream/20 text-cream hover:bg-cream/10 bg-transparent"
                >
                  <a href="/growing-guide">View Growing Guide</a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 rounded-2xl bg-cream/5 border border-cream/10">
              <h2 className="text-2xl font-bold text-cream mb-6">Send us a message</h2>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-olive/20 border border-olive/30 text-cream">
                  <p className="font-medium">Thanks for reaching out!</p>
                  <p className="text-sm text-cream/80 mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-cream mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-mushroom-orange"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cream mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-mushroom-orange"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-cream mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-mushroom-orange"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-cream mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/40 focus:border-mushroom-orange resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-mushroom-orange hover:bg-mushroom-orange/90 text-charcoal font-semibold rounded-full"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
