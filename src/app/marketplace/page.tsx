'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ShoppingBag, Plus, DollarSign, Search, Filter, Cookie } from 'lucide-react';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  type: string;
  status: string;
  quantity: number;
  images: string[];
  seller: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function MarketplacePage() {
  const { data: session } = useSession();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/marketplace');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching marketplace items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'from-[#2ECC71] to-[#3498DB]';
      case 'sell':
        return 'from-[#E71D36] to-[#FF6B35]';
      case 'trade':
        return 'from-[#9B59B6] to-[#FF69B4]';
      default:
        return 'from-[#F9DC5C] to-[#FF6B35]';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#FF6B35] to-[#F9DC5C] bg-clip-text text-transparent">
              Cookie Marketplace
            </span>
          </h1>
          <p className="text-xl text-[#2C1810]/70">
            Buy, sell, or trade homemade cookies with fellow bakers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#9B59B6]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border-2 border-[#E1BEE7] rounded-full focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                placeholder="Search marketplace..."
              />
            </div>
            {session && (
              <Link
                href="/marketplace/create"
                className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#E71D36] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                List Item
              </Link>
            )}
          </div>

          {/* Type Filters */}
          <div className="flex gap-3">
            {['all', 'buy', 'sell', 'trade'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  filterType === type
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#E71D36] text-white shadow-lg'
                    : 'bg-white border-2 border-[#E1BEE7] text-[#2C1810]/70 hover:border-[#FF6B35]'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-[#FF6B35] candy-float mx-auto mb-4" />
            <p className="text-[#2C1810]/70">Loading marketplace items...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-[#FF6B35]/30 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#2C1810] mb-2">No items found</h3>
            <p className="text-[#2C1810]/60 mb-8">
              {searchTerm
                ? 'Try a different search term'
                : 'Be the first to list cookies for sale or trade!'}
            </p>
            {session && (
              <Link
                href="/marketplace/create"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#E71D36] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                List Your Cookies
              </Link>
            )}
          </div>
        )}

        {/* Items Grid */}
        {!isLoading && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/30 hover:border-[#FF6B35] shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Item Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-[#FFB3D9]/40 via-[#E1BEE7]/40 to-[#FFF9C4]/40 flex items-center justify-center">
                  <Cookie className="w-24 h-24 text-[#FF6B35]/30" />
                </div>

                {/* Item Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#2C1810] line-clamp-2 flex-1">
                      {item.title}
                    </h3>
                    <span className={`ml-2 px-3 py-1 bg-gradient-to-r ${getTypeColor(item.type)} text-white text-xs font-bold rounded-full flex-shrink-0`}>
                      {item.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-[#2C1810]/70 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price and Quantity */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-[#2ECC71]" />
                      <span className="text-2xl font-bold text-[#2ECC71]">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-sm text-[#2C1810]/60">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  {/* Seller */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[#E1BEE7]/50 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#E71D36] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {item.seller.name?.[0]?.toUpperCase() || item.seller.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-[#2C1810]/70">
                      {item.seller.name || 'Sweet Seller'}
                    </span>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-[#FF6B35] to-[#E71D36] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
