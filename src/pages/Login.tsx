import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-white mb-10 text-center">IMMERSIVE AGENCY</h1>
        <form className="bg-transparent" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-2" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full px-4 py-3 rounded bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              id="email"
              type="email"
              placeholder="Your email address"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2" htmlFor="password">
              Your Password
            </label>
            <input
              className="w-full px-4 py-3 rounded bg-zinc-900 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              id="password"
              type="password"
              placeholder="Your password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="mb-4 text-pink-400 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded bg-pink-500 text-white font-semibold text-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 