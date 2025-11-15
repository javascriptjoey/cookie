'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Users, Star, Heart, Cookie, Youtube } from 'lucide-react';
import Link from 'next/link';
import ShareButton from '@/components/ShareButton';

interface Recipe {
  id: string;
  title: string;
  description: string | null;
  ingredients: string; // JSON string of array
  instructions: string;
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  difficulty: string | null;
  author: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  images: any[];
  videos: any[];
  categories: any[];
  ratings: any[];
  _count: {
    comments: number;
    ratings: number;
    reviews: number;
  };
}

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchRecipe(params.id as string);
    }
  }, [params.id]);

  const fetchRecipe = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes/${id}`);
      if (!response.ok) {
        throw new Error('Recipe not found');
      }
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      router.push('/recipes');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Cookie className="w-16 h-16 text-[#9B59B6] candy-float" />
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const averageRating = getAverageRating(recipe.ratings);
  const ingredientsList = JSON.parse(recipe.ingredients);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-[#2C1810] mb-3">{recipe.title}</h1>
              {recipe.description && (
                <p className="text-lg text-[#2C1810]/70 mb-4">{recipe.description}</p>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF69B4] to-[#9B59B6] rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {recipe.author.name?.[0]?.toUpperCase() || recipe.author.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-[#2C1810]">
                    {recipe.author.name || 'Anonymous Baker'}
                  </p>
                  <p className="text-sm text-[#2C1810]/60">Recipe Creator</p>
                </div>
              </div>
            </div>

            {recipe.difficulty && (
              <span className={`px-6 py-2 bg-gradient-to-r ${getDifficultyColor(recipe.difficulty)} text-white text-sm font-bold rounded-full`}>
                {recipe.difficulty}
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-[#E1BEE7]/50">
            {recipe.prepTime && (
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] bg-clip-text text-transparent">
                  {recipe.prepTime}m
                </div>
                <div className="text-sm text-[#2C1810]/60">Prep Time</div>
              </div>
            )}
            {recipe.cookTime && (
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#E71D36] bg-clip-text text-transparent">
                  {recipe.cookTime}m
                </div>
                <div className="text-sm text-[#2C1810]/60">Cook Time</div>
              </div>
            )}
            {recipe.servings && (
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#3498DB] to-[#2ECC71] bg-clip-text text-transparent">
                  {recipe.servings}
                </div>
                <div className="text-sm text-[#2C1810]/60">Servings</div>
              </div>
            )}
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-6 h-6 fill-[#F9DC5C] text-[#F9DC5C]" />
                <span className="text-2xl font-bold bg-gradient-to-r from-[#F9DC5C] to-[#FF6B35] bg-clip-text text-transparent">
                  {averageRating}
                </span>
              </div>
              <div className="text-sm text-[#2C1810]/60">
                {recipe.ratings.length} {recipe.ratings.length === 1 ? 'Rating' : 'Ratings'}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 px-6 bg-gradient-to-r from-[#E71D36] to-[#FF69B4] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Save Recipe
            </button>
            <ShareButton
              title={recipe.title}
              description={recipe.description || ''}
              size="lg"
              variant="button"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#B3E5FC]/50 shadow-xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-[#2C1810] mb-4 flex items-center gap-2">
                <Cookie className="w-6 h-6 text-[#3498DB]" />
                Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredientsList.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#3498DB] rounded-full flex-shrink-0 mt-2"></div>
                    <span className="text-[#2C1810]/80">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2C1810] mb-6">Instructions</h2>
              <div className="prose max-w-none">
                <p className="text-[#2C1810]/80 whitespace-pre-line leading-relaxed">
                  {recipe.instructions}
                </p>
              </div>
            </div>

            {/* YouTube Video */}
            {recipe.videos.length > 0 && (
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#E1BEE7]/50 shadow-xl p-8">
                <h2 className="text-2xl font-bold text-[#2C1810] mb-6 flex items-center gap-2">
                  <Youtube className="w-6 h-6 text-red-500" />
                  Video Tutorial
                </h2>
                {recipe.videos.map((video, index) => (
                  video.type === 'youtube' && video.youtubeId && (
                    <div key={index} className="aspect-video rounded-2xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title="Recipe Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#C8E6C9]/50 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2C1810] mb-6">
                Reviews & Comments ({recipe._count.comments})
              </h2>
              <div className="text-center py-8">
                <p className="text-[#2C1810]/60">No comments yet. Be the first to share your thoughts!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
