'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Cookie, Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [devToken, setDevToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setSuccess(true);
      if (data.devToken) {
        setDevToken(data.devToken);
      }
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
              Forgot Password?
            </span>
          </h2>
          <p className="mt-2 text-[#2C1810]/70">
            No worries! Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl border-4 border-[#FFB3D9]/50 shadow-xl">
          {success ? (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-green-700 mb-2">
                    Check your email! We've sent you a password reset link.
                  </p>
                  {devToken && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs text-yellow-800 font-semibold mb-1">Development Mode:</p>
                      <Link
                        href={`/reset-password?token=${devToken}`}
                        className="text-xs text-yellow-700 underline break-all"
                      >
                        Click here to reset password (dev link)
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <Link
                href="/signin"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </div>
          ) : (
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#FF69B4] to-[#9B59B6] text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>

              {/* Back to Sign In */}
              <div className="text-center">
                <Link
                  href="/signin"
                  className="text-sm text-[#9B59B6] hover:text-[#FF69B4] transition-colors font-semibold flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
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
