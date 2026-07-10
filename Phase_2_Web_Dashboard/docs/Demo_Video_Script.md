# Demo Video Script & Storyboard
## AI-Powered Road Damage Detection System
**Group ID:** G-1111 | **Dept:** CSE-AIML | **Institution:** KMIT, Hyderabad  
**Total Duration:** ~4 minutes 30 seconds

---

## Pre-Production Notes

- **Resolution:** 1920×1080 (Full HD) — mandatory
- **Frame Rate:** 60 FPS for smooth UI demos
- **Audio:** Clear voiceover with no background noise (use lavalier or USB condenser mic)
- **Narration pace:** Slow and deliberate — pause after each UI interaction
- **Software:** OBS Studio (free) recommended for recording + background music at 20% volume
- **Background Music:** Soft cinematic/corporate track (royalty-free from Pixabay or Mixkit)
- **Editing:** DaVinci Resolve or CapCut for captions and transitions
- **File Name:** `G1111_AIPRDD_Demo_Video.mp4`

---

## 🎬 Scene-by-Scene Storyboard

---

### Scene 1 — Introduction Title Card
**⏱ Timestamp:** `00:00 – 00:25`

#### 📺 On Screen
- Animated title card (dark background, glowing text):
  - **"AI-Powered Road Damage Detection System"**
  - Subtitle: *"Automated Pavement Defect Classification using YOLOv8"*
  - Group ID: G-1111 | CSE-AIML | KMIT, Hyderabad | 2025-26
  - Team members' names listed below
  - KMIT logo (if available)

#### 🎙️ Narration Script
> *"Welcome to the demonstration of our final year project — the AI-Powered Road Damage Detection System, developed by Group G-1111 from the Department of CSE Artificial Intelligence and Machine Learning at Keshav Memorial Institute of Technology, Hyderabad.*  
> *This system leverages the power of YOLOv8, a state-of-the-art deep learning model, to automatically detect and classify road damage from citizen-submitted photographs — making road maintenance smarter, faster, and more transparent."*

#### 🎥 Recording Instructions
- Create a simple animated title card in Canva or PowerPoint and record it as a screen capture
- Alternatively, record an OBS scene with a static image and text overlay
- Add a subtle zoom-in animation on the title text
- Transition: Fade to black → Scene 2

---

### Scene 2 — Landing Page Walkthrough
**⏱ Timestamp:** `00:25 – 00:55`

#### 📺 On Screen
- Browser at `http://localhost:5173` (or deployed URL)
- The app's landing/home page fully visible
- Slowly scroll down to show the full page content
- Highlight the navigation bar items: Home, Report Damage, My Reports, Community Map

#### 🎙️ Narration Script
> *"This is the citizen-facing web application built with React and Vite.js. The landing page provides a clear overview of the system's purpose — helping citizens report road damage directly from their browser.*  
> *At the top, you can see the main navigation bar, which gives access to all key features: Report Damage, My Reports, the Community Map, and the Admin Dashboard.*  
> *The interface is designed to be intuitive and accessible, requiring no technical knowledge from the user."*

#### 🎥 Recording Instructions
- Open the React frontend in Chrome (no extensions visible)
- Use mouse cursor highlighter plugin (e.g., "Mouse Spotlight" OBS plugin)
- Scroll slowly — pause for 2 seconds on each navigation item
- Zoom in slightly on the nav bar using OBS zoom filter
- Transition: Smooth slide to Scene 3

---

### Scene 3 — Report Damage Form Fill
**⏱ Timestamp:** `00:55 – 01:40`

#### 📺 On Screen
- Click on **"Report Damage"** in the navbar
- The report damage form appears
- Slowly fill in each field:
  - Name: *"Ravi Kumar"*
  - Location: *"MG Road, Hyderabad"*
  - Description: *"Large pothole near traffic signal — vehicle damage risk"*
  - Upload image: Select a pre-prepared sample road damage photo (pothole image)
- Show the file preview appearing after upload
- Click the **"Submit Report"** button
- Show the loading/processing spinner

#### 🎙️ Narration Script
> *"To report road damage, a citizen simply clicks on 'Report Damage' in the navigation menu.*  
> *They fill in their name and the damage location — here we're entering MG Road, Hyderabad. They then describe the damage in their own words and upload a photograph taken from their smartphone.*  
> *Notice how the image preview appears immediately after selection, confirming the file has been picked up correctly.*  
> *Once all details are filled in, the citizen clicks 'Submit Report', and the image is sent to our FastAPI backend for AI processing."*

#### 🎥 Recording Instructions
- Pre-prepare a sample road damage JPG image (pothole from RDD2022 dataset samples)
- Type form fields slowly — do not rush
- Pause 1 second on each field after filling it
- Zoom in (OBS) on the file upload area when selecting the image
- Keep the spinner visible for at least 2 seconds before cutting
- Transition: Cut directly to Scene 4

