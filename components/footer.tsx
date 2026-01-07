import Link from "next/link"
import { Instagram, Facebook, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-charcoal border-t border-cream/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-mushroom-orange to-mushroom-brown rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6 2 2 6 2 12h20C22 6 18 2 12 2z" className="text-cream" />
                  <path d="M12 22V12" className="text-cream" />
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight text-cream">Wild Plum Growers</span>
            </div>
            <p className="text-cream/60 text-sm mb-4 text-pretty max-w-sm">
              Cultivate Wonder. Premium organic mushroom grow kits for home cultivation.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://instagram.com"
                className="text-cream/60 hover:text-mushroom-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-cream/60 hover:text-mushroom-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@wildplumgrowers.com"
                className="text-cream/60 hover:text-mushroom-orange transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-cream mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop?category=Grow+Kits"
                  className="text-cream/60 hover:text-cream text-sm transition-colors"
                >
                  Grow Kits
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Bundles"
                  className="text-cream/60 hover:text-cream text-sm transition-colors"
                >
                  Bundles
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Supplies"
                  className="text-cream/60 hover:text-cream text-sm transition-colors"
                >
                  Supplies
                </Link>
              </li>
              <li>
                <Link
                  href="/shop?category=Accessories"
                  className="text-cream/60 hover:text-cream text-sm transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-cream mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/growing-guide" className="text-cream/60 hover:text-cream text-sm transition-colors">
                  Growing Guide
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/60 hover:text-cream text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/60 hover:text-cream text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-cream/40 text-sm">
          <p>&copy; 2026 Wild Plum Growers. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
