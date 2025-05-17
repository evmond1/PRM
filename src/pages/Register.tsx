import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // State for name
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    // Pass name to the signUp function
    const { data, error } = await signUp(email, password, name);

    if (error) {
      console.error('Error signing up:', error);
      setError(error.message || 'An unexpected error occurred during sign up.');
    } else if (data?.user) {
      console.log('Sign up successful, user:', data.user);
      // Redirect to dashboard or a confirmation page
      navigate('/dashboard'); // Redirect to dashboard after successful sign up and profile creation
    } else {
       // This case might happen if signUp succeeds but data.user is null (less common)
       setError('Sign up successful, but user data not returned. Please try logging in.');
       navigate('/login'); // Redirect to login if user data is missing after sign up
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
        <form onSubmit={handleSignUp}>
          <div className="mt-4">
             <div>
              <label className="block" htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
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
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
