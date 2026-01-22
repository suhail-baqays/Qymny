# Qymny (قيّمني) - AI Resume Analyzer 🚀

**Qymny** is a full-stack web application powered by **OpenAI** that helps job seekers analyze their resumes against specific job descriptions. It provides detailed feedback, a compatibility score, and actionable advice to improve ATS visibility.

🔗 **Live Demo:** [اضغط هنا وضع رابط موقعك - Render Link]

---

## ✨ Features
- 📄 **PDF Parsing:** Extracts text seamlessly from uploaded resumes.
- 🤖 **AI Analysis:** Uses GPT-4o (or GPT-3.5) to compare skills and experience.
- 📊 **Scoring System:** Gives a percentage match score (0-100%).
- 💡 **Smart Feedback:** Highlights missing keywords and suggests improvements.
- 🌍 **Bilingual Support:** Supports both Arabic and English resumes.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)

### Backend (Server)
- **Node.js & Express.js**
- **MongoDB** (Database)
- **OpenAI API** (Intelligence)
- **Multer** (File Handling)

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone [https://github.com/suhail-baqays/Qymny.git](https://github.com/suhail-baqays/Qymny.git)
   cd Qymny

   Install Dependencies
   # Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

Environment Variables Create a .env file in the server folder and add:
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000

# Run Server
cd server
node server.js

# Run Client (in a new terminal)
cd client
npm run dev
