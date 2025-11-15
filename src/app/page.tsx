import Link from 'next/link';
import { Cookie, Upload, Heart, Star, ShoppingBag, MapPin, Users, Share2, Filter } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFB3D9]/20 via-[#E1BEE7]/20 to-[#B3E5FC]/20"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Animated Cookie Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <Cookie className="relative w-24 h-24 text-[#9B59B6] candy-float" strokeWidth={2} />
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-gradient-to-r from-[#E71D36] via-[#FF69B4] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
                Welcome to Cookie Castle
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#2C1810]/70 max-w-3xl mx-auto">
              Your magical kingdom of cookie recipes, sweet connections, and delicious adventures!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/recipes"
                className="px-8 py-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all text-lg"
              >
                Explore Recipes
              </Link>
              <Link
                href="/upload"
                className="px-8 py-4 bg-white border-4 border-[#9B59B6] text-[#9B59B6] font-bold rounded-full hover:bg-[#9B59B6] hover:text-white hover:shadow-xl transition-all text-lg"
              >
                Share Your Recipe
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              Sweet Features
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Upload Recipes */}
            <div className="bg-gradient-to-br from-[#FFB3D9]/30 to-[#E1BEE7]/30 p-8 rounded-3xl border-4 border-[#FF69B4]/30 hover:border-[#FF69B4] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#9B59B6] mb-2">Upload & Share</h3>
              <p className="text-[#2C1810]/70">
                Share your cookie creations with photos, videos, or YouTube links. Let the world taste your magic!
              </p>
            </div>

            {/* Categories */}
            <div className="bg-gradient-to-br from-[#B3E5FC]/30 to-[#98D8C8]/30 p-8 rounded-3xl border-4 border-[#3498DB]/30 hover:border-[#3498DB] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3498DB] to-[#2ECC71] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Filter className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#3498DB] mb-2">Smart Categories</h3>
              <p className="text-[#2C1810]/70">
                Filter by dietary needs: gluten-free, dairy-free, nut-free, no-bake, and more!
              </p>
            </div>

            {/* Social Feed */}
            <div className="bg-gradient-to-br from-[#FFF9C4]/30 to-[#FFB3D9]/30 p-8 rounded-3xl border-4 border-[#F9DC5C]/30 hover:border-[#F9DC5C] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F9DC5C] to-[#FF6B35] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#FF6B35] mb-2">Social Feed</h3>
              <p className="text-[#2C1810]/70">
                Follow friends, comment on recipes, and build your sweet community!
              </p>
            </div>

            {/* Ratings & Reviews */}
            <div className="bg-gradient-to-br from-[#C8E6C9]/30 to-[#B3E5FC]/30 p-8 rounded-3xl border-4 border-[#2ECC71]/30 hover:border-[#2ECC71] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#3498DB] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2ECC71] mb-2">Rate & Review</h3>
              <p className="text-[#2C1810]/70">
                Share your baking experiences and help others find the best recipes!
              </p>
            </div>

            {/* Marketplace */}
            <div className="bg-gradient-to-br from-[#FFB3D9]/30 to-[#FFF9C4]/30 p-8 rounded-3xl border-4 border-[#FF6B35]/30 hover:border-[#FF6B35] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#E71D36] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#FF6B35] mb-2">Marketplace</h3>
              <p className="text-[#2C1810]/70">
                Buy, sell, or trade your homemade cookies with fellow bakers in your area!
              </p>
            </div>

            {/* Pop-up Locations */}
            <div className="bg-gradient-to-br from-[#E1BEE7]/30 to-[#FFB3D9]/30 p-8 rounded-3xl border-4 border-[#9B59B6]/30 hover:border-[#9B59B6] hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-gradient-to-br from-[#9B59B6] to-[#FF69B4] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#9B59B6] mb-2">Pop-up Events</h3>
              <p className="text-[#2C1810]/70">
                Discover and share local cookie pop-up shops and baking events near you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-[#9B59B6]">Create Your Profile</h3>
              <p className="text-[#2C1810]/70">
                Sign up and create your sweet profile. Tell us about your baking style!
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#3498DB] to-[#2ECC71] rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-[#3498DB]">Share Recipes</h3>
              <p className="text-[#2C1810]/70">
                Upload your favorite cookie recipes with photos, videos, and detailed instructions!
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#E71D36] rounded-full flex items-center justify-center mx-auto text-3xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-[#E71D36]">Connect & Grow</h3>
              <p className="text-[#2C1810]/70">
                Follow friends, rate recipes, and grow your baking community!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFB3D9]/30 via-[#E1BEE7]/30 to-[#B3E5FC]/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              Ready to Join the Fun?
            </span>
          </h2>
          <p className="text-xl text-[#2C1810]/70">
            Start your sweet adventure in Cookie Castle today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="px-10 py-5 bg-gradient-to-r from-[#E71D36] via-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all text-lg"
            >
              Sign Up Now
            </Link>
            <Link
              href="/signin"
              className="px-10 py-5 bg-white border-4 border-[#9B59B6] text-[#9B59B6] font-bold rounded-full hover:bg-[#9B59B6] hover:text-white hover:shadow-xl transition-all text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-[#2C1810]/70 font-semibold">Recipes Shared</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#3498DB] to-[#2ECC71] bg-clip-text text-transparent">
                5K+
              </div>
              <div className="text-[#2C1810]/70 font-semibold">Active Bakers</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#E71D36] bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-[#2C1810]/70 font-semibold">Reviews</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold bg-gradient-to-r from-[#F9DC5C] to-[#FF6B35] bg-clip-text text-transparent">
                100+
              </div>
              <div className="text-[#2C1810]/70 font-semibold">Pop-up Events</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
