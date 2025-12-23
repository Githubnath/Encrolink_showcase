import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Verify() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify/${token}`
        );
        setMessage(res.data.message || "Your email has been verified successfully.");
      } catch (err) {
        setError(err.response?.data?.error || "Invalid or expired verification link.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setError("No verification token found.");
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer); // Cleanup
    }
  }, [loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Verifying your email, please wait...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {error ? (
        <div className="text-red-600 text-center">
          <p>{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Redirecting you to login page...
          </p>
        </div>
      ) : (
        <div className="text-green-600 text-center">
          <p>{message}</p>
          <p className="text-gray-500 text-sm mt-2">
            Redirecting you to login page...
          </p>
        </div>
      )}
    </div>
  );
}

