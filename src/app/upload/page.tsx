'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Cookie, Upload, Plus, X, Youtube, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

const CATEGORIES = [
  { id: 'no-nuts', name: 'Nut-Free', icon: '🥜' },
  { id: 'dairy-free', name: 'Dairy-Free', icon: '🥛' },
  { id: 'gluten-free', name: 'Gluten-Free', icon: '🌾' },
  { id: 'no-bake', name: 'No-Bake', icon: '🔥' },
  { id: 'easy-bake', name: 'Easy-Bake', icon: '⚡' },
  { id: 'vegan', name: 'Vegan', icon: '🌱' },
];

export default function UploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const extractYoutubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const filteredIngredients = ingredients.filter(ing => ing.trim() !== '');

      if (filteredIngredients.length === 0) {
        throw new Error('Please add at least one ingredient');
      }

      const videos = [];
      if (youtubeUrl) {
        const youtubeId = extractYoutubeId(youtubeUrl);
        if (youtubeId) {
          videos.push({
            url: youtubeUrl,
            type: 'youtube',
            youtubeId
          });
        }
      }

      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          ingredients: filteredIngredients,
          instructions,
          prepTime: prepTime ? parseInt(prepTime) : null,
          cookTime: cookTime ? parseInt(cookTime) : null,
          servings: servings ? parseInt(servings) : null,
          difficulty,
          categories: selectedCategories,
          videos,
          images: [],
          published: true
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create recipe');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(`/recipes/${data.id}`);
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              Share Your Recipe
            </span>
          </h1>
          <p className="text-[#2C1810]/70">Add your delicious cookie recipe to the community!</p>
        </div>

        {/* Form */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">Recipe created successfully! Redirecting...</p>
              </div>
            )}

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-[#2C1810] mb-2">
                Recipe Title *
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                placeholder="Classic Chocolate Chip Cookies"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-[#2C1810] mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all resize-none"
                placeholder="A brief description of your recipe..."
              />
            </div>

            {/* Recipe Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="prepTime" className="block text-sm font-semibold text-[#2C1810] mb-2">
                  Prep Time (mins)
                </label>
                <input
                  id="prepTime"
                  type="number"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                  placeholder="15"
                />
              </div>
              <div>
                <label htmlFor="cookTime" className="block text-sm font-semibold text-[#2C1810] mb-2">
                  Cook Time (mins)
                </label>
                <input
                  id="cookTime"
                  type="number"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                  placeholder="12"
                />
              </div>
              <div>
                <label htmlFor="servings" className="block text-sm font-semibold text-[#2C1810] mb-2">
                  Servings
                </label>
                <input
                  id="servings"
                  type="number"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                  placeholder="24"
                />
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">
                Difficulty Level
              </label>
              <div className="flex gap-3">
                {DIFFICULTY_OPTIONS.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                      difficulty === level
                        ? 'bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white shadow-lg'
                        : 'bg-white border-2 border-[#E1BEE7] text-[#2C1810]/70 hover:border-[#9B59B6]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">
                Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                      selectedCategories.includes(category.id)
                        ? 'bg-gradient-to-r from-[#3498DB] to-[#2ECC71] text-white shadow-lg'
                        : 'bg-white border-2 border-[#E1BEE7] text-[#2C1810]/70 hover:border-[#3498DB]'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-semibold text-[#2C1810] mb-2">
                Ingredients *
              </label>
              <div className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                      placeholder="2 cups all-purpose flour"
                    />
                    {ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-3 bg-red-50 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addIngredient}
                  className="w-full py-3 px-4 bg-white border-2 border-dashed border-[#9B59B6] text-[#9B59B6] font-semibold rounded-xl hover:bg-[#9B59B6]/5 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Ingredient
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label htmlFor="instructions" className="block text-sm font-semibold text-[#2C1810] mb-2">
                Instructions *
              </label>
              <textarea
                id="instructions"
                rows={8}
                required
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Step-by-step instructions for your recipe..."
              />
            </div>

            {/* YouTube Video */}
            <div>
              <label htmlFor="youtube" className="block text-sm font-semibold text-[#2C1810] mb-2 flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                YouTube Video URL (Optional)
              </label>
              <input
                id="youtube"
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="block w-full px-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-[#E71D36] via-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Creating Recipe...' : 'Publish Recipe'}
              </button>
              <Link
                href="/profile"
                className="px-6 py-4 bg-white border-2 border-[#E1BEE7] text-[#2C1810]/70 font-semibold rounded-xl hover:bg-[#E1BEE7]/30 transition-all flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
