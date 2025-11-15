'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, Clock, Users, Star, Search, Filter } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  difficulty: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  images: any[];
  categories: any[];
  ratings: any[];
  _count: {
    comments: number;
    ratings: number;
    reviews: number;
  };
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, [selectedCategory]);

  const fetchRecipes = async () => {
    try {
      const url = selectedCategory
        ? `/api/recipes?category=${selectedCategory}`
        : '/api/recipes';
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAverageRating = (ratings: any[]) => {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
    return (sum / ratings.length).toFixed(1);
  };

  const getDifficultyColor = (difficulty: string | null) => {
    switch (difficulty) {
      case 'Easy':
        return 'from-[#2ECC71] to-[#3498DB]';
      case 'Medium':
        return 'from-[#F9DC5C] to-[#FF6B35]';
      case 'Hard':
        return 'from-[#E71D36] to-[#9B59B6]';
      default:
        return 'from-[#9B59B6] to-[#FF69B4]';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              Cookie Recipes
            </span>
          </h1>
          <p className="text-xl text-[#2C1810]/70">
            Discover delicious cookie recipes from our community
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#9B59B6]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-[#E1BEE7] rounded-full focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all text-lg"
              placeholder="Search for recipes..."
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <Cookie className="w-16 h-16 text-[#9B59B6] candy-float mx-auto mb-4" />
            <p className="text-[#2C1810]/70">Loading sweet recipes...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredRecipes.length === 0 && (
          <div className="text-center py-20">
            <Cookie className="w-24 h-24 text-[#9B59B6]/30 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#2C1810] mb-2">No recipes found</h3>
            <p className="text-[#2C1810]/60 mb-8">
              {searchTerm
                ? 'Try a different search term'
                : 'Be the first to share a cookie recipe!'}
            </p>
            <Link
              href="/upload"
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
            >
              Share Your Recipe
            </Link>
          </div>
        )}

        {/* Recipes Grid */}
        {!isLoading && filteredRecipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="group bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/30 hover:border-[#FF69B4] shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                {/* Recipe Image Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#FFB3D9]/40 via-[#E1BEE7]/40 to-[#B3E5FC]/40 flex items-center justify-center">
                  <Cookie className="w-20 h-20 text-[#9B59B6]/30 group-hover:scale-110 transition-transform" />
                </div>

                {/* Recipe Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#2C1810] group-hover:text-[#9B59B6] transition-colors line-clamp-2 flex-1">
                      {recipe.title}
                    </h3>
                    {recipe.difficulty && (
                      <span className={`ml-2 px-3 py-1 bg-gradient-to-r ${getDifficultyColor(recipe.difficulty)} text-white text-xs font-bold rounded-full flex-shrink-0`}>
                        {recipe.difficulty}
                      </span>
                    )}
                  </div>

                  {recipe.description && (
                    <p className="text-sm text-[#2C1810]/70 mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-[#2C1810]/60">
                    {(recipe.prepTime || recipe.cookTime) && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {(recipe.prepTime || 0) + (recipe.cookTime || 0)} mins
                        </span>
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    )}
                    {recipe.ratings.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#F9DC5C] text-[#F9DC5C]" />
                        <span>
                          {getAverageRating(recipe.ratings)} ({recipe.ratings.length})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-2 pt-4 border-t border-[#E1BEE7]/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {recipe.author.name?.[0]?.toUpperCase() || recipe.author.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-[#2C1810]/70">
                      by {recipe.author.name || 'Anonymous Baker'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
