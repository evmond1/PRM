import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3>
        <form>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="name">Name</label>
              <input type="text" placeholder="Name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">Email</label>
              <input type="email" placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input type="password" placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="mt-4">
              <label className="block">Confirm Password</label>
              <input type="password" placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Sign Up</button>
              <Link to="/login" className="text-sm text-blue-600 hover:underline">Already have an account?</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
