'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, Cookie, Heart, Star, ShoppingBag, MapPin, Settings, LogOut, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('recipes');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Cookie className="w-16 h-16 text-[#9B59B6] candy-float mx-auto mb-4" />
          <p className="text-[#2C1810]/70">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const tabs = [
    { id: 'recipes', label: 'My Recipes', icon: Cookie },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {session.user.name?.[0]?.toUpperCase() || session.user.email[0].toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border-2 border-[#E1BEE7] hover:scale-110 transition-transform">
                <Edit className="w-4 h-4 text-[#9B59B6]" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#2C1810] mb-2">
                {session.user.name || 'Sweet Baker'}
              </h1>
              <p className="text-[#2C1810]/70 mb-4">{session.user.email}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] bg-clip-text text-transparent">
                    0
                  </div>
                  <div className="text-sm text-[#2C1810]/60">Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#3498DB] to-[#2ECC71] bg-clip-text text-transparent">
                    0
                  </div>
                  <div className="text-sm text-[#2C1810]/60">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#E71D36] bg-clip-text text-transparent">
                    0
                  </div>
                  <div className="text-sm text-[#2C1810]/60">Following</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link
                  href="/upload"
                  className="px-6 py-2 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  + Add Recipe
                </Link>
                <button className="px-6 py-2 bg-white border-2 border-[#E1BEE7] text-[#9B59B6] font-semibold rounded-full hover:bg-[#E1BEE7]/30 transition-all flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-6 py-2 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-full hover:bg-red-50 transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-4 border-[#E1BEE7]/50 shadow-xl overflow-hidden">
          <div className="flex border-b border-[#E1BEE7]/50 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-6 py-4 flex items-center justify-center gap-2 font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#FFB3D9]/30 to-[#E1BEE7]/30 text-[#9B59B6] border-b-4 border-[#9B59B6]'
                      : 'text-[#2C1810]/60 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'recipes' && (
              <div className="text-center py-12">
                <Cookie className="w-16 h-16 text-[#9B59B6]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-2">No recipes yet</h3>
                <p className="text-[#2C1810]/60 mb-6">Share your first cookie recipe with the community!</p>
                <Link
                  href="/upload"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  Create Recipe
                </Link>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-[#E71D36]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-2">No favorites yet</h3>
                <p className="text-[#2C1810]/60 mb-6">Start exploring and save your favorite recipes!</p>
                <Link
                  href="/recipes"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#E71D36] to-[#FF69B4] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  Browse Recipes
                </Link>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <Star className="w-16 h-16 text-[#F9DC5C]/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-2">No reviews yet</h3>
                <p className="text-[#2C1810]/60">Try some recipes and share your thoughts!</p>
              </div>
            )}

            {activeTab === 'marketplace' && (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-[#FF6B35]/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#2C1810] mb-2">No marketplace items</h3>
                <p className="text-[#2C1810]/60 mb-6">List your homemade cookies for sale or trade!</p>
                <Link
                  href="/marketplace"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E71D36] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  Visit Marketplace
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
