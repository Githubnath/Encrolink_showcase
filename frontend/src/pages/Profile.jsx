// frontend/src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  sendMessage,
  getUserMessages,
} from "../api";
import CryptoJS from "crypto-js";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiverId, setReceiverId] = useState("");

  // Load user profile
  useEffect(() => {
    getProfile().then((res) => {
      setUser(res.user);
      setName(res.user.name);
      setEmail(res.user.email);
    });
    getUserMessages().then(setMessages).catch(console.error);
  }, []);

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updated = await updateProfile({ name, email });
    setUser(updated.user);
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);
    const updated = await uploadAvatar(formData);
    setUser(updated.user);
  };

  // Handle avatar delete
  const handleDeleteAvatar = async () => {
    const updated = await deleteAvatar();
    setUser(updated.user);
  };

  // Handle encrypted message send
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text || !receiverId) return;

    const encryptedContent = CryptoJS.AES.encrypt(
      text,
      import.meta.env.VITE_SECRET_KEY
    ).toString();

    const newMsg = await sendMessage({
      to: receiverId,
      encryptedContent,
    });

    setMessages([...messages, newMsg]);
    setText("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* User Profile */}
      <h2 className="text-2xl font-bold mb-4 text-black">Profile</h2>

      {user && (
        <div className="bg-white shadow rounded p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="avatar"
              className="w-20 h-20 rounded-full border"
            />
            <div>
              <input type="file" onChange={handleAvatarUpload} />
              {user.avatar && (
                <button
                  onClick={handleDeleteAvatar}
                  className="ml-2 text-red-600 text-sm"
                >
                  Remove Avatar
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                className="border p-2 rounded w-full text-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                className="border p-2 rounded w-full text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update Profile
            </button>
          </form>
        </div>
      )}

      {/* Messaging Space */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-bold mb-3 text-black">
          Send Encrypted Message
        </h3>

        <form onSubmit={handleSendMessage} className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="border p-2 rounded flex-1 text-black placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded flex-1 text-black placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>

        <div className="h-64 overflow-y-auto border p-2 bg-gray-50 rounded">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="p-2 my-1 bg-gray-200 rounded text-sm text-black"
            >
              Ì¥ê {msg.encryptedContent.slice(0, 40)}...
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

