import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      console.error('Error signing in:', error);
      setError(error.message || 'An unexpected error occurred during sign in.');
    } else {
      console.log('Sign in successful, navigating to dashboard');
      // Navigation is handled by AppRoutes based on user state change
    }

    // Loading is set to false by the onAuthStateChange listener in AuthContext
    // if there was an immediate error, it's set above.
    // If successful, the listener will set it to false after state updates.
    setLoading(false); // Set loading to false immediately after the async call returns
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSignIn}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className={`px-6 py-2 mt-4 text-white rounded-lg ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-900'}`}
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
              {/* <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a> */}
            </div>
             <div className="mt-6 text-center">
              <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
