# 🌐 MERN Image Search App (OAuth + Unsplash Integration)

A full-stack **MERN** project that allows users to log in via **Google**, **GitHub**, or **Facebook** using **Passport.js OAuth**, and search images using the **Unsplash API**.  
User searches and history are stored in **MongoDB Atlas**, while the app displays **top global searches** and enables **multi-select image functionality**.

---

## 🚀 Features

- 🔐 **OAuth Authentication** (Google / GitHub / Facebook)  
- 🔍 **Image Search** using Unsplash API  
- 🧮 Displays **“You searched for X — N results.”**  
- 🖼️ **4-column grid** with multi-select checkboxes  
- 🧠 **Selected Counter** — “Selected: X images”  
- 📈 **Top 5 most frequent searches** (global banner)  
- 🕓 **User-specific search history** (shown in sidebar)  
- 📱 **Responsive design** for all devices  

---

## 🧩 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas |
| **Authentication** | Passport.js (Google, GitHub, Facebook) |
| **API** | Unsplash Search API |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/djayasimhareddy/mern-image-search.git
cd mern-image-search





2️⃣ Install Dependencies
Backend
cd server
npm install

Frontend
cd ../client
npm install




3️⃣ Create .env File inside /server

Add the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
UNSPLASH_ACCESS_KEY=your_unsplash_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
SESSION_SECRET=random_session_key
CLIENT_URL=http://localhost:3000




4️⃣ Run the Application
Start the Backend
cd server
node server.js

Start the Frontend
cd client
npm start


Now open the app in your browser 👉 http://localhost:3000




📁 Folder Structure
mern-image-search/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.js        # Entry point
│   └── package.json
│
├── server/                 # Express backend
│   ├── routes/
│   │   ├── search.js       # Search + Top searches endpoints
│   │   └── user.js         # OAuth routes
│   ├── models/
│   │   ├── User.js         # User schema
│   │   └── Search.js       # Search history schema
│   ├── auth.js             # Passport strategies (Google, GitHub, Facebook)
│   ├── server.js           # Main server entry
│   ├── .env                # Environment configuration (excluded from Git)
│   └── package.json
│
├── screenshots/            # Visual proof images (see below)
│
└── README.md               # Project documentation



🧠 API Endpoints
Method	Endpoint	Description
GET	/auth/google	Login via Google OAuth
GET	/auth/github	Login via GitHub OAuth
GET	/auth/facebook	Login via Facebook OAuth
GET	/auth/logout	Logout user
GET	/auth/user	Get the current logged-in user
POST	/api/search	Perform image search and save history
GET	/api/history/:userId	Get user’s past searches
GET	/api/top-searches	Get top 5 global searches




💬 API Testing with cURL / Postman

🔹 Search

curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"term": "mountains", "userId": "USER_ID"}'


🔹 Get User History

curl http://localhost:5000/api/history/USER_ID


🔹 Get Top Searches

curl http://localhost:5000/api/top-searches





🪪 License

This project is open-source and available for educational purposes.


---

### ✅ After you paste:

1. Save the file → `Ctrl + S`  
2. Commit and push:

```bash
git add README.md
git commit -m "Added professional formatted README"
git push