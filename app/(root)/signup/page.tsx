'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    'use server'
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError('Invalid credentials');
      } else {
        router.push('/signup/dashboard');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;