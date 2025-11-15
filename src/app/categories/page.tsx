'use client';

import Link from 'next/link';
import { Filter, Cookie } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'no-nuts',
    name: 'Nut-Free',
    icon: '🥜',
    description: 'Safe for nut allergies',
    color: 'from-[#FF69B4] to-[#9B59B6]'
  },
  {
    id: 'dairy-free',
    name: 'Dairy-Free',
    icon: '🥛',
    description: 'No dairy products',
    color: 'from-[#3498DB] to-[#2ECC71]'
  },
  {
    id: 'gluten-free',
    name: 'Gluten-Free',
    icon: '🌾',
    description: 'No gluten ingredients',
    color: 'from-[#F9DC5C] to-[#FF6B35]'
  },
  {
    id: 'no-bake',
    name: 'No-Bake',
    icon: '🔥',
    description: 'No oven required',
    color: 'from-[#E71D36] to-[#FF69B4]'
  },
  {
    id: 'easy-bake',
    name: 'Easy-Bake',
    icon: '⚡',
    description: 'Quick and simple',
    color: 'from-[#2ECC71] to-[#98D8C8]'
  },
  {
    id: 'vegan',
    name: 'Vegan',
    icon: '🌱',
    description: 'Plant-based only',
    color: 'from-[#9B59B6] to-[#3498DB]'
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              Recipe Categories
            </span>
          </h1>
          <p className="text-xl text-[#2C1810]/70">
            Find recipes that match your dietary needs and preferences
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/recipes?category=${category.id}`}
              className="group bg-white/60 backdrop-blur-sm rounded-3xl border-4 border-[#FFB3D9]/30 hover:border-[#FF69B4] shadow-lg hover:shadow-2xl transition-all p-8"
            >
              <div className="text-center">
                {/* Icon */}
                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>

                {/* Name */}
                <h2 className="text-2xl font-bold text-[#2C1810] mb-2 group-hover:text-[#9B59B6] transition-colors">
                  {category.name}
                </h2>

                {/* Description */}
                <p className="text-[#2C1810]/70 mb-4">
                  {category.description}
                </p>

                {/* CTA */}
                <div className={`inline-block px-6 py-2 bg-gradient-to-r ${category.color} text-white font-semibold rounded-full group-hover:shadow-lg transition-all`}>
                  View Recipes
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Recipes Link */}
        <div className="mt-12 text-center">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#9B59B6] to-[#FF69B4] text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
          >
            <Cookie className="w-5 h-5" />
            Browse All Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
