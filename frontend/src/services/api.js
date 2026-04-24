const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const authHeaders = () => {
  const token = localStorage.getItem("veltorn_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const apiFetch = async (url, options = {}) => {
  const res = await fetch(`${BASE_URL}${url}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
};

// AUTH 
export const authAPI = {
  register: (body) => apiFetch("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  login: (body) => apiFetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  getMe: () => apiFetch("/auth/me", { headers: authHeaders() }),
  updateProfile: (body) => apiFetch("/auth/profile", {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  }),
};

// PRODUCTS 
export const productAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/products?${query}`);
  },
  getById: (id) => apiFetch(`/products/${id}`),
  create: (formData) => apiFetch("/products", {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("veltorn_token")}` },
    body: formData,
  }),
  update: (id, formData) => apiFetch(`/products/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("veltorn_token")}` },
    body: formData,
  }),
  delete: (id) => apiFetch(`/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  }),
  deleteImage: (id, imageUrl, fileId) => apiFetch(`/products/${id}/image`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ imageUrl, fileId }),
  }),
};

// PAGE PRODUCTS
export const pageProductsAPI = {
  getSection: (section) => apiFetch(`/page-products/${section}`),
  setSection: (section, products) => apiFetch(`/page-products/${section}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ products }),
  }),
  removeFromSection: (section, productId) => apiFetch(`/page-products/${section}/product/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  }),
};

// ORDERS 
export const orderAPI = {
  place: (body) => apiFetch("/orders", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  }),
  getMyOrders: () => apiFetch("/orders/my", { headers: authHeaders() }),
  getById: (id) => apiFetch(`/orders/${id}`, { headers: authHeaders() }),
};

// ADMIN
export const adminAPI = {
  getDashboard: () => apiFetch("/admin/dashboard", { headers: authHeaders() }),
  getAllOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/admin/orders?${query}`, { headers: authHeaders() });
  },
  updateOrderStatus: (id, body) => apiFetch(`/admin/orders/${id}/status`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(body),
  }),
  getAllUsers: () => apiFetch("/admin/users", { headers: authHeaders() }),
};