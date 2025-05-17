import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input type="text" placeholder="Email"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input type="password" placeholder="Password"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
              <Link to="/register" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
