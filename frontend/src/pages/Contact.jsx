import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  // Updated API_URL with '/api' prefix
  const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://encrolink-backend-env.eba-6chaj2p5.eu-north-1.elasticbeanstalk.com/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill all fields.' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email.' });
      return;
    }

    try {
      // Corrected endpoint with /contact under /api
      const res = await axios.post(`${API_URL}/contact`, formData);

      if (res.status === 200 || res.status === 201) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || error.message });
    }
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-lg text-white mt-10">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">Contact Us</h2>
      <p className="mb-6">Have a question or want to get in touch? Fill out the form below.</p>
      {status && (
        <div
          className={`mb-4 p-3 rounded ${
            status.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-2xl text-white font-semibold transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;

