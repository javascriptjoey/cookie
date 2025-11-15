import Link from 'next/link';
import { Cookie, Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#E1BEE7] via-[#FFB3D9] to-[#B3E5FC] border-t-4 border-[#9B59B6] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cookie className="w-8 h-8 text-[#9B59B6]" strokeWidth={2.5} />
              <span className="text-xl font-bold bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
                Cookie Castle
              </span>
            </div>
            <p className="text-sm text-[#2C1810]/70">
              Your magical destination for cookie recipes, sharing sweet moments, and building a delicious community!
            </p>
            <div className="flex items-center gap-2 text-sm text-[#2C1810]/70">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-[#E71D36] fill-[#E71D36]" />
              <span>and sprinkles</span>
            </div>
          </div>

          {/* Recipes */}
          <div>
            <h3 className="font-bold text-[#9B59B6] mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-sm text-[#2C1810]/70 hover:text-[#E71D36] transition-colors">
                  All Recipes
                </Link>
              </li>
              <li>
                <Link href="/categories/no-bake" className="text-sm text-[#2C1810]/70 hover:text-[#FF6B35] transition-colors">
                  No Bake Cookies
                </Link>
              </li>
              <li>
                <Link href="/categories/gluten-free" className="text-sm text-[#2C1810]/70 hover:text-[#3498DB] transition-colors">
                  Gluten Free
                </Link>
              </li>
              <li>
                <Link href="/categories/dairy-free" className="text-sm text-[#2C1810]/70 hover:text-[#2ECC71] transition-colors">
                  Dairy Free
                </Link>
              </li>
              <li>
                <Link href="/categories/no-nuts" className="text-sm text-[#2C1810]/70 hover:text-[#F9DC5C] transition-colors">
                  Nut Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-[#9B59B6] mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/feed" className="text-sm text-[#2C1810]/70 hover:text-[#E71D36] transition-colors">
                  Community Feed
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-sm text-[#2C1810]/70 hover:text-[#FF6B35] transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/popups" className="text-sm text-[#2C1810]/70 hover:text-[#2ECC71] transition-colors">
                  Pop-up Locations
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-sm text-[#2C1810]/70 hover:text-[#FF69B4] transition-colors">
                  Share Your Recipe
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[#2C1810]/70 hover:text-[#3498DB] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold text-[#9B59B6] mb-4">Connect</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2C1810]/70" />
                <a href="mailto:hello@cookiecastle.com" className="text-sm text-[#2C1810]/70 hover:text-[#E71D36] transition-colors">
                  hello@cookiecastle.com
                </a>
              </div>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="p-2 bg-white/50 hover:bg-[#3498DB] hover:text-white rounded-full transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/50 hover:bg-[#E71D36] hover:text-white rounded-full transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white/50 hover:bg-[#3498DB] hover:text-white rounded-full transition-all hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#2C1810]/60">
            © 2025 Cookie Castle. All rights reserved. Baked with love.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-[#2C1810]/60 hover:text-[#9B59B6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-[#2C1810]/60 hover:text-[#9B59B6] transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-[#2C1810]/60 hover:text-[#9B59B6] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
