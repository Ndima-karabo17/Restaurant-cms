import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signin(email, password);
      navigate('/');
    } catch (err: unknown) {
  const axiosError = err as { response?: { data?: { message?: string } } };
  setError(axiosError?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Georgia', serif" }}>
      
      {/* Left Panel - Branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-16 text-white relative overflow-hidden"
        style={{ backgroundColor: '#c2440e' }}
      >
        {/* Background texture circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: '#fff' }} />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: '#fff' }} />
        <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-5"
          style={{ backgroundColor: '#fff' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🍽️</span>
            <span className="text-2xl font-bold tracking-wide">RestaurantOS</span>
          </div>
          <p className="text-white/60 text-sm tracking-widest uppercase">Admin Panel</p>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Manage your<br />restaurant<br />with ease.
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-sm">
            Orders, menus, customers — everything in one place. Built for speed, designed for clarity.
          </p>
        </div>

        <div className="relative z-10 flex gap-8 text-white/60 text-sm">
          <div>
            <p className="text-white text-2xl font-bold">1,200+</p>
            <p>Orders managed</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">98%</p>
            <p>Uptime</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">24/7</p>
            <p>Monitoring</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-orange-50 p-8">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <span className="text-3xl">🍽️</span>
            <span className="text-xl font-bold text-orange-700">RestaurantOS</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-1">Welcome back</h1>
          <p className="text-gray-400 mb-10 text-sm">Sign in to your admin account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@restaurant.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white transition-all duration-200 active:scale-95"
              style={{ backgroundColor: loading ? '#f0a070' : '#c2440e' }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-10">
            RestaurantOS CMS · Secure Admin Access
          </p>
        </div>
      </div>
    </div>
  );
}