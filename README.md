# 📝 To-Do App (MERN Stack)

تطبيق **To-Do App** بسيط لإدارة المهام اليومية (إضافة، تعديل، حذف، تحديد كمكتملة).  
مبني باستخدام:
- **Backend:** Node.js + Express.js + MongoDB (Mongoose)
- **Frontend:** React (Vite) + Material UI + CSS
- **Auth:** JWT + bcrypt

---

## 📂 هيكل المشروع
```
/project-root
 ├── backend/         # الكود الخاص بالـ API
 │    ├── server.js
 │    ├── routes/
 │    ├── controllers/
 │    ├── models/
 │    └── .env
 │
 └── frontend/        # الكود الخاص بالـ React
      ├── src/
      ├── public/
      └── vite.config.js
```

---

## ⚙️ المتطلبات
قبل التشغيل لازم يكون عندك:
- [Node.js](https://nodejs.org/) (v16 أو أحدث)
- [MongoDB](https://www.mongodb.com/) شغال محليًا أو عبر Atlas
- مدير حزم npm أو yarn

---

## 🚀 خطوات التشغيل

### 1️⃣ تشغيل الباك إند
1. انتقل لمجلد الباك إند:
   ```bash
   cd backend
   ```
2. نزّل البكجات:
   ```bash
   npm install
   ```
3. أنشئ ملف البيئة `.env` (مثال):
   ```env
   PORT=5000
   connectionString=mongodb://localhost:27017/laithTask
   salt=7
   SECRET=laithTask
   ```
4. شغّل السيرفر:
   ```bash
   npm run dev
   ```
   أو
   ```bash
   node server.js
   ```

### 2️⃣ تشغيل الفرونت إند
1. انتقل لمجلد الفرونت إند:
   ```bash
   cd frontend
   ```
2. نزّل البكجات:
   ```bash
   npm install
   ```
3. شغّل التطبيق:
   ```bash
   npm run dev
   ```
4. افتح المتصفح على:
   ```
   http://localhost:5173
   ```

---

## 📌 ملاحظات
- يمكنك تعديل `connectionString` في ملف `.env` إذا بدك تستخدم **MongoDB Atlas** بدل localhost.  
- الـ Frontend متصل مع الـ Backend على `http://localhost:5000/api`.  
- لتجهيز نسخة Production: 
  - من داخل `frontend/` اعمل:
    ```bash
    npm run build
    ```
  - واربطها مع الباك إند أو أي سيرفر استضافة.  

---

## 🕒 معلومات إضافية (للتقرير المطلوب)
- **ساعات العمل:** ~ X ساعات  
- **التحديات:** إعداد الاتصال بين React و Express + التعامل مع Authentication.  
- **الحلول:** استخدام CORS، JWT، وتجهيز API واضحة للمهمات.  
