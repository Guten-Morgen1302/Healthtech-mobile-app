# GitHub Pages Deployment Guide

## Prerequisites
1. GitHub account
2. Git installed on your computer
3. Backend deployed on a cloud service (Render, Railway, Heroku, etc.)

## Step 1: Update Package.json Homepage

Open `blood-bank-app/package.json` and update the homepage field:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/Healthtech-mobile-app"
```
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

## Step 2: Install gh-pages Package

```bash
cd blood-bank-app
npm install
```

## Step 3: Update API Base URL for Production

Before deploying, you need to update the API base URL to point to your production backend.

Edit `blood-bank-app/src/services/api.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'YOUR_BACKEND_URL_HERE';
```

Or create a `.env.production` file in the `blood-bank-app` folder:
```
REACT_APP_API_URL=https://your-backend-url.com
```

## Step 4: Initialize Git Repository (if not done)

```bash
cd ..
git init
git add .
git commit -m "Initial commit"
```

## Step 5: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `Healthtech-mobile-app`
3. Do NOT initialize with README (since you already have one)

## Step 6: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/Healthtech-mobile-app.git
git branch -M main
git push -u origin main
```

## Step 7: Deploy Frontend to GitHub Pages

```bash
cd blood-bank-app
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Push the build folder to GitHub Pages

## Step 8: Configure GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select branch: `gh-pages`
4. Click Save

Your site will be live at: `https://YOUR_GITHUB_USERNAME.github.io/Healthtech-mobile-app`

## Step 9: Deploy Backend (Recommended: Render.com)

### Option A: Deploy to Render

1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: healthtech-backend
   - **Root Directory**: blood-bank-backend
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `PORT=5000`
   - `NODE_ENV=production`
7. Click "Create Web Service"

### Option B: Deploy to Railway

1. Go to https://railway.app
2. Click "Start a New Project"
3. Connect GitHub and select your repository
4. Add environment variables
5. Deploy

## Step 10: Update Frontend API URL

After deploying the backend, update the API URL in your frontend:

Create `blood-bank-app/.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Then redeploy:
```bash
npm run deploy
```

## Important Notes

⚠️ **GitHub Pages Limitations:**
- Only hosts static sites (frontend only)
- Backend must be deployed separately
- No server-side code execution

✅ **Recommended Architecture:**
- Frontend: GitHub Pages
- Backend: Render.com / Railway / Heroku
- Database: MongoDB Atlas (already using)

## Updating Your Deployment

To update your live site:
```bash
cd blood-bank-app
npm run deploy
```

## Troubleshooting

### Blank Page After Deployment
- Check that `homepage` in package.json is correct
- Verify `BrowserRouter` should use `basename` prop:
  ```jsx
  <BrowserRouter basename="/Healthtech-mobile-app">
  ```

### API Calls Failing
- Ensure backend is deployed and running
- Check CORS settings in backend allow your GitHub Pages domain
- Verify API URL in `.env.production`

### 404 on Page Refresh
Add this to `public/index.html` in the `<head>`:
```html
<script type="text/javascript">
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

## Custom Domain (Optional)

1. Add a `CNAME` file in `public/` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Admin & Hospital Login Credentials

After deployment, use these credentials to test:

**Admin:**
- Email: admin@bloodbank.com
- Password: admin123

**Hospital:**
- Email: apollo@hospital.com  
- Password: password123

---

Need help? Check the GitHub Pages documentation: https://docs.github.com/en/pages
