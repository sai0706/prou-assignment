# Deployment Guide - Employee Task Manager on Render

This guide will walk you through deploying your Employee Task Manager application to Render.

## Prerequisites

- [ ] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] MongoDB Atlas account (free tier available)
- [ ] Render account (free tier available)

---

## Step 1: Set Up MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (choose the free M0 tier)

2. **Configure Database Access**
   - Click "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Set user privileges to "Read and write to any database"

3. **Configure Network Access**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

4. **Get Connection String**
   - Click "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/employee-task-db?retryWrites=true&w=majority`

---

## Step 2: Push Code to Git Repository

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/employee-task-manager.git

# Push to main branch
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Sign up or log in
   - Click "New +" → "Web Service"
   - Connect your Git repository

2. **Configure Backend Service**
   - **Name**: `employee-task-manager-api`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `PORT` | `5000` |
   | `FRONTEND_URL` | (Leave empty for now, will update after frontend deployment) |

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)
   - Copy the backend URL (e.g., `https://employee-task-manager-api.onrender.com`)

---

## Step 4: Deploy Frontend to Render

1. **Create New Static Site**
   - Click "New +" → "Static Site"
   - Select the same Git repository

2. **Configure Frontend Service**
   - **Name**: `employee-task-manager-frontend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

3. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | Your backend URL from Step 3 (e.g., `https://employee-task-manager-api.onrender.com`) |

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete (3-5 minutes)
   - Copy the frontend URL (e.g., `https://employee-task-manager-frontend.onrender.com`)

---

## Step 5: Update Backend CORS Configuration

1. **Update Backend Environment Variables**
   - Go to your backend service in Render dashboard
   - Click "Environment"
   - Add or update the `FRONTEND_URL` variable:
     - **Key**: `FRONTEND_URL`
     - **Value**: Your frontend URL from Step 4
   - Click "Save Changes"
   - The service will automatically redeploy

---

## Step 6: Test Your Deployment

1. **Visit Frontend URL**
   - Open your frontend URL in a browser
   - You should see the Employee Task Manager application

2. **Test Functionality**
   - Navigate to "Employees" page
   - Create a new employee
   - Navigate to "Tasks" page
   - Create a new task and assign it to the employee
   - Check the Dashboard to see statistics
   - Refresh the page to verify data persists

---

## Troubleshooting

### Backend won't start
- Check the logs in Render dashboard
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

### Frontend can't connect to backend
- Check browser console for CORS errors
- Verify `VITE_API_URL` is set correctly in frontend environment variables
- Verify `FRONTEND_URL` is set correctly in backend environment variables

### Database connection fails
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check database user credentials
- Ensure connection string format is correct

### Free tier limitations
- Render free tier services spin down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- Consider upgrading to paid tier for production use

---

## Environment Variables Reference

### Backend Environment Variables
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee-task-db
PORT=5000
FRONTEND_URL=https://your-frontend-url.onrender.com
```

### Frontend Environment Variables
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Updating Your Deployment

When you make changes to your code:

```bash
# Commit your changes
git add .
git commit -m "Description of changes"

# Push to repository
git push origin main
```

Render will automatically detect the changes and redeploy your services.

---

## Alternative: Deploy Using render.yaml (Blueprint)

If you prefer automated deployment, you can use the included `render.yaml` file:

1. Go to Render dashboard
2. Click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect `render.yaml` and create both services
5. You'll still need to manually set the `MONGODB_URI` environment variable

---

## Support

For issues or questions:
- Render Documentation: [render.com/docs](https://render.com/docs)
- MongoDB Atlas Documentation: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
