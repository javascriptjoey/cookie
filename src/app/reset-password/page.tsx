'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Cookie, Lock, AlertCircle, CheckCircle } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/signin');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Something went wrong. Please try again.');
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
              Reset Password
            </span>
          </h2>
          <p className="mt-2 text-[#2C1810]/70">
            Create a new password for your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl">
          {success ? (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-700">
                  Password reset successfully! Redirecting to sign in...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* New Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-[#2C1810] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#9B59B6]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#2C1810] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#9B59B6]" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-12 pr-4 py-3 border-2 border-[#E1BEE7] rounded-xl focus:ring-2 focus:ring-[#9B59B6] focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading || !token}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>

              {/* Back to Sign In */}
              <div className="text-center">
                <Link
                  href="/signin"
                  className="text-sm text-[#9B59B6] hover:text-[#FF69B4] transition-colors font-semibold"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Cookie className="w-16 h-16 text-[#9B59B6] candy-float" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
