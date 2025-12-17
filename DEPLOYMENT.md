# CookVerse AI - Deployment Guide

This guide will help you deploy the CookVerse AI application to production using Netlify (frontend) and Render (backend).

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] A GitHub account (to connect your repository)
- [ ] A Netlify account (free tier available at [netlify.com](https://netlify.com))
- [ ] A Render account (free tier available at [render.com](https://render.com))
- [ ] A MongoDB Atlas account (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

## 🗄️ Step 1: Set Up MongoDB Atlas (Database)

1. **Create a MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a New Cluster**
   - Click "Build a Database"
   - Select the FREE tier (M0)
   - Choose a cloud provider and region close to you
   - Click "Create Cluster"

3. **Configure Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:<password>@cluster.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual password
   - Add database name: `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/cookverse-ai`

## 🚀 Step 2: Deploy Backend to Render

1. **Push Your Code to GitHub**
   ```bash
   cd c:/Users/senta/OneDrive/Desktop/food
   git init
   git add .
   git commit -m "Initial commit - CookVerse AI"
   git branch -M main
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/cookverse-ai.git
   git push -u origin main
   ```

2. **Create New Web Service on Render**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `cookverse-ai` repository

3. **Configure the Service**
   - **Name**: `cookverse-backend` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `10000` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1 |
   | `JWT_SECRET` | A random secure string (e.g., `your-super-secret-jwt-key-change-this`) |

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)
   - Copy your backend URL (e.g., `https://cookverse-backend.onrender.com`)

## 🌐 Step 3: Deploy Frontend to Netlify

### Option A: Deploy via Netlify UI (Recommended for Beginners)

1. **Go to Netlify**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select your `cookverse-ai` repository

3. **Configure Build Settings**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

4. **Add Environment Variables**
   - Click "Show advanced"
   - Click "New variable"
   - Add: `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
   - (Replace with your actual Render backend URL from Step 2)

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment (2-5 minutes)
   - Your site will be live at a URL like `https://random-name.netlify.app`

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy from Project Root**
   ```bash
   cd c:/Users/senta/OneDrive/Desktop/food
   netlify deploy
   ```

4. **Follow Prompts**
   - Create & configure a new site
   - Set build command: `npm run build`
   - Set publish directory: `frontend/dist`

5. **Set Environment Variable**
   ```bash
   netlify env:set VITE_API_URL "https://your-backend-url.onrender.com/api"
   ```

6. **Deploy to Production**
   ```bash
   netlify deploy --prod
   ```

## 🔧 Step 4: Update Backend CORS Settings

After deploying the frontend, you need to update the backend to allow requests from your Netlify URL.

1. **Update Backend Environment Variables on Render**
   - Go to your Render dashboard
   - Select your backend service
   - Go to "Environment"
   - Add new variable: `CORS_ORIGIN` = `https://your-site.netlify.app`

2. **Update Backend Code** (if needed)
   
   Check `backend/server.js` and ensure CORS is configured:
   ```javascript
   app.use(cors({
     origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
     credentials: true
   }));
   ```

## ✅ Step 5: Verify Deployment

1. **Test Frontend**
   - Visit your Netlify URL
   - Check that the homepage loads
   - Try navigating to different pages

2. **Test Backend Connection**
   - Try registering a new user
   - Try logging in with default admin credentials:
     - Email: `admin@cookverse.ai`
     - Password: `Admin@123`

3. **Test Full Functionality**
   - Create a recipe
   - Browse recipes
   - Add favorites
   - Test AI chat (if configured)

## 🔄 Continuous Deployment

Both Netlify and Render support automatic deployments:

- **Netlify**: Automatically deploys when you push to your GitHub repository
- **Render**: Automatically deploys when you push to your GitHub repository

To update your app:
```bash
git add .
git commit -m "Your update message"
git push
```

## 🐛 Troubleshooting

### Frontend Issues

**Problem**: White screen or blank page
- Check browser console for errors
- Verify `VITE_API_URL` environment variable is set correctly
- Ensure the URL ends with `/api` (e.g., `https://backend.onrender.com/api`)

**Problem**: 404 errors on page refresh
- The `netlify.toml` and `_redirects` files should handle this
- Verify these files are in the correct locations

### Backend Issues

**Problem**: Backend not responding
- Render free tier services sleep after 15 minutes of inactivity
- First request may take 30-60 seconds to wake up
- Consider upgrading to paid tier for always-on service

**Problem**: Database connection errors
- Verify MongoDB Atlas connection string is correct
- Check that IP whitelist includes `0.0.0.0/0`
- Ensure database user has correct permissions

**Problem**: CORS errors
- Verify `CORS_ORIGIN` environment variable matches your Netlify URL
- Check that backend CORS configuration allows your frontend domain

### General Issues

**Problem**: Environment variables not working
- Netlify: Redeploy after adding environment variables
- Render: Service restarts automatically when env vars change
- Verify variable names match exactly (case-sensitive)

## 📝 Custom Domain (Optional)

### For Netlify (Frontend)
1. Go to "Domain settings" in Netlify
2. Click "Add custom domain"
3. Follow DNS configuration instructions

### For Render (Backend)
1. Upgrade to a paid plan (custom domains not available on free tier)
2. Go to "Settings" → "Custom Domain"
3. Follow DNS configuration instructions

## 🔒 Security Recommendations

1. **Change Default Admin Password**
   - Login with default credentials
   - Go to profile settings
   - Change password immediately

2. **Use Strong JWT Secret**
   - Generate a random string: `openssl rand -base64 32`
   - Update in Render environment variables

3. **Enable HTTPS Only**
   - Both Netlify and Render provide free SSL certificates
   - Ensure your app redirects HTTP to HTTPS

4. **Restrict MongoDB Access**
   - Instead of `0.0.0.0/0`, add specific Render IP addresses
   - Find Render's outbound IPs in their documentation

## 📊 Monitoring

- **Netlify**: Check "Deploys" tab for build logs and status
- **Render**: Check "Logs" tab for runtime logs and errors
- **MongoDB Atlas**: Monitor database usage in the Atlas dashboard

## 💰 Cost Considerations

- **Netlify Free Tier**: 100GB bandwidth, 300 build minutes/month
- **Render Free Tier**: 750 hours/month, sleeps after 15 min inactivity
- **MongoDB Atlas Free Tier**: 512MB storage, shared cluster

For production apps with real users, consider upgrading to paid tiers for better performance and reliability.

---

## 🆘 Need Help?

If you encounter issues:
1. Check the troubleshooting section above
2. Review deployment logs in Netlify/Render dashboards
3. Check browser console for frontend errors
4. Review backend logs in Render dashboard

---

**🎉 Congratulations!** Your CookVerse AI app is now live!
