'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Cookie, Menu, X, User, Heart, ShoppingBag, MapPin, Shield } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = session?.user?.email === 'admin@cookiecastle.com'; // Simple check for demo

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-[#FFB3D9]/90 via-[#E1BEE7]/90 to-[#B3E5FC]/90 shadow-lg border-b-4 border-[#FF69B4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Cookie
                className="w-12 h-12 text-[#9B59B6] transition-transform group-hover:rotate-12 group-hover:scale-110"
                strokeWidth={2.5}
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F9DC5C] rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
                Cookie Castle
              </span>
              <span className="text-xs text-[#2C1810]/70 font-medium">
                Sweet Recipe Adventures
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/recipes"
              className="text-[#2C1810] hover:text-[#9B59B6] font-semibold transition-colors relative group text-sm"
            >
              Recipes
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#FF69B4] rounded-full transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/categories"
              className="text-[#2C1810] hover:text-[#3498DB] font-semibold transition-colors relative group text-sm"
            >
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#3498DB] rounded-full transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/marketplace"
              className="flex items-center gap-1 text-[#2C1810] hover:text-[#FF6B35] font-semibold transition-colors relative group text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Marketplace
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#FF6B35] rounded-full transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/popups"
              className="flex items-center gap-1 text-[#2C1810] hover:text-[#2ECC71] font-semibold transition-colors relative group text-sm"
            >
              <MapPin className="w-4 h-4" />
              Pop-ups
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#2ECC71] rounded-full transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/feed"
              className="flex items-center gap-1 text-[#2C1810] hover:text-[#E71D36] font-semibold transition-colors relative group text-sm"
            >
              <Heart className="w-4 h-4" />
              Feed
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#E71D36] rounded-full transition-all group-hover:w-full"></span>
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1 text-[#2C1810] hover:text-[#9B59B6] font-semibold transition-colors relative group text-sm"
              >
                <Shield className="w-4 h-4" />
                Admin
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#9B59B6] rounded-full transition-all group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/upload"
                  className="px-5 py-2 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm"
                >
                  + Add Recipe
                </Link>
                <Link
                  href="/profile"
                  className="p-2 bg-white/80 rounded-full hover:bg-white hover:shadow-md transition-all"
                >
                  <User className="w-6 h-6 text-[#9B59B6]" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-5 py-2 text-[#9B59B6] font-semibold hover:text-[#FF69B4] transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-white/80 rounded-lg hover:bg-white transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#E71D36]" />
            ) : (
              <Menu className="w-6 h-6 text-[#9B59B6]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/30">
            <Link
              href="/recipes"
              className="block px-4 py-2 text-[#2C1810] hover:bg-white/50 rounded-lg font-semibold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            <Link
              href="/categories"
              className="block px-4 py-2 text-[#2C1810] hover:bg-white/50 rounded-lg font-semibold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              href="/marketplace"
              className="block px-4 py-2 text-[#2C1810] hover:bg-white/50 rounded-lg font-semibold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/popups"
              className="block px-4 py-2 text-[#2C1810] hover:bg-white/50 rounded-lg font-semibold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pop-up Locations
            </Link>
            <Link
              href="/feed"
              className="block px-4 py-2 text-[#2C1810] hover:bg-white/50 rounded-lg font-semibold transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feed
            </Link>
            <Link
              href="/upload"
              className="block px-4 py-2 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-lg text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              + Add Recipe
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-2 bg-white/80 text-[#9B59B6] font-bold rounded-lg text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
