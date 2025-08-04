
# 🔗 Short.ly - Advanced URL Shortener Service

A full-stack URL shortener application with premium plan support, QR code generation, click tracking, user authentication, and dashboard view.

---

## 🚀 Live Links

- **Frontend (Netlify)**: [https://your-frontend.netlify.app](https://url-shortapp.netlify.app/)
- **Backend (Render)**: [https://your-backend.onrender.com](https://url-shortener-service-0cns.onrender.com)

---

## 🛠️ Features

### ✅ Core Features
- ✅ URL Shortening with unique slug
- ✅ User Authentication (Register, Login)
- ✅ Click Count Tracking
- ✅ Copy Short URL to Clipboard
- ✅ Responsive & Modern UI (Tailwind CSS)
- ✅ QR Code generation for each short URL
- ✅ Download QR Code as PNG

### 💎 Premium Plan Features
- 🔓 Free Users: Limited to 10 short links
- 💰 Upgrade Plans:
  - Bronze (1 Month, 15 links)
  - Silver (3 Months, 25 links)
  - Gold (1 Year, Unlimited links)
- ✅ Razorpay Payment Integration
- 🔁 Reset link limit on plan upgrade
- ⏳ Expiry date tracking for plans

### 🧾 Dashboard
- View all your shortened links
- Track clicks
- Copy buttons
- Download QR code buttons (NEW)

---

## 📦 Tech Stack

| Frontend    | Backend     | Database  | Payment |
|-------------|-------------|-----------|---------|
| React.js    | Node.js     | MongoDB   | Razorpay |
| Tailwind CSS| Express.js  | Mongoose  |         |
| React Router| JWT Auth    |           |         |

---

## 🧑‍💻 Installation Instructions

```bash
# 1. Clone the repositories
git clone https://github.com/yourname/url-shortener-frontend.git
git clone https://github.com/yourname/url-shortener-backend.git

# 2. Backend Setup
cd url-shortener-backend
npm install

# Create .env file in backend root:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT=your_jwt_secret
BASE_URL=https://your-backend.onrender.com
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Start backend server
npm start

# 3. Frontend Setup
cd ../url-shortener-frontend
npm install

# Create .env file in frontend root:
VITE_API_URL=https://your-backend.onrender.com/api

# Start frontend
npm run dev
````

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage](https://github.com/user-attachments/assets/19c86ae4-ddad-4435-be6f-bf1a7a2a15ee)
![Homepage](https://github.com/user-attachments/assets/01e40a17-0737-43f6-aea5-778bd0211c0c)

### 📊 Dashboard

![Dashboard](https://github.com/user-attachments/assets/62b1b795-b378-46d8-a1e5-8ad6b9448169)

---

