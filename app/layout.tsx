import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { Navbar } from "@/components/navbar"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wild Plum Growers — Premium Mushroom Grow Kits",
  description:
    "Cultivate Wonder. Organic oyster mushroom grow kits for home cultivation. From substrate to harvest in 10 days.",
  keywords: ["mushroom grow kit", "oyster mushrooms", "home cultivation", "organic growing"],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
