// frontend/src/components/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      console.log("‚úÖ Logged in:", res.data);

      // If backend sends token and user in response, store them
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // Double check to confirm what‚Äôs stored
      console.log("Ì¥ê Stored user:", localStorage.getItem("user"));
      console.log("Ì¥ê Stored token:", localStorage.getItem("token"));

      toast.success(`Welcome back, ${res.data?.user?.name || "User"}!`);
      navigate("/profile"); // redirect to profile page
    } catch (err) {
      console.error("‚ùå Login error:", err.response || err);
      toast.error(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-4 border border-gray-300 rounded-lg text-lg text-black placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-blue-600 focus:outline-none"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Forgot Password Link */}
      <div className="mb-4 text-right">
        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline text-sm"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg"
      >
        Login
      </button>
    </form>
  );
};

export default Login;

