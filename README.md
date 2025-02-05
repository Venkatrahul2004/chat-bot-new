# 🚀 Modern Web Application

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)](https://expressjs.com/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/venkata-rahul-batta-822722278/)

<div align="center">
  
  ### Developed by [Batta Venkata Rahul](https://www.linkedin.com/in/venkata-rahul-batta-822722278/)
  
  *A complete guide to setting up, testing, and deploying a modern web application*
</div>

---

## 📑 Table of Contents
- [Introduction](#-introduction)
- [Prerequisites](#-prerequisites)
- [Local Setup](#-local-setup)
- [Development Guide](#-development-guide)
- [GitHub Deployment](#-github-deployment)
- [Render Deployment](#-render-deployment)
- [Environment Configuration](#-environment-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🎯 Introduction

This project is a web application built with Node.js and Express, featuring a clean architecture and seamless deployment process. This guide will walk you through every step from local development to live deployment.

## 🛠 Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
  ```bash
  node --version
  ```
- npm (v6 or higher)
  ```bash
  npm --version
  ```
- Git
  ```bash
  git --version
  ```
- VS Code (recommended)
- A GitHub account
- A Render account

## 💻 Local Setup

### 1. Project Initialization
```bash
# Create project directory
mkdir my-project
cd my-project

# Initialize npm
npm init -y

# Install necessary dependencies
npm install express dotenv cors
npm install nodemon --save-dev
```

### 2. Create Project Structure
```bash
my-project/
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

### 3. Configure package.json
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "Modern web application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Batta Venkata Rahul",
  "license": "MIT"
}
```

## 🔧 Development Guide

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

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### 2. Frontend Setup (public/index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Web App</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div id="app">
        <h1>Welcome to Modern Web App</h1>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
```

### 3. Environment Setup (.env)
```env
PORT=3000
NODE_ENV=development
# Add other environment variables as needed
```

### 4. Git Configuration (.gitignore)
```gitignore
node_modules/
.env
.DS_Store
npm-debug.log
*.log
```

### 5. Local Testing
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access application
# Open http://localhost:3000 in your browser
```

## 📤 GitHub Deployment

### 1. Repository Setup
```bash
# Initialize git
git init

# Add files
git add .

# Initial commit
git commit -m "Initial commit"

# Create new repository on GitHub
# Then link your local repo
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### 2. GitHub Branch Protection
1. Go to repository Settings
2. Navigate to Branches
3. Add rule for `main` branch
4. Enable:
   - Require pull request reviews
   - Require status checks
   - Include administrators

## 🚀 Render Deployment

### 1. Initial Setup
1. Create account on render.com
2. Connect GitHub account
3. Click "New +" and select "Web Service"
4. Choose your repository

### 2. Configuration Settings
1. Fill in basic info:
   - Name: `your-app-name`
   - Region: `closest to target audience`
   - Branch: `main`

2. Build settings:
   ```bash
   # Build Command
   npm install

   # Start Command
   node server.js
   ```

3. Environment variables:
   - Add all variables from `.env`
   - Set `NODE_ENV=production`

### 3. Deploy Process
1. Click "Create Web Service"
2. Monitor build process in logs
3. Wait for "Deploy successful" message
4. Access your app at provided URL

## ⚙️ Environment Configuration

### Local Environment
```env
PORT=3000
NODE_ENV=development
# Add other local variables
```

### Production Environment (Render)
- PORT: Set automatically by Render
- NODE_ENV: production
- Add other production variables in Render dashboard

## 🔍 Troubleshooting

### Common Issues

1. **Port Already in Use**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

2. **Node Version Mismatch**
```bash
# Check version
node -v

# Use correct version
nvm use 14
```

3. **Deployment Failures**
- Check Render logs
- Verify environment variables
- Confirm start command
- Check for build errors

## 🤝 Contributing

1. Fork repository
2. Create feature branch
```bash
git checkout -b feature/YourFeature
```

3. Commit changes
```bash
git commit -m 'Add YourFeature'
```

4. Push to branch
```bash
git push origin feature/YourFeature
```

5. Create Pull Request

## 📞 Contact & Support

For questions or support, reach out to:

**Batta Venkata Rahul**
- 💼 [LinkedIn](https://www.linkedin.com/in/venkata-rahul-batta-822722278/)
- 📧 [Email](mailto:your.email@example.com)

---

<div align="center">
  <p>Developed with ❤️ by <a href="https://www.linkedin.com/in/venkata-rahul-batta-822722278/">Batta Venkata Rahul</a></p>
</div>
