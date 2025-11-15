'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Cookie, Mail, Lock, AlertCircle } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] rounded-full blur-xl opacity-50"></div>
              <Cookie className="relative w-16 h-16 text-[#9B59B6] candy-float" strokeWidth={2} />
            </div>
          </div>
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-[#E71D36] via-[#9B59B6] to-[#3498DB] bg-clip-text text-transparent">
              Welcome Back!
            </span>
          </h2>
          <p className="mt-2 text-[#2C1810]/70">
            Sign in to your Cookie Castle account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2C1810] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9B59B6]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2C1810] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9B59B6]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center">
            <p className="text-sm text-[#2C1810]/70">
              <Link href="/forgot-password" className="font-semibold text-[#9B59B6] hover:text-[#FF69B4] transition-colors">
                Forgot password?
              </Link>
            </p>
            <p className="text-sm text-[#2C1810]/70">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-[#9B59B6] hover:text-[#FF69B4] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
