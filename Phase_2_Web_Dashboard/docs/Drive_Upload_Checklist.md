# Google Drive Upload Checklist
## AI-Powered Road Damage Detection System — Final Submission
**Group ID:** G-1111 | **Dept:** CSE-AIML | **KMIT, Hyderabad** | **Year:** 2025-2026

> [!IMPORTANT]
> **⏰ DEADLINE: End of Day — June 4, 2026**  
> Upload ALL files before 11:59 PM IST. Incomplete submissions will not be reviewed.

---

## 📁 Google Drive Folder Structure

Create the following **exact folder structure** under your shared Drive root:

```
G-1111_AI-Powered Road Damage Detection System/
│
├── 01_Source_Code/
│   ├── backend/
│   └── frontend/
│
├── 02_Documentation/
│   ├── SRS_Document.pdf
│   ├── SDLC_Document.pdf
│   ├── Viva_Masterbook.pdf
│   ├── Project_Report.html
│   └── Abstract_ExecutiveSummary.md
│
├── 03_Presentation/
│   └── Presentation_Slides.html
│
├── 04_Research_Paper/
│   └── WJARR-2025-2732.pdf
│
├── 05_Dataset_and_Samples/
│   └── inference_samples/
│       ├── sample_D00_longitudinal.jpg
│       ├── sample_D10_transverse.jpg
│       ├── sample_D20_alligator.jpg
│       └── sample_D40_pothole.jpg
│
├── 06_Trained_Model/
│   └── best.pt
│
├── 07_Poster/
│   └── Project_Poster.html
│
└── 08_Demo_Video/
    └── G1111_AIPRDD_Demo_Video.mp4   ← (Record and upload after filming)
```

---

## ✅ File Upload Checklist

### 📁 01_Source_Code/
- [ ] `01_Source_Code/backend/` — All Python backend files uploaded (main.py, models.py, routes/, etc.)
- [ ] `01_Source_Code/frontend/` — All React/Vite frontend files uploaded (src/, public/, package.json, vite.config.js, etc.)
- [ ] Verify `.env` files and `best.pt` are **NOT** accidentally included in source code folder (they go in 06_Trained_Model/)
- [ ] Verify `node_modules/` and `__pycache__/` are **excluded** from upload (too large, not needed)

### 📁 02_Documentation/
- [ ] `SRS_Document.pdf` — Software Requirements Specification uploaded
- [ ] `SDLC_Document.pdf` — SDLC/Project lifecycle document uploaded
- [ ] `Viva_Masterbook.pdf` — Viva preparation masterbook uploaded
- [ ] `Project_Report.html` — Full project report HTML uploaded
- [ ] `Abstract_ExecutiveSummary.md` — This abstract & executive summary file uploaded

### 📁 03_Presentation/
- [ ] `Presentation_Slides.html` — Project presentation HTML file uploaded
- [ ] Verify the presentation opens correctly in Chrome before uploading

### 📁 04_Research_Paper/
- [ ] `WJARR-2025-2732.pdf` — Published research paper (World Journal of Advanced Research) uploaded
- [ ] Verify the PDF is the **final published version**, not a draft

### 📁 05_Dataset_and_Samples/
- [ ] `inference_samples/sample_D00_longitudinal.jpg` — Sample D00 Longitudinal Crack test image
- [ ] `inference_samples/sample_D10_transverse.jpg` — Sample D10 Transverse Crack test image
- [ ] `inference_samples/sample_D20_alligator.jpg` — Sample D20 Alligator Crack test image
- [ ] `inference_samples/sample_D40_pothole.jpg` — Sample D40 Pothole test image
- [ ] Images are clear, representative, and correctly labeled

### 📁 06_Trained_Model/
- [ ] `best.pt` — YOLOv8 Medium trained model weights file uploaded
- [ ] Verify file size is reasonable (typically 25–50 MB for YOLOv8 Medium best.pt)
- [ ] Confirm this is the **final best.pt** (not last.pt or an intermediate checkpoint)

### 📁 07_Poster/
- [ ] `Project_Poster.html` — Conference poster HTML file uploaded
- [ ] Open `Project_Poster.html` in Chrome, use Ctrl+P → **Save as PDF** → upload PDF version alongside HTML
- [ ] `Project_Poster.pdf` — PDF version of the poster uploaded (printed from browser)

