# AIPRDD: Project Development Journey

This document outlines the chronological evolution of the AI-Powered Road Damage Detection (AIPRDD) System, from initial model training to full-stack deployment, detailing the technical challenges and solutions implemented along the way.

## Phase 1: Model Training
- **Objective:** Train an AI model to accurately detect and classify road damage (potholes, cracks, etc.) from images.
- **Key Artifacts:** 
  - `best.pt`: The final, optimized YOLO weights (tracked via Git LFS).
  - Inference scripts and training metrics.
- **Updates:** Successfully tuned the model to achieve high confidence on diverse road damage datasets.

## Phase 2: Web Dashboard
- **Objective:** Create a preliminary web interface for visualizing road damage reports.
- **Key Artifacts:** 
  - `EXPO_TEMPLATE.pptx` & Project Documentation.
  - Early frontend layouts and static mockups.
- **Updates:** Established the initial UI/UX concepts for the government dashboard.

## Phase 3: SafePath Navigation (Full-Stack Implementation & Deployment)
- **Objective:** Build a fully functional, real-time ecosystem consisting of a FastAPI backend, a Citizen mobile web app, and a Government dashboard.

### Technical Challenges & Solutions

#### 1. Mobile Device Connectivity (`ECONNRESET`)
- **Error:** When connecting a mobile phone to the local Citizen App via the network IP, Node.js (v22) would instantly crash with an `ECONNRESET` error.
- **Fix:** Implemented a global `uncaughtException` handler in `vite.config.js` to intercept and safely ignore `ECONNRESET` socket disconnects, stabilizing the local dev server.

#### 2. Backend CORS and IP Routing
- **Error:** The Citizen App could not successfully upload road damage images from a phone due to CORS blocking the local network IP.
- **Fix:** Dynamically updated the `ALLOWED_ORIGINS` in the backend `.env` and `VITE_API_URL` in the frontend to match the host machine's active network IP (`10.247.203.33`), enabling seamless cross-device communication.

#### 3. Render Backend Deployment: Python Versioning
- **Error:** The Render deployment failed while trying to build the `Pillow` library, throwing a `KeyError: '__version__'`.
- **Fix:** Render defaults to a Python version that lacked pre-compiled wheels for our specific Pillow version. We solved this by explicitly setting the `PYTHON_VERSION` environment variable to `3.10.14`.

#### 4. Render Backend Deployment: Missing Uvicorn
- **Error:** After fixing the Python version, the server failed to start with `ModuleNotFoundError: No module named 'uvicorn'`.
- **Fix:** The `fastapi` installation did not automatically include the Uvicorn worker. We updated `requirements.txt` to include `uvicorn[standard]` (and resolved a Windows UTF-16 encoding glitch during the file update) which allowed Gunicorn to successfully start the app.

#### 5. Vercel Frontend Deployment: Strict Peer Dependencies
- **Error:** Vercel's `npm install` failed with an `ERESOLVE` error because `vite-plugin-pwa` had strict version requirements that conflicted with Vite 8.
- **Fix:** Created an `.npmrc` file with `legacy-peer-deps=true` for both frontends, allowing npm to bypass strict peer dependency checks.

#### 6. Vercel Frontend Deployment: Rolldown Segfaults (OOM Crashes)
- **Error:** Vercel builds failed silently (exit code 1, `error during build:`) exactly after printing chunk size warnings. The native Rust `rolldown` bundler in experimental Vite 8 was crashing on Vercel's Node environment.
- **Fix:** We completely removed the experimental Vite 8 and safely downgraded both the Citizen App and Government Dashboard to the battle-tested **Vite 5.4.11**. We also disabled minification to prevent Out-Of-Memory kills on Vercel's free tier. This completely resolved the crashes and resulted in successful, green deployments!
