import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Create an account</h3>
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
             <div className="mt-4">
              <label className="block" htmlFor="confirm-password">Confirm Password</label>
              <input type="password" placeholder="Confirm Password"
                     className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
