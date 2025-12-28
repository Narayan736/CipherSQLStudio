# CipherSQL Studio

A Full-Stack SQL Learning Platform submitted for the Web Development Assignment.

## 🚀 Features
* **Dual-Database Architecture:** PostgreSQL (Neon Tech) for query execution and MongoDB (Atlas) for application data.
* **Real-Time SQL Execution:** Secure sandbox environment to run queries instantly.
* **AI Hints:** Intelligent hint system to guide students without revealing answers.
* **Modern UI:** Dark-themed, mobile-responsive interface inspired by VS Code.

## 🛠️ Tech Stack
* **Frontend:** React + Vite, Vanilla SCSS (Mobile-First)
* **Backend:** Node.js, Express.js
* **Databases:** PostgreSQL, MongoDB
* **Tools:** Monaco Editor, Axios

## ⚙️ Setup Instructions
1.  **Server:**
    ```bash
    cd server
    npm install
    # Create .env with PG_URI and MONGO_URI
    npm run dev
    ```
2.  **Client:**
    ```bash
    cd client
    npm install
    npm run dev
    ```