### 📁 08_Demo_Video/
- [ ] `G1111_AIPRDD_Demo_Video.mp4` — Demo video (3–5 min, 1080p, MP4 format) uploaded
- [ ] Verify video plays correctly before uploading
- [ ] ⚠️ **This is the last item** — record the demo video using the `Demo_Video_Script.md` guide

---

## 🖨️ How to Print HTML Files to PDF (for Documentation)

Use this method to convert any `.html` file to a professional PDF:

### Steps (Chrome Browser — Recommended)
1. Open the `.html` file in **Google Chrome** (drag and drop, or File → Open)
2. Press **`Ctrl + P`** (Windows) to open the Print dialog
3. In the **Destination** dropdown, select **"Save as PDF"**
4. Set the following options:
   - **Paper size:** A4 (for documents) or A1/A3 (for poster — select closest)
   - **Margins:** None (for poster) or Default (for documents)
   - **Scale:** 100% (or "Fit to Page" for poster)
   - ✅ Check **"Background graphics"** (very important — enables dark background colors)
5. Click **"Save"** and choose the `docs/` folder
6. Rename the file appropriately (e.g., `Project_Poster.pdf`)

> [!TIP]
> For the **Project Poster**, use **Landscape** orientation and **"Fit to page"** scale to get the best result. Always check "Background graphics" or the dark navy background will not appear in the PDF.

> [!NOTE]
> Microsoft Edge also works perfectly for HTML-to-PDF with the same Ctrl+P method. Firefox may render fonts slightly differently — prefer Chrome or Edge.

---

## 📋 Final Pre-Upload Verification

Before sharing the Google Drive link with your mentor/reviewer, run through these final checks:

- [ ] Root folder is named **exactly**: `G-1111_AI-Powered Road Damage Detection System`
- [ ] All 8 subfolders exist with the correct names (01_ through 08_ prefix)
- [ ] All files open correctly when clicked in Drive (no corruption)
- [ ] Drive sharing is set to **"Anyone with the link → Viewer"** (or as instructed by your dept.)
- [ ] Copy and share the Drive link with **Ms. Padhmaja** before EOD
- [ ] Send a confirmation message to your group WhatsApp confirming upload is complete

---

## 💡 Tips for Organizing the Drive Folder

1. **Use numbered prefixes** on all folders (01_, 02_, etc.) — this keeps them sorted in order automatically in Google Drive's name-sort view.

2. **Keep filenames professional** — use underscores instead of spaces, avoid lowercase-only names. Example: `Abstract_ExecutiveSummary.md` not `abstract exec summary.md`.

3. **Do not upload unnecessary files** — avoid uploading `node_modules/`, `__pycache__/`, `.git/`, `.env`, or virtual environment folders. These are very large and not needed by reviewers.

4. **Upload the demo video last** — since it takes the longest to record and export, complete all other uploads first so the folder is fully ready except for the video.

5. **Check file previews in Drive** — after uploading each file, click it in Drive to verify it previews correctly. PDFs and images should render in the browser; .md files will show raw text which is acceptable.

6. **Create a shortcut** — pin the root Drive folder to your browser bookmarks so you can return to it quickly when adding the demo video.

7. **Compress source code** if needed — if the source code is very large, zip `backend/` and `frontend/` separately before uploading. Name them `backend.zip` and `frontend.zip`.

---

## ⏰ Deadline Countdown

| Task | Deadline | Status |
|---|---|---|
| All documentation files uploaded | EOD June 4, 2026 | ⬜ Pending |
| Source code uploaded | EOD June 4, 2026 | ⬜ Pending |
| Trained model (best.pt) uploaded | EOD June 4, 2026 | ⬜ Pending |
| Research paper uploaded | EOD June 4, 2026 | ⬜ Pending |
| Poster (HTML + PDF) uploaded | EOD June 4, 2026 | ⬜ Pending |
| Demo video recorded & uploaded | EOD June 4, 2026 | ⬜ Pending |
| Drive link shared with Ms. Padhmaja | EOD June 4, 2026 | ⬜ Pending |

> [!CAUTION]
> **Do not wait until the last minute to upload the demo video.** Video files are large (500 MB – 2 GB) and Google Drive uploads can be slow on limited connections. Start recording as early as possible.

---

*Checklist prepared for Group G-1111 — CSE-AIML — KMIT, Hyderabad — RTRP Review-02 — June 2026*
