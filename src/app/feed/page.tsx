'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, Cookie, Star, Users } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  imageUrl: string | null;
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  recipe: {
    id: string;
    title: string;
  } | null;
  comments: any[];
  createdAt: string;
}

export default function FeedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status, router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/feed');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#FF69B4] to-[#9B59B6] bg-clip-text text-transparent">
              Community Feed
            </span>
          </h1>
          <p className="text-xl text-[#2C1810]/70">
            See what your fellow bakers are creating
          </p>
        </div>

        {/* Create Post */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl p-6 mb-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {session.user.name?.[0]?.toUpperCase() || session.user.email[0].toUpperCase()}
            </div>
            <input
              type="text"
              placeholder="Share your baking adventures..."
              className="flex-1 px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <Users className="w-24 h-24 text-[#9B59B6]/30 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#2C1810] mb-2">No posts yet</h3>
            <p className="text-[#2C1810]/60 mb-8">
              Follow other bakers to see their posts in your feed
            </p>
            <Link
              href="/recipes"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Explore Recipes
            </Link>
          </div>
        )}

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#E1BEE7]/50 shadow-xl overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {post.user.name?.[0]?.toUpperCase() || post.user.email[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2C1810]">
                    {post.user.name || 'Sweet Baker'}
                  </p>
                  <p className="text-sm text-[#2C1810]/60">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-6 pb-4">
                <p className="text-[#2C1810]/80 mb-4">{post.content}</p>
                {post.recipe && (
                  <Link
                    href={`/recipes/${post.recipe.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFB3D9]/30 to-[#E1BEE7]/30 border-2 border-[#9B59B6]/30 rounded-xl hover:border-[#9B59B6] transition-all"
                  >
                    <Cookie className="w-4 h-4 text-[#9B59B6]" />
                    <span className="text-sm font-semibold text-[#9B59B6]">
                      {post.recipe.title}
                    </span>
                  </Link>
                )}
              </div>

              {/* Post Actions */}
              <div className="px-6 py-4 border-t border-[#E1BEE7]/50 flex items-center gap-6">
                <button className="flex items-center gap-2 text-[#E71D36] hover:text-[#E71D36]/80 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm font-semibold">Like</span>
                </button>
                <button className="flex items-center gap-2 text-[#3498DB] hover:text-[#3498DB]/80 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    Comment {post.comments.length > 0 && `(${post.comments.length})`}
                  </span>
                </button>
                <button className="flex items-center gap-2 text-[#9B59B6] hover:text-[#9B59B6]/80 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
