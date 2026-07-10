from ultralytics import YOLO
from pathlib import Path
import os

# Load model once at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best.pt")
model = None

def get_damage_severity(image_path):
    """
    Real inference function using YOLOv8.
    """
    global model
    if model is None:
        if not os.path.exists(MODEL_PATH):
            print(f"ERROR: Model file not found at {MODEL_PATH}")
            # Fallback to mock for testing if file missing
            return {"score": 0.0, "level": "error", "type": "Model Missing"}
        model = YOLO(MODEL_PATH)

    # Run prediction
    results = model.predict(source=image_path, conf=0.25, save=False)
    
    if not results or len(results[0].boxes) == 0:
        return {
            "score": 0.0,
            "level": "low",
            "type": "No Damage Detected"
        }
    
    # Process detections
    # We'll take the highest confidence detection for the overall report
    top_box = None
    max_conf = -1
    
    for box in results[0].boxes:
        conf = float(box.conf[0])
        if conf > max_conf:
            max_conf = conf
            top_box = box
            
    cls = int(top_box.cls[0])
    conf = float(top_box.conf[0])
    raw_name = model.names[cls]
    
    # Map RDD class names to human readable names
    class_map = {
        "D00": "Longitudinal Crack",
        "D10": "Transverse Crack",
        "D20": "Alligator Crack",
        "D40": "Pothole",
        "D44": "Manhole / Deep Hole",
        "D01": "Longitudinal Crack",
        "D11": "Transverse Crack"
    }
    name = class_map.get(raw_name, raw_name)
    
    # Determine level based on confidence or class (here we use confidence for level)
    if conf >= 0.7:
        level = "high"
    elif conf >= 0.4:
        level = "med"
    else:
        level = "low"
        
    return {
        "score": round(conf, 2),
        "level": level,
        "type": name
    }