---

### Scene 4 — AI Inference Result Display
**⏱ Timestamp:** `01:40 – 02:20`

#### 📺 On Screen
- The result card/section appears after submission
- Show the **annotated output image** with YOLOv8 bounding boxes drawn around detected damage
- Highlight detection labels: class name (e.g., "D40 - Pothole"), confidence score (e.g., "87.3%")
- Show the **Severity Score** displayed prominently (e.g., "HIGH")
- Show the damage class name and a brief description panel
- Zoom in on the annotated bounding box region

#### 🎙️ Narration Script
> *"Within less than a second, our YOLOv8 Medium model analyzes the uploaded image and returns a fully annotated result.*  
> *You can see the green bounding box drawn precisely around the detected pothole, labeled 'D40 — Pothole' with a confidence score of 87.3%.*  
> *The system automatically computes a Severity Score — in this case, HIGH — based on the damage class and detection confidence. This severity score directly informs how urgently municipal authorities should prioritize this repair.*  
> *The report is simultaneously saved to the database and made available for admin review."*

#### 🎥 Recording Instructions
- Zoom in (70% crop) on the annotated result image using OBS
- Move the mouse slowly over the bounding box to highlight it
- Keep result screen visible for at least 5 seconds
- Add a text overlay callout: "94.5% Accuracy Model"
- Transition: Fade → Scene 5

---

### Scene 5 — My Reports Tracking Page
**⏱ Timestamp:** `02:20 – 02:50`

#### 📺 On Screen
- Click **"My Reports"** in the navbar
- A list/table of submitted reports appears
- Each report row shows: Location, Damage Type, Severity, Status badge (Pending/In Progress/Fixed), Date
- Hover over different status badges to demonstrate color coding:
  - 🔴 Pending
  - 🟡 In Progress
  - 🟢 Fixed
- Click one report to expand/view full details

#### 🎙️ Narration Script
> *"Citizens can view all their previously submitted reports by clicking 'My Reports'.*  
> *Each report displays the location, detected damage type, severity level, and — most importantly — the current repair status.*  
> *Reports progress through three stages: Pending, In Progress, and Fixed — shown clearly with color-coded badges.*  
> *This transparency ensures citizens are always informed about whether their reported damage is being addressed by the municipal authorities."*

#### 🎥 Recording Instructions
- Have at least 3-4 pre-seeded reports with different statuses in the database
- Hover slowly over each status badge — 2 seconds per badge
- Click to expand one report and show full detail view
- Zoom in on the status column
- Transition: Slide → Scene 6

---

### Scene 6 — Community Map
**⏱ Timestamp:** `02:50 – 03:15`

#### 📺 On Screen
- Click **"Community Map"** in the navbar
- Interactive Leaflet.js map loads showing Hyderabad area
- Several map markers visible across the city representing reported damages
- Click one marker to show its popup: Location, Damage Type, Severity, Status
- Pan and zoom the map to show multiple clusters

#### 🎙️ Narration Script
> *"The Community Map is one of the most powerful features of the system — it provides a real-time geospatial view of all reported road damages across the city.*  
> *Each marker on the map represents a citizen report. Clicking on a marker reveals the damage type, severity, and current repair status.*  
> *This visualization helps both citizens and urban planners identify high-frequency damage zones and make data-driven infrastructure investment decisions."*

#### 🎥 Recording Instructions
- Ensure the map has at least 5 markers pre-loaded
- Zoom into a cluster of markers to show density
- Click 2 different markers to show their popups
- Pan the map smoothly using click-drag
- Transition: Fade → Scene 7

---

### Scene 7 — Admin Dashboard Statistics
**⏱ Timestamp:** `03:15 – 03:45`

#### 📺 On Screen
- Navigate to **Admin Dashboard** (separate URL or admin login)
- Show the dashboard overview with stat cards:
  - Total Reports: e.g., 47
  - Pending: 18 | In Progress: 12 | Fixed: 17
- Show a table of all reports with filter/sort options
- Briefly show damage type distribution (bar chart or pie chart if implemented)
- Highlight the priority queue of HIGH/CRITICAL severity reports at the top

#### 🎙️ Narration Script
> *"The Admin Dashboard gives municipal authorities a comprehensive, bird's-eye view of all incoming reports.*  
> *At the top, summary statistics immediately show the total number of reports, along with the breakdown by status — Pending, In Progress, and Fixed.*  
> *The reports table below allows admins to filter by damage class, severity, or location, and sort by date to identify the most urgent repairs.*  
> *High and Critical severity reports are automatically highlighted, ensuring the most dangerous road conditions receive immediate attention."*

