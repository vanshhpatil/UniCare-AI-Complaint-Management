# 🚀 UniCare – Complaint Management System

A full-stack **MERN (MongoDB, Express, React, Node.js)** based complaint management system that enables students to raise issues and administrators to manage, track, and resolve them efficiently.

---

## 🌐 Live Demo

🔗 Frontend: https://uni-care-ai-complaint-management.vercel.app
🔗 Backend API: https://unicare-backend-oac4.onrender.com

---

## 📌 Features

### 👤 Authentication

* JWT-based login & signup
* Role-based access (Admin / Student)
* Secure admin signup using access code

### 🧑‍🎓 Student Panel

* Create complaints
* Upload files (images/docs)
* Track complaint status
* View complaint history

### 🛠️ Admin Panel

* View all complaints
* Resolve / update complaints
* Dashboard analytics (charts)
* Filter complaints by status/priority

### 📊 Dashboard

* Total / Resolved / Pending stats
* Donut chart (priority distribution)
* Bar chart (status comparison)
* Line chart (monthly trends)

---

## 🏗️ Tech Stack

**Frontend:**

* React.js (Vite)
* Tailwind CSS
* Recharts

**Backend:**

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

**Deployment:**

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## 📁 Project Structure

```bash
UniCare/
│
├── frontend/          # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── context/
│
├── backend/           # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
```

---

## ⚙️ Environment Variables

### 🔹 Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
ADMIN_SECRET=your_admin_code
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 🔹 Frontend (.env)

```env
VITE_API_URL=https://your-backend-url/api/auth
```

---

## 🚀 Installation (Local Setup)

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/UniCare-AI-Complaint-Management.git
cd UniCare-AI-Complaint-Management
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Security Features

* Password hashing (bcrypt)
* JWT authentication
* Protected routes
* Admin access validation using secret key

---

## 📌 Future Improvements

* Forgot password (email reset)
* Email verification
* Real-time notifications
* Complaint assignment system
* Export data (CSV/PDF)

---

## 👨‍💻 Author

**Vansh Patil**

* GitHub: https://github.com/vanshhpatil
* LinkedIn: https://linkedin.com/in/vanshhpatil
---

## ⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
