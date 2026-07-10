# Demo Video Script: SafePath AI (Phase 3)

**Project:** SafePath AI — Road Condition-Aware Navigation System  
**Group ID:** G-1111  
**Estimated Length:** ~4 minutes  

---

### Scene 1: Title Card & Introduction
* **Timestamp:** 0:00 - 0:25
* **Visuals:** Full screen presentation title card showing "SafePath AI - Phase 3", Team Members, Mentor, and KMIT branding.
* **Narration:** "Welcome to the demonstration of SafePath AI, Phase 3 of our AI-Powered Road Damage Detection ecosystem. While standard GPS apps optimize for speed or distance, our system optimizes for safety by actively routing vehicles around detected road hazards. I am [Your Name] from Group G-1111, KMIT, and I will be walking you through the platform today."
* **Action:** Keep the title card on screen for 10 seconds, then transition to the Citizen App.

### Scene 2: Citizen App Landing & Interactive Map
* **Timestamp:** 0:25 - 0:55
* **Visuals:** Browser window showing the React-based Citizen App. The screen displays an interactive Leaflet map populated with color-coded hazard markers (yellow, orange, red, crimson).
* **Narration:** "This is the Citizen Portal. The core of the interface is our interactive Leaflet map, which visualizes road condition data in real-time. Each marker represents a hazard detected by our YOLOv8 AI or reported by a citizen. Notice the color-coding: red and crimson indicate severe damage, such as deep potholes, while yellow indicates minor cracking."
* **Action:** Pan and zoom the map slightly. Hover over or click a marker to show the tooltip with hazard details (type and severity).

### Scene 3: Reporting a New Hazard
* **Timestamp:** 0:55 - 1:30
* **Visuals:** Click the "Report Damage" button. Fill out the form, upload a sample pothole image, and submit.
* **Narration:** "Let's submit a new report. A citizen encounters a pothole, snaps a photo, and uploads it via the portal. On the backend, our FastAPI server processes the image through the YOLOv8 model for immediate classification and severity scoring. Perceptual hashing is also applied to prevent duplicate or fraudulent reports. Once verified, the hazard instantly appears on the live map via WebSocket broadcast."
* **Action:** Show the form submission, the success notification, and the new marker appearing on the map.

### Scene 4: Requesting a Safe Route
* **Timestamp:** 1:30 - 2:05
* **Visuals:** Open the Navigation panel. Enter a Start location and a Destination. Select "BIKE" as the vehicle type and "SAFEST" as the route mode. Click "Calculate Route".
* **Narration:** "Now, let's see the routing engine in action. I'll input a start and end destination. Standard GPS would just draw a straight line or the fastest path. However, our system asks for the vehicle type. I'll select 'Bike' and choose the 'Safest' routing mode. Our backend uses a custom A* pathfinding algorithm on a NetworkX graph, utilizing KD-Trees for rapid spatial lookups. It applies a severe penalty to road segments containing hazards, especially for vulnerable vehicles like bikes."
* **Action:** Type the locations, use the dropdowns to select Bike and Safest, and hit calculate. The map draws a blue route that explicitly detours around a cluster of red markers.

### Scene 5: Route Results & Metrics Analysis
* **Timestamp:** 2:05 - 2:40
* **Visuals:** Focus on the route summary panel showing the calculated metrics (Road Quality Score, Suspension Index, Estimated Wear Cost).
* **Narration:** "The route is generated in under 500 milliseconds. Notice how the path actively avoids the severe pothole cluster. The system provides actionable metrics for this specific route: a Road Quality Score, a Suspension Safety Index of 92%, and an Estimated Wear Cost in INR. It also generates turn-by-turn navigation instructions, projecting the raw GPS coordinates smoothly onto the OSM road network."
* **Action:** Scroll through the route metrics panel and briefly show the turn-by-turn instructions list.

### Scene 6: Comparing Route Modes & Vehicle Profiles
* **Timestamp:** 2:40 - 3:10
* **Visuals:** Change the vehicle type to "TRUCK" and the mode to "FASTEST". Recalculate the route.
* **Narration:** "To demonstrate the dynamic penalty formula, let's change the vehicle to a Truck and the mode to Fastest. Since trucks have larger tires and robust suspensions, our system assigns them a lower vulnerability multiplier (0.4x compared to the Bike's 3.0x). You can see the new route is more direct, accepting minor road damage to prioritize speed, while still avoiding critical D40 hazards."
* **Action:** Show the route changing on the map to a more direct path, and highlight the altered metrics in the summary panel.

### Scene 7: Government Dashboard & Command Center
* **Timestamp:** 3:10 - 3:40
* **Visuals:** Switch to a new browser tab showing the React-based Government Dashboard.
* **Narration:** "Switching over to the Government Command Center, municipal authorities have a high-level view of city infrastructure. Here, hazards are automatically sorted into a Priority Queue based on AI severity and traffic density. The dashboard includes SLA monitoring to flag repairs that are overdue, and a Repair Route Optimizer that calculates the most efficient path for maintenance crews to fix multiple potholes in one trip."
* **Action:** Scroll through the dashboard metrics, click on the Priority Queue, and briefly show the Repair Crew routing view.

### Scene 8: Road Health Heatmap
* **Timestamp:** 3:40 - 4:00
* **Visuals:** Click on the "Heatmap" or "Analytics" view in the Gov Dashboard.
* **Narration:** "For long-term planning, the system generates a dynamic Road Health Heatmap. By clustering damage reports geographically, authorities can identify rapidly deteriorating zones—like this red cluster here—and allocate infrastructure budgets more effectively before minor cracks become major safety hazards."
* **Action:** Show the heatmap overlay on the map, pointing out a high-density red zone.

### Scene 9: Closing & Conclusion
* **Timestamp:** 4:00 - 4:20
* **Visuals:** Return to the presentation title slide or a "Thank You" slide with team details.
* **Narration:** "In conclusion, SafePath AI transforms reactive road maintenance into a proactive, safety-first navigation ecosystem. By leveraging YOLOv8, spatial database analysis, and dynamic graph routing, we ensure that commuters reach their destinations safely. Thank you for watching our demonstration."
* **Action:** Fade to black.

---

### Recording Tips
* **Software:** Use OBS Studio (Free, Open Source) or Windows Game Bar (`Win + G`).
* **Resolution:** Record in 1080p (1920x1080) at 30fps or 60fps for smooth map panning.
* **Audio:** Record in a quiet room. You can read the script live as you record, or record the screen first and do a voiceover later using DaVinci Resolve or Clipchamp.
* **Preparation:** Have both the Citizen App and Government Dashboard open in separate tabs before you start recording to ensure smooth transitions. Ensure your local backend server (`python main.py`) is running without errors.
