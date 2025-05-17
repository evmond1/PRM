import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate(); // Get navigate function

  // Add state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for handling login errors
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleEmailPasswordLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state

    const { error } = await signIn(email, password);

    if (error) {
      console.error('Error signing in:', error);
      setError(error.message || 'An unexpected error occurred.'); // Display error message
    } else {
      // Redirect to dashboard or desired page on success
      navigate('/dashboard');
    }

    setLoading(false); // Reset loading state
  };

  // Google sign-in function (kept from previous version)
  // Note: This assumes Google OAuth is configured in Supabase
  const handleGoogleLogin = async () => {
    setError(null); // Clear previous errors
    setLoading(true); // Set loading state
    // Supabase handles the redirect on success for OAuth
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/dashboard', // Redirect to dashboard after sign-in
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error);
      setError(error.message || 'An unexpected error occurred during Google sign-in.');
      setLoading(false); // Reset loading state on error
    }
    // Loading state will be reset by the auth state change listener on successful redirect
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleEmailPasswordLogin}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email" // Use type="email" for better validation
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email} // Bind value to state
                onChange={(e) => setEmail(e.target.value)} // Update state on change
                required // Make field required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password} // Bind value to state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
                required // Make field required
              />
            </div>
            {/* Display error message if any */}
            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <button
                type="submit"
                className={`px-6 py-2 mt-4 text-white rounded-lg ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-900'}`}
                disabled={loading} // Disable button while loading
              >
                {loading ? 'Logging In...' : 'Login'}
              </button>
              {/* Note: Forgot password link currently points to /register, update later */}
              <Link to="/register" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link></p>
            </div>
          </div>
        </form>

        {/* Add Google Sign-in Button */}
        <div className="mt-4 text-center">
           {/* Note: Google sign-in button also uses loading state */}
          <button
            onClick={handleGoogleLogin}
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${loading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-700'}`}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Redirecting...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
