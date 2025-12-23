// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";
import { Shield, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Check for logged-in user
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Failed to parse user info from localStorage", err);
    }
  }, []);

  return (
    <>
      <Header />

      <section className="p-8 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to EncroLink</h1>

        {/* Display logged-in message */}
        {user && (
          <p className="text-lg mt-4 font-semibold">
            ✅ Successfully logged in as <strong>{user.name}</strong>!
          </p>
        )}

        <p className="text-lg mt-4 max-w-2xl mx-auto">
          Secure, encrypted messaging without revealing personal contact
          information. Stay anonymous, stay protected.
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {/* Get Started Button */}
          <Button
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform transition hover:scale-105 hover:from-green-500 hover:to-blue-600"
          >
            Get Started
          </Button>

          {/* Learn More Button */}
          <Button
            variant="outline"
            onClick={() => navigate("/about")}
            className="border-white text-white px-8 py-3 rounded-full shadow hover:bg-white hover:text-blue-600 transition transform hover:scale-105"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Shield className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold">End-to-End Encryption</h3>
          <p className="text-gray-600 mt-2">
            Every message you send is encrypted and secure, accessible only by
            you and your recipient.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <MessageSquare className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold">Anonymous Messaging</h3>
          <p className="text-gray-600 mt-2">
            Send and receive messages without exposing your email or phone
            number.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
          <Users className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold">Community Driven</h3>
          <p className="text-gray-600 mt-2">
            Join a growing community that values privacy, safety, and digital
            freedom.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;