#### 🎥 Recording Instructions
- Pre-populate the database with at least 15–20 reports across multiple statuses and classes
- Scroll slowly through the reports table
- Click the filter/sort controls to demonstrate them
- Zoom in on the stat cards at the top
- Transition: Cut → Scene 8

---

### Scene 8 — Mark as Fixed with Photo
**⏱ Timestamp:** `03:45 – 04:10`

#### 📺 On Screen
- In the Admin Dashboard, click on a **"Pending"** or **"In Progress"** report
- Show the report detail view
- Change the status dropdown from "In Progress" → **"Fixed"**
- Upload a **resolution photo** (image of repaired road)
- Click **"Save Changes"** / **"Update Status"**
- Show a success notification/toast message
- Return to the reports list — the report now shows ✅ Fixed badge

#### 🎙️ Narration Script
> *"When a road repair has been completed, an administrator can open the report and mark it as Fixed.*  
> *They can upload a resolution photograph showing the repaired road surface — providing photographic evidence of the completed work and full transparency to the citizen who filed the report.*  
> *After saving, the report status is immediately updated in the database and the citizen can see the 'Fixed' status on their My Reports page.*  
> *This closes the complete lifecycle loop: from damage detection to resolution."*

#### 🎥 Recording Instructions
- Prepare a "repaired road" sample image for the resolution photo upload
- Pause 2 seconds after each interaction (dropdown change, file upload, save click)
- Zoom in on the success toast notification
- Show the reports list refresh with the updated Fixed badge
- Transition: Fade to black → Scene 9

---

### Scene 9 — Closing Summary
**⏱ Timestamp:** `04:10 – 04:30`

#### 📺 On Screen
- Return to the animated title card (or a summary slide)
- Display key achievement metrics:
  - ✅ 94.5% Model Accuracy
  - ✅ 4 Damage Classes Detected
  - ✅ Real-time AI Inference
  - ✅ Full Lifecycle Tracking
  - ✅ Interactive Community Map
- Team names and Group ID G-1111 displayed
- KMIT branding in footer

#### 🎙️ Narration Script
> *"The AI-Powered Road Damage Detection System demonstrates how deep learning can be meaningfully integrated into public infrastructure management.*  
> *Our YOLOv8 Medium model, trained on the RDD2022 dataset, achieves 94.5% accuracy across four damage categories — making it production-ready for real-world deployment.*  
> *From citizen damage reporting to AI inference, severity scoring, community mapping, and municipal resolution tracking — the system covers the complete road maintenance workflow.*  
> *Thank you for watching this demonstration. This project was developed by Group G-1111, CSE-AIML, at Keshav Memorial Institute of Technology, Hyderabad, under the guidance of Ms. Padhmaja."*

#### 🎥 Recording Instructions
- Fade in the summary slide from black
- Keep each metric bullet visible for 1.5 seconds (animate them in one by one)
- Hold final frame for 3 seconds before fade to black
- Add outro music fade-out

---

## 🎛️ Recording Tips & Technical Guidelines

### Software Recommendations
| Tool | Purpose |
|---|---|
| **OBS Studio** (free) | Primary screen recording software |
| **DaVinci Resolve** (free) | Video editing, color grading, captions |
| **CapCut Desktop** | Quick editing with auto-captions |
| **Audacity** | Audio cleanup / noise reduction |

### OBS Studio Settings
```
Video Settings:
  - Base Resolution: 1920 × 1080
  - Output Resolution: 1920 × 1080
  - FPS: 60

Output Settings:
  - Encoder: x264 (or NVIDIA NVENC if GPU available)
  - Rate Control: CRF
  - CRF Value: 18 (high quality)
  - Preset: veryfast

Audio Settings:
  - Sample Rate: 48 kHz
  - Channels: Stereo

File Format: MP4 (H.264)
```

### Recording Checklist
- [ ] Browser: Chrome, full screen, no extensions bar visible
- [ ] Database pre-seeded with 15+ sample reports across all statuses
- [ ] Sample damage images prepared (D00, D10, D20, D40 one each)
- [ ] Resolution photo prepared for Scene 8
- [ ] Background music track downloaded and loaded in OBS (20% volume)
- [ ] Microphone tested — no echo, no background noise
- [ ] Mouse cursor highlighter enabled
- [ ] All browser tabs hidden except the application tab

### Post-Production Checklist
- [ ] Add captions/subtitles for each scene (accessibility)
- [ ] Add lower-third text: Team Name | Group G-1111 | KMIT
- [ ] Add scene title overlays (e.g., "Scene 3: Report Damage Form")
- [ ] Color grade: slightly warmer tones for professional look
- [ ] Export: MP4, H.264, 1080p, ~50–80 Mbps bitrate
- [ ] Final file name: `G1111_AIPRDD_Demo_Video.mp4`
- [ ] Upload to Google Drive: `08_Demo_Video/` folder
