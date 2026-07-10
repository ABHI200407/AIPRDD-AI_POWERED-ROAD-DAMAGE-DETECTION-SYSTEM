# 🚀 Production Setup Guide

Follow these steps to deploy your system to the real world.

## 1. AI Engine (Hugging Face)
1. Go to [Hugging Face Spaces](https://huggingface.co/new-space).
2. **Name**: `road-sentinel-ai` (or anything you like).
3. **SDK**: Choose **Docker** or **Static**? No, choose **Gradio** but we will use the "Blank" or "FastAPI" template if available. Actually, just choose **Gradio** and we'll swap the code.
4. **Files to Upload**:
   - `hf_space/app.py`
   - `hf_space/requirements.txt`
   - `best.pt` (Your model file).
5. Once running, copy your Space URL (e.g., `https://username-road-sentinel-ai.hf.space`).

---

## 2. Database (Supabase)
1. Create a project on [Supabase](https://supabase.com).
2. Go to **Project Settings > Database**.
3. Copy the **Connection String** (URI). It looks like:
   `postgresql://postgres:[PASSWORD]@db.[ID].supabase.co:5432/postgres`
4. **Important**: Replace `[PASSWORD]` with your actual database password.

---

## 3. Image Storage (Cloudinary)
1. Sign up for [Cloudinary](https://cloudinary.com).
2. In your Dashboard, find:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Create your `CLOUDINARY_URL`:
   `cloudinary://API_KEY:API_SECRET@CLOUD_NAME`

---

## 4. Backend (Render)
1. Go to [Render](https://render.com) and create a new **Web Service**.
2. Connect your GitHub repository.
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `gunicorn -k uvicorn.workers.UvicornWorker main:app`
5. **Environment Variables**:
   - `DATABASE_URL`: (Your Supabase URI)
   - `HF_SPACE_URL`: `https://your-space.hf.space/detect`
   - `CLOUDINARY_URL`: (Your Cloudinary URL)
   - `SECRET_KEY`: (Any random string for security)
   - `ALLOWED_ORIGINS`: `*` (or your Vercel URLs later)

---

## 5. Frontend (Vercel)
1. Deploy `frontend/citizen-app` and `frontend/gov-dashboard` to Vercel.
2. In Vercel Settings, add these **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api/v1`
   - `VITE_WS_URL`: `wss://your-backend.onrender.com/ws`
   - (Plus your Firebase keys)

---

### ✅ Success!
Your app is now live. Open the Citizen App URL on your mobile phone, mount it on your dashboard, and start the "Sentinel" mode. It will now report real damage to your live database!
