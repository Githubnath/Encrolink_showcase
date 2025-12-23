// frontend/src/api/index.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:10000/api",
  withCredentials: true, // send cookies (JWT, sessions)
});

// ✅ Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- AUTH ---------------- */
export const registerUser = (data) => API.post("/auth/register", data);

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  if (res.data?.token) localStorage.setItem("token", res.data.token);
  if (res.data?.user)
    localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data; // return data only (cleaner than whole res)
};

export const logoutUser = async () => {
  try {
    await API.post("/auth/logout");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export const checkAuth = () => API.get("/auth/check-auth");
export const forgotPassword = (data) => API.post("/auth/forgot-password", data);
export const resetPassword = (token, data) =>
  API.post(`/auth/reset-password/${token}`, data);

/* ---------------- USER ---------------- */
export const getProfile = () =>
  API.get("/users/profile").then((r) => r.data);

export const updateProfile = (data) =>
  API.put("/users/profile", data).then((r) => r.data);

export const uploadAvatar = (formData) =>
  API.post("/users/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" }, // ✅ Needed for file upload
  }).then((r) => r.data);

export const deleteAvatar = () =>
  API.delete("/users/avatar").then((r) => r.data);

export const deleteAccount = () =>
  API.delete("/users/account").then((r) => r.data);

export const getUserMessages = () =>
  API.get("/messages").then((r) => r.data);

/* ---------------- CONTACT ---------------- */
export const sendContactMessage = (data) => API.post("/contact", data);

/* ---------------- MESSAGES ---------------- */
export const sendMessage = (data) => API.post("/messages", data);
export const getMessages = () => API.get("/messages").then((r) => r.data);
export const getMessageById = (id) =>
  API.get(`/messages/${id}`).then((r) => r.data);
export const markMessageAsRead = (id) => API.put(`/messages/${id}/read`);
export const deleteMessage = (id) => API.delete(`/messages/${id}`);

/* ---------------- ADMIN ---------------- */
export const getAllUsers = () => API.get("/admin/users").then((r) => r.data);
export const getUserById = (id) =>
  API.get(`/admin/users/${id}`).then((r) => r.data);
export const updateUserRole = (id, role) =>
  API.put(`/admin/users/${id}/role`, { role }).then((r) => r.data);
export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`).then((r) => r.data);
export const getAllMessages = () =>
  API.get("/admin/messages").then((r) => r.data);
export const deleteAdminMessage = (id) =>
  API.delete(`/admin/messages/${id}`).then((r) => r.data);
export const getSystemStats = () =>
  API.get("/admin/stats").then((r) => r.data);

