'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, Users, Cookie, ShoppingBag, MapPin, Rss, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    users: 0,
    recipes: 0,
    marketplace: 0,
    popups: 0,
    posts: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [rssLoading, setRssLoading] = useState(false);
  const [rssMessage, setRssMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
    // Note: In production, check if user.role === 'admin'
    // For now, any logged in user can access
    fetchStats();
  }, [status, router]);

  const fetchStats = async () => {
    try {
      // In a real app, you'd have an admin API endpoint
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setIsLoading(false);
    }
  };

  const handleRSSImport = async () => {
    setRssLoading(true);
    setRssMessage('');

    try {
      // Fetch RSS items
      const response = await fetch('/api/rss?fetch=true');
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        // Import items
        const importResponse = await fetch('/api/rss', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ items: data.items })
        });

        const result = await importResponse.json();

        if (result.success) {
          setRssMessage(`Successfully imported ${result.created} RSS items!`);
        } else {
          setRssMessage('Failed to import RSS items');
        }
      } else {
        setRssMessage('No relevant RSS items found');
      }
    } catch (error) {
      console.error('RSS import error:', error);
      setRssMessage('Error importing RSS feeds');
    } finally {
      setRssLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Cookie className="w-16 h-16 text-[#9B59B6] candy-float" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const adminCards = [
    {
      title: 'Users',
      count: stats.users,
      icon: Users,
      color: 'from-[#9B59B6] to-[#FF69B4]',
      link: '/admin/users'
    },
    {
      title: 'Recipes',
      count: stats.recipes,
      icon: Cookie,
      color: 'from-[#FF6B35] to-[#E71D36]',
      link: '/admin/recipes'
    },
    {
      title: 'Marketplace',
      count: stats.marketplace,
      icon: ShoppingBag,
      color: 'from-[#F9DC5C] to-[#FF6B35]',
      link: '/admin/marketplace'
    },
    {
      title: 'Pop-ups',
      count: stats.popups,
      icon: MapPin,
      color: 'from-[#2ECC71] to-[#3498DB]',
      link: '/admin/popups'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-[#9B59B6] to-[#FF69B4] rounded-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
                Admin Dashboard
              </span>
            </h1>
            <p className="text-[#2C1810]/70">Manage your Cookie Castle community</p>
          </div>
        </div>

        {/* Note */}
        <div className="mb-8 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold mb-1">Development Mode</p>
            <p>In production, only users with role='admin' should access this page. Add proper authentication checks to API routes.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {adminCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/30 hover:border-[#FF69B4] shadow-lg hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-br ${card.color} rounded-xl`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#9B59B6] to-[#FF69B4] bg-clip-text text-transparent mb-1">
                  {card.count}
                </div>
                <div className="text-sm text-[#2C1810]/70 font-semibold">{card.title}</div>
              </div>
            );
          })}
        </div>

        {/* RSS Feed Import */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#E1BEE7]/50 shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-[#FF6B35] to-[#E71D36] rounded-xl">
              <Rss className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2C1810]">RSS Feed Import</h2>
              <p className="text-sm text-[#2C1810]/70">Import cookie content from RSS feeds</p>
            </div>
          </div>

          {rssMessage && (
            <div className={`mb-4 p-4 rounded-xl ${
              rssMessage.includes('Success')
                ? 'bg-green-50 border-2 border-green-200 text-green-700'
                : 'bg-red-50 border-2 border-red-200 text-red-700'
            }`}>
              {rssMessage}
            </div>
          )}

          <button
            onClick={handleRSSImport}
            disabled={rssLoading}
            className="px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#E71D36] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {rssLoading ? 'Importing...' : 'Import RSS Content'}
          </button>

          <p className="mt-4 text-sm text-[#2C1810]/60">
            This will fetch cookie-related content from configured RSS feeds and add them to the community feed.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl p-8">
          <h2 className="text-2xl font-bold text-[#2C1810] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/admin/users"
              className="p-4 bg-gradient-to-r from-[#9B59B6]/10 to-[#FF69B4]/10 border-2 border-[#9B59B6]/30 hover:border-[#9B59B6] rounded-xl transition-all"
            >
              <Users className="w-6 h-6 text-[#9B59B6] mb-2" />
              <div className="font-semibold text-[#2C1810]">Manage Users</div>
              <div className="text-sm text-[#2C1810]/60">View and manage user accounts</div>
            </Link>

            <Link
              href="/recipes"
              className="p-4 bg-gradient-to-r from-[#FF6B35]/10 to-[#E71D36]/10 border-2 border-[#FF6B35]/30 hover:border-[#FF6B35] rounded-xl transition-all"
            >
              <Cookie className="w-6 h-6 text-[#FF6B35] mb-2" />
              <div className="font-semibold text-[#2C1810]">View Recipes</div>
              <div className="text-sm text-[#2C1810]/60">Browse all submitted recipes</div>
            </Link>

            <Link
              href="/feed"
              className="p-4 bg-gradient-to-r from-[#3498DB]/10 to-[#2ECC71]/10 border-2 border-[#3498DB]/30 hover:border-[#3498DB] rounded-xl transition-all"
            >
              <Rss className="w-6 h-6 text-[#3498DB] mb-2" />
              <div className="font-semibold text-[#2C1810]">Community Feed</div>
              <div className="text-sm text-[#2C1810]/60">View all posts and activity</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
