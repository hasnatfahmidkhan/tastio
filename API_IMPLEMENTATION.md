# Tastio Server — Frontend API Implementation Guide

This document outlines how frontend applications should consume the Tastio Server APIs. 

## 🌐 Base URL
- **Local:** `http://localhost:5000` (or `3000` depending on your `.env`)
- **Production:** `https://your-production-url.vercel.app`

---

## 🔐 Authentication & Headers

Most protected routes require a Firebase ID Token passed as a Bearer token in the `Authorization` header.

### 1. Getting the Token (Frontend)
Assuming you are using the Firebase Client SDK:
```javascript
import { getAuth } from "firebase/auth";

const auth = getAuth();
const token = await auth.currentUser.getIdToken();
```

### 2. Standard Axios Instance Setup
Create a reusable Axios instance for authenticated requests:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  async (config) => {
    // Fetch token from localStorage, Context, or Firebase directly
    const token = localStorage.getItem("access-token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

---

## 🚀 Key Implementation Workflows

### 1. User Registration (Public)
When a user signs up via Firebase, send their data to the backend to create a MongoDB record.

```javascript
// POST /users
const registerUser = async (user) => {
  const response = await api.post("/users", {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  });
  return response.data;
};
```

### 2. Fetching Menu Items with Filters (Public)
The `/all-foods` endpoint handles complex filtering, searching, sorting, and pagination.

```javascript
// GET /all-foods?page=1&limit=9&search=burger&category=Fast Food&sort=price-asc
const fetchFoods = async (filters) => {
  const { page, limit, search, category, sort } = filters;
  const response = await api.get("/all-foods", {
    params: { page, limit, search, category, sort }
  });
  // response.data will have { result: [...foods], total: 100 }
  return response.data;
};
```

### 3. Seller Application Workflow (User)
A standard user can apply to become a seller.

```javascript
// POST /restaurants
const applyForRestaurant = async (applicationData) => {
  const response = await api.post("/restaurants", applicationData);
  return response.data; 
};

// GET /restaurants/status/:email
const checkStatus = async (email) => {
  const response = await api.get(`/restaurants/status/${email}`);
  // response.data.status will be 'pending', 'verified', 'rejected', or null
  return response.data;
};
```

### 4. Admin Approving a Seller (Admin Only)
Admins can verify sellers, which automatically upgrades the user's role to `"seller"`.

```javascript
// PATCH /restaurants/verify/:id
const approveSeller = async (restaurantId, userEmail) => {
  const response = await api.patch(`/restaurants/verify/${restaurantId}`, {
    email: userEmail // Required to update the user's role
  });
  return response.data;
};
```

### 5. Adding a Review (User)
Posting a review automatically recalculates the food item's `averageRating` and `totalReviews`.

```javascript
// POST /reviews
const submitReview = async (reviewData) => {
  const response = await api.post("/reviews", {
    menuId: "65a...",
    restaurantId: "65b...",
    foodName: "Spicy Burger",
    reviewerEmail: "user@example.com",
    reviewerName: "John Doe",
    rating: 5,
    reviewText: "Amazing food!",
    postedAt: new Date().toISOString()
  });
  return response.data;
};
```

---

## ⚠️ Common Error Codes

| Status | Meaning | Troubleshooting |
|---|---|---|
| `401 Unauthorized` | Missing or invalid token | Check if `Authorization: Bearer <token>` is present in headers. |
| `403 Forbidden` | Insufficient permissions | The user lacks the required role (`admin` or `seller`), or the email in the payload doesn't match the token email. |
| `404 Not Found` | Resource missing | Check the ID being passed in the URL. |
| `500 Server Error` | Database/Logic error | Check backend logs. |
