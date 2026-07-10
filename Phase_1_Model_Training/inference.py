import argparse
from ultralytics import YOLO
from pathlib import Path

def run_inference(image_path, model_path='best.pt'):
    # Load the model
    print(f"Loading model from {model_path}...")
    model = YOLO(model_path)
    
    # Run prediction
    print(f"Running inference on {image_path}...")
    results = model.predict(source=image_path, save=True, conf=0.25)
    
    # Show results info
    for result in results:
        boxes = result.boxes
        print(f"\nFound {len(boxes)} detections:")
        for box in boxes:
            cls = int(box.cls[0])
            conf = float(box.conf[0])
            name = model.names[cls]
            print(f"  - {name}: {conf:.2f}")
            
    print(f"\nResults saved to: {results[0].save_dir}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Road Damage Detection Inference Script")
    parser.add_argument("--source", type=str, required=True, help="Path to image or folder")
    parser.add_argument("--model", type=str, default="best.pt", help="Path to weights file")
    
    args = parser.parse_args()
    
    if not Path(args.source).exists():
        print(f"Error: Source path '{args.source}' does not exist.")
    else:
        run_inference(args.source, args.model)
