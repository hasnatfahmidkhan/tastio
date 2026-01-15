````markdown
# 🍔 Tastio — Multi-Vendor Food Review & Discovery Platform

![Project Banner](https://i.ibb.co.com/4nZC2C3q/Home.png)

<!-- 👆 Replace the link above with a real screenshot hosted on ImgBB/Cloudinary -->

**Live Site:** [Visit Tastio](https://tastio-web.firebaseapp.com/)  
**Backend API:** [API URL](https://tastio-server.vercel.app/)

## 📝 Overview

**Tastio** is a full-stack, role-based food discovery platform that connects **Foodies (Users)** with **Restaurants (Sellers)**. Unlike a standard blog, it functions as a **SaaS-style application** where restaurant owners can manage their digital menus, and admins act as platform moderators.

It features a robust **Authentication System**, **Real-time Data Fetching** with TanStack Query, **Complex MongoDB Aggregations** for leaderboards/stats, and a highly responsive UI with **Dark Mode**.

---

## 🚀 Key Features

### 🔐 Security & Architecture

- **Role-Based Access Control (RBAC):** Distinct dashboards and route protection for **User**, **Seller**, and **Admin**.
- **JWT Authentication:** Secure API endpoints using JSON Web Tokens and Firebase Auth.
- **Axios Interceptors:** Automatic token attachment and unauthorized logout handling.
- **Secure API:** Backend validation to ensure Sellers can only modify their own data.

### 👥 Role-Wise Capabilities

#### 👤 User (Foodie)

- **Discover Foods:** Advanced Search, Filter (Category, Price, Rating), and Sort functionality.
- **Social Feed:** Share food moments with photos (Image Upload to ImgBB).
- **Review System:** Rate and review dishes; earn points on the Leaderboard.
- **Wishlist:** Save favorite items for later.
- **Profile:** Track contribution history and earn badges (Foodie, Critic, Master).

#### 🏪 Seller (Restaurant Owner)

- **Seller Verification:** Apply to become a seller (Admin approval required).
- **Restaurant Dashboard:** View analytics (Total Reviews, Avg Rating, Total Foods).
- **Menu Management:** Add, Update, and Delete food items with images.
- **Feedback Loop:** Read customer reviews for their specific items.

#### 🛡️ Admin (Moderator)

- **Admin Dashboard:** Visual charts (Recharts) showing platform growth.
- **User Management:** Change user roles, Ban users.
- **Content Moderation:** Delete spam reviews or inappropriate foods.
- **Application System:** Approve or Reject Seller requests with feedback reason.

---

## 🛠️ Tech Stack

**Frontend:**

- ![React](https://img.shields.io/badge/React-19-blue) **React 19**
- ![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC) **Tailwind CSS & DaisyUI**
- ![TanStack Query](https://img.shields.io/badge/TanStack-Query-FF4154) **TanStack Query** (Data Fetching)
- **Framer Motion** (Animations & Page Transitions)
- **React Hook Form** (Form Handling)
- **Swiper.js** (Sliders & Carousels)
- **Recharts** (Data Visualization)

**Backend:**

- ![NodeJS](https://img.shields.io/badge/Node.js-43853D) **Node.js**
- ![ExpressJS](https://img.shields.io/badge/Express.js-000000) **Express.js**
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B) **MongoDB** (Aggregations, Indexing)

---

## ⚙️ Installation & Run Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/hasnatfahmidkhan/tastio.git
    cd tastio
    ```

2.  **Setup Backend:**

    ```bash
    cd server
    npm install
    # Create a .env file (see below)
    npm start
    ```

3.  **Setup Frontend:**
    ```bash
    cd client
    npm install
    # Create a .env.local file (see below)
    npm run dev
    ```

---

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables.

**Frontend (`.env.local`)**

```env
VITE_APIKEY=your_firebase_api_key
VITE_AUTHDOMAIN=your_firebase_auth_domain
VITE_PROJECTID=your_firebase_project_id
VITE_STORAGEBUCKET=your_firebase_storage_bucket
VITE_MESSAGINGSENDERID=your_firebase_messaging_sender_id
VITE_APPID=your_firebase_app_id
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_API_URL=http://localhost:3000
```
````

**Backend (`.env`)**

```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
FB_SERVICE_KEY=your_firebase_service_key
```

---

## 📸 Screenshots

|                    Home Page                    |                    Admin Panel                    |
| :---------------------------------------------: | :-----------------------------------------------: |
| ![Home](https://i.ibb.co.com/4nZC2C3q/Home.png) | ![Admin](https://i.ibb.co.com/5h1wQ7XF/Admin.png) |

|                         Food Details                         |                  Seller Dashboard                   |
| :----------------------------------------------------------: | :-------------------------------------------------: |
| ![Details](https://i.ibb.co.com/DgR73MWS/Review-Details.png) | ![Seller](https://i.ibb.co.com/xtCPDY0P/Seller.png) |

---

## 🤝 Contribution

Contributions are welcome!

1.  Fork the repo.
2.  Create a feature branch: `git checkout -b feature-name`.
3.  Commit your changes: `git commit -m 'Add some feature'`.
4.  Push to the branch: `git push origin feature-name`.
5.  Submit a pull request.

---

## 👨‍💻 Author

**Hasnat Fahmid**  
Full Stack Developer  
[LinkedIn](https://linkedin.com/in/hasnatfahmid) | [GitHub](https://github.com/hasnatfahmidkhan)

```

```
