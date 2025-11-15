'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Plus, Search, Cookie } from 'lucide-react';

interface PopupLocation {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function PopupsPage() {
  const { data: session } = useSession();
  const [locations, setLocations] = useState<PopupLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/popups');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.error('Error fetching pop-up locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = (startDate: string) => {
    return new Date(startDate) > new Date();
  };

  const isActive = (startDate: string, endDate: string) => {
    const now = new Date();
    return new Date(startDate) <= now && new Date(endDate) >= now;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#2ECC71] via-[#3498DB] to-[#9B59B6] bg-clip-text text-transparent">
              Pop-up Cookie Shops
            </span>
          </h1>
          <p className="text-xl text-[#2C1810]/70">
            Find local cookie events and pop-up shops near you
          </p>
        </div>

        {/* Search and Add */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#9B59B6]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-[#E1BEE7] rounded-full focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent outline-none transition-all"
              placeholder="Search by city, state, or event name..."
            />
          </div>
          {session && (
            <Link
              href="/popups/create"
              className="px-8 py-4 bg-gradient-to-r from-[#2ECC71] to-[#3498DB] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Pop-up
            </Link>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <MapPin className="w-16 h-16 text-[#2ECC71] candy-float mx-auto mb-4" />
            <p className="text-[#2C1810]/70">Loading pop-up locations...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredLocations.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="w-24 h-24 text-[#2ECC71]/30 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#2C1810] mb-2">No pop-ups found</h3>
            <p className="text-[#2C1810]/60 mb-8">
              {searchTerm
                ? 'Try a different search term'
                : 'Be the first to add a pop-up cookie shop!'}
            </p>
            {session && (
              <Link
                href="/popups/create"
                className="inline-block px-8 py-4 bg-gradient-to-r from-[#2ECC71] to-[#3498DB] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                Add Your Pop-up
              </Link>
            )}
          </div>
        )}

        {/* Locations Grid */}
        {!isLoading && filteredLocations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLocations.map((location) => {
              const upcoming = isUpcoming(location.startDate);
              const active = isActive(location.startDate, location.endDate);

              return (
                <div
                  key={location.id}
                  className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#C8E6C9]/50 hover:border-[#2ECC71] shadow-lg hover:shadow-2xl transition-all p-6"
                >
                  {/* Status Badge */}
                  <div className="mb-4">
                    {active && (
                      <span className="px-4 py-1 bg-gradient-to-r from-[#2ECC71] to-[#3498DB] text-white text-xs font-bold rounded-full">
                        LIVE NOW
                      </span>
                    )}
                    {upcoming && !active && (
                      <span className="px-4 py-1 bg-gradient-to-r from-[#F9DC5C] to-[#FF6B35] text-white text-xs font-bold rounded-full">
                        UPCOMING
                      </span>
                    )}
                    {!active && !upcoming && (
                      <span className="px-4 py-1 bg-gray-400 text-white text-xs font-bold rounded-full">
                        ENDED
                      </span>
                    )}
                  </div>

                  {/* Location Name */}
                  <h3 className="text-2xl font-bold text-[#2C1810] mb-3">
                    {location.name}
                  </h3>

                  {/* Description */}
                  {location.description && (
                    <p className="text-sm text-[#2C1810]/70 mb-4 line-clamp-2">
                      {location.description}
                    </p>
                  )}

                  {/* Location Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-[#2ECC71] flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-[#2C1810]/80">
                        <div>{location.address}</div>
                        <div>{location.city}, {location.state}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#3498DB]" />
                      <span className="text-sm text-[#2C1810]/80">
                        {formatDate(location.startDate)} - {formatDate(location.endDate)}
                      </span>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[#E1BEE7]/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#2ECC71] to-[#3498DB] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {location.user.name?.[0]?.toUpperCase() || location.user.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-[#2C1810]/70">
                      by {location.user.name || 'Cookie Maker'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
