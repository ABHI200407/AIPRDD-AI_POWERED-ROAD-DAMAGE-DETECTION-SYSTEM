from ultralytics import YOLO
import os

def train_model():
    # Path to the Ground Truth data config
    DATA_YAML = 'gt_data.yaml'
    
    # Load YOLOv8 Medium model
    print("Loading YOLOv8 Medium model...")
    model = YOLO('yolov8m.pt')
    
    # Start training
    print("Starting training on Ground Truth dataset...")
    results = model.train(
        data=DATA_YAML,
        epochs=100,
        imgsz=640,
        batch=16,
        optimizer='SGD',
        lr0=0.01,
        cos_lr=True,
        mosaic=1.0,
        mixup=0.1,
        device=0,  # Use GPU 0
        project='runs/detect/ground_truth_retraining',
        name='yolov8m_gt_v1',
        exist_ok=True,
        patience=20, # Early stopping if no improvement
        save=True,
        verbose=True
    )
    
    print("Training complete!")
    print(f"Best model saved at: {results.save_dir}/weights/best.pt")

if __name__ == '__main__':
    train_model()
