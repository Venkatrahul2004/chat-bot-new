# 🚀 Modern ChatBot Web Application

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/venkata-rahul-batta-822722278/)
[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://chat-bot-new-6bv4.onrender.com/)

<div align="center">
  
  ### Developed by [Batta Venkata Rahul](https://www.linkedin.com/in/venkata-rahul-batta-822722278/)
  
  *A step-by-step guide to building and deploying a modern chatbot application*

  ### 🌐 [View Live Demo](https://chat-bot-new-6bv4.onrender.com/)
</div>

---

## 📑 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Project Setup](#-project-setup)
3. [Local Development](#-local-development)
4. [Version Control](#-version-control)
5. [GitHub Deployment](#-github-deployment)
6. [Render Deployment](#-render-deployment)
7. [Testing](#-testing)
8. [Troubleshooting](#-troubleshooting)
9. [Contributing](#-contributing)

## 🛠 Prerequisites

Before starting, ensure you have:

1. Node.js and npm:
```bash
# Check versions
node --version  # Should be 14.x or higher
npm --version   # Should be 6.x or higher

# Install if needed from https://nodejs.org/
```

2. Git:
```bash
git --version  # Should be 2.x or higher
# Install if needed from https://git-scm.com/
```

3. Code Editor (VS Code recommended)
4. GitHub Account
5. Render Account (Sign up at https://render.com)

## 📂 Project Setup

### 1. Create Project Structure
```bash
# Create project directory
mkdir chatbot-application
cd chatbot-application

# Initialize npm
npm init -y
```

### 2. Install Dependencies
```bash
# Core dependencies
npm install express dotenv cors openai

# Development dependencies
npm install nodemon --save-dev
```

### 3. Create Basic File Structure
```
chatbot-application/
├── node_modules/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── script.js
│   └── index.html
├── .env
├── .gitignore
├── package.json
└── server.js
```

### 4. Configure package.json
```json
{
  "name": "chatbot-application",
  "version": "1.0.0",
  "description": "Modern ChatBot Web Application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": ["chatbot", "openai", "express"],
  "author": "Batta Venkata Rahul",
  "license": "MIT"
}
```

## 💻 Local Development

### 1. Server Setup (server.js)
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.post('/api/chat', async (req, res) => {
    try {
        // Your chatbot logic here
        res.json({ message: 'Response from chatbot' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

### 2. Frontend Setup (public/index.html)
Create basic HTML structure with chat interface.

### 3. Environment Configuration
Create `.env` file:
```env
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_api_key_here
```

### 4. Start Local Development
```bash
# Run development server
npm run dev

# Access at http://localhost:3000
```

## 📤 Version Control

### 1. Initialize Git Repository
```bash
# Initialize git
git init

# Create .gitignore
echo "node_modules/
.env
.DS_Store" > .gitignore

# Initial commit
git add .
git commit -m "Initial commit"
```

### 2. Connect to GitHub
```bash
# Add remote repository
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

## 🌐 GitHub Deployment

1. Go to GitHub.com and create new repository
2. Push your code:
```bash
git push -u origin main
```

## 🚀 Render Deployment

### 1. Initial Setup
1. Sign up/Login to [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository

### 2. Configuration
1. Fill basic information:
   - Name: `chat-bot-new-6bv4`
   - Environment: `Node`
   - Region: Choose nearest
   - Branch: `main`

2. Build settings:
```bash
# Build Command
npm install

# Start Command
node server.js
```

3. Add environment variables:
   - Click "Environment"
   - Add all variables from your `.env`
   - Set `NODE_ENV=production`

### 3. Deploy
1. Click "Create Web Service"
2. Wait for deployment (monitor in logs)
3. Access your live app at [https://chat-bot-new-6bv4.onrender.com/](https://chat-bot-new-6bv4.onrender.com/)

## 🧪 Testing

### Local Testing
```bash
# Start development server
npm run dev

# Test endpoints using Postman or curl:
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

### Production Testing
Test your live deployment at [https://chat-bot-new-6bv4.onrender.com/](https://chat-bot-new-6bv4.onrender.com/)

## 🔍 Troubleshooting

### Common Issues and Solutions

1. **Port Already in Use**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

2. **Node Version Issues**
```bash
# Check node version
node -v

# Install specific version using nvm
nvm install 14
nvm use 14
```

3. **Deployment Failures**
- Check Render logs
- Verify environment variables
- Ensure all dependencies are in package.json
- Confirm start command is correct

## 🤝 Contributing

1. Fork the repository
2. Create feature branch:
```bash
git checkout -b feature/YourFeature
```
3. Commit changes:
```bash
git commit -m 'Add YourFeature'
```
4. Push to branch:
```bash
git push origin feature/YourFeature
```
5. Submit a Pull Request

## 📞 Support

Need help? Contact:

**Batta Venkata Rahul**
- 💼 [LinkedIn](https://www.linkedin.com/in/venkata-rahul-batta-822722278/)
- 🌐 [Live Demo](https://chat-bot-new-6bv4.onrender.com/)

---

<div align="center">
  <p>Developed with ❤️ by <a href="https://www.linkedin.com/in/venkata-rahul-batta-822722278/">Batta Venkata Rahul</a></p>
  <p>Try the live demo: <a href="https://chat-bot-new-6bv4.onrender.com/">https://chat-bot-new-6bv4.onrender.com/</a></p>
</div>
