import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPassword } from '../../api'; // Adjust path based on your API functions
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (err) {
      toast.error('Error sending password reset email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
