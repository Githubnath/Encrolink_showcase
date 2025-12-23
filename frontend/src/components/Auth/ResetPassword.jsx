import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    try {
      await resetPassword({ token, password });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Password reset failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg"
      />
      <button
        type="submit"
        className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;

