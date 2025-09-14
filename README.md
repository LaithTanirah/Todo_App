# 📝 To-Do App (MERN Stack)

A simple **To-Do App** to manage daily tasks (add, edit, delete, mark as completed).  
Built with:
- **Backend:** Node.js + Express.js + MongoDB (Mongoose)
- **Frontend:** React (Vite) + Material UI + CSS
- **Auth:** JWT + bcrypt

---

## 📂 Project Structure
```
/TODO_APP
 ├── backend/         
 │    ├── controllers/
 │    ├── middlewares/
 │    ├── models/
 │    ├── routes/
 │    ├── package.json
 │    ├── package-lock.json
 │    └── server.js
 │
 └── frontend/
      ├── public/
      ├── src/
      │    ├── assets/
      │    ├── components/
      │    ├── pages/
      │    ├── services/
      │    ├── App.css
      │    ├── App.jsx
      │    ├── index.css
      │    └── main.jsx
      ├── index.html
      ├── package.json
      ├── package-lock.json
      └── vite.config.js
```

---

## ⚙️ Requirements
Before running the project, make sure you have:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB](https://www.mongodb.com/) running locally or via Atlas
- npm or yarn package manager

---

## 🚀 How to Run

### 1️⃣ Run Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (example):
   ```env
   PORT=5000 
   connectionString= (MongoDB connection string)
   salt= (Bcrypt salt rounds)
   SECRET= (JWT secret key)
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   node server.js
   ```

### 2️⃣ Run Frontend
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm run dev
   ```
4. Open in your browser:
   ```
   http://localhost:5173
   ```








