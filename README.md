# QuizMaster 🧠  
_A full-stack quiz platform built with Angular, Node.js, Express, and MongoDB_

### 🎯 Overview
**QuizMaster** is an interactive quiz web app that allows users to explore quizzes by category, take exams, and track their progress through a modern and responsive interface.  
It features secure authentication, admin controls, and a RESTful API for managing quizzes, users, and categories.

---

### 🚀 Live Demo
- **Frontend (Angular + Bootstrap)** → [QuizMaster on Netlify](https://quiz-master-angular.netlify.app/home)  
- **Backend (Node.js + Express + MongoDB)** → [QuizMaster API on Vercel](https://quiz-app-api-lac.vercel.app/)

---

### ⚙️ Tech Stack

#### Frontend
- **Angular 20**
- **Bootstrap 5**
- TypeScript
- Signals
- Angular Router

#### Backend
- **Node.js** & **Express.js**
- MongoDB (Mongoose)
- JWT Authentication
- Google OAuth2
- RESTful API Architecture

---

### 🌟 Features
- 🔐 **Authentication & Authorization** (JWT + Google OAuth2)  
- 👨‍💻 **Admin Dashboard** for adding/editing/deleting quizzes & categories  
- 🧩 **Dynamic Quiz Categories** fetched from the backend  
- 🧾 **User Profile** with joined date and progress tracking  
- 📊 **Real-Time Quiz Feedback** and scoring system  
- 💎 **Responsive & Modern UI** built with Bootstrap  

---

### 🧰 Installation & Setup

#### Frontend
```bash
# Clone the frontend repo
git clone https://github.com/HassanAli381/Quiz-Master-Angular
cd Quiz-Master-Angular

# Install dependencies
npm install

# Run the app
ng serve
```

#### Backend
```bash
# Clone the backend repo
git clone https://github.com/HassanAli381/Quiz-App-API
Quiz-App-API

# Install dependencies
npm install

# Create a .env file and add:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret

# Run the server
npm run dev
```

---

### 🧱 API Endpoints

> 🛡️ **Note:** Creation, update, and deletion routes are restricted to **admin users** only.

---

### 📚 Categories
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/categories` | Get all categories |
| `GET` | `/api/categories/:id` | Get category by ID |
| `POST` | `/api/categories` | **Admin** - Create category |
| `PUT` | `/api/categories/:id` | **Admin** - Update category |
| `DELETE` | `/api/categories/:id` | **Admin** - Delete category |

---

### ❓ Questions
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/questions` | Get all or filtered questions |
| `GET` | `/api/questions/:id` | Get question by ID |
| `POST` | `/api/questions` | **Admin** - Create question |
| `PUT` | `/api/questions/:id` | **Admin** - Update question |
| `DELETE` | `/api/questions/:id` | **Admin** - Delete question |

---

### 🧾 Exams
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/api/exams` | Get all exams |
| `GET` | `/api/exams/:id` | Get exam by ID |
| `POST` | `/api/exams` | **Admin** - Create exam |
| `PUT` | `/api/exams/:id` | **Admin** - Update exam |
| `DELETE` | `/api/exams/:id` | **Admin** - Delete exam |

---

### 👥 Users & Authentication
| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | Login user |
| `GET` | `/api/auth/google` | Authenticate with Google |
| `GET` | `/api/auth/google/redirect` | Redirect after Google authentication |

---

### 👥 Team
**Developed by:**  
- 🧑‍💻 **Omar Wael** — FullStack Developer  
- 👩‍💻 **Al-Hassan Ali** — FullStack Developer
  
---

### 📜 License
This project is licensed under the **MIT License** — free to use and modify.

---

