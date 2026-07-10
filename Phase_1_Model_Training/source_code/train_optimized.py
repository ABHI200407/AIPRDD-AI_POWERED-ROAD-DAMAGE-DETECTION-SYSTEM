import os
import shutil
import random
import yaml
from pathlib import Path
from ultralytics import YOLO
import torch
from ultralytics.nn.tasks import DetectionModel
from torch.nn import Sequential

# Fix for PyTorch 2.6 security loading issue
torch.serialization.add_safe_globals([DetectionModel, Sequential])

# ── Config ──────────────────────────────────────────────────────────────────
SRC_LABELS   = Path("dataset/RDD_SPLIT/test/labels")
DATASET_ROOT = Path("dataset/yolo_dataset")
TRAIN_LIST   = DATASET_ROOT / "train.txt"
VAL_LIST     = DATASET_ROOT / "val.txt"
TEST_LIST    = DATASET_ROOT / "test.txt"

NEW_DATA_YAML = DATASET_ROOT / "pothole_aware_data_v2.yaml"
MODEL_PT      = "yolov8m.pt" 
EPOCHS        = 100          # 100 Epochs for deep robust features
IMGSZ         = 640
BATCH         = 16           
OVERSAMPLE_FACTOR = 5        

def create_oversampled_list():
    if not TRAIN_LIST.exists():
        print(f"Error: Base training list {TRAIN_LIST} not found.")
        return None

    print(f"Starting targeted oversampling of pothole images...")
    with open(TRAIN_LIST, 'r') as f:
        original_train_imgs = [line.strip() for line in f.readlines() if line.strip()]

    oversampled_list = []
    
    for img_path_str in original_train_imgs:
        img_path = Path(img_path_str)
        # Find corresponding label file in val or train...
        # fallback string replace
        label_path_str = img_path_str.replace('images', 'labels').replace('.jpg', '.txt')
        label_path = Path(label_path_str)
        
        has_pothole = False
        if label_path.exists():
            with open(label_path, 'r') as f:
                content = f.read()
                if '3 ' in content: # Class 3 is Pothole
                    has_pothole = True
        
        # Add original
        oversampled_list.append(img_path_str)
        
        # If pothole, add multiple times to avoid false negatives
        if has_pothole:
            for _ in range(OVERSAMPLE_FACTOR - 1):
                oversampled_list.append(img_path_str)

    random.shuffle(oversampled_list)
    new_train_list = DATASET_ROOT / "train_oversampled_v2.txt"
    with open(new_train_list, 'w') as f:
        for item in oversampled_list:
            f.write(item + "\n")
            
    return str(new_train_list.resolve())

def setup_data_yaml(train_list_path):
    classes = {0: "D00", 1: "D10", 2: "D20", 3: "D40"}
    cfg = {
        "train": train_list_path,
        "val":   str(VAL_LIST.resolve()),
        "test":  str(TEST_LIST.resolve()),
        "nc":    4,
        "names": list(classes.values()),
    }
    with open(NEW_DATA_YAML, "w") as f:
        yaml.dump(cfg, f, default_flow_style=False, sort_keys=False)
    return str(NEW_DATA_YAML.resolve())

def run_training(yaml_path):
    print("\n" + "="*55)
    print(f"  Starting Optimized YOLOv8 Training (100 Epochs, SGD, Heavy Augmentation)")
    print("="*55)
    
    model = YOLO(MODEL_PT)
    
    results = model.train(
        data=yaml_path,
        epochs=EPOCHS,
        imgsz=IMGSZ,
        batch=BATCH,
        project="road_damage_improvement",
        name="opt_100ep_sgd",
        device=0,            
        exist_ok=True,
        patience=20,         
        save=True,
        plots=True,
        
        # Guide.txt Optimizer Settings
        optimizer='SGD',
        lr0=0.01,
        lrf=0.01,
        momentum=0.937,
        weight_decay=0.0005,
        
        # Guide.txt Augmentations
        hsv_h=0.015,
        hsv_s=0.7,
        hsv_v=0.4,
        degrees=10,
        translate=0.1,
        scale=0.5,
        flipud=0.0,
        fliplr=0.5,
        mosaic=1.0,
        
        # Custom Hyperparameters
        box=7.5,
        cls=0.5,
        dfl=1.5,
        cos_lr=True,
        label_smoothing=0.1
    )
    
    print(f"\nTraining complete. Model saved in road_damage_improvement/opt_100ep_sgd")
    return results

if __name__ == "__main__":
    train_list = create_oversampled_list()
    if train_list:
        yaml_path = setup_data_yaml(train_list)
        run_training(yaml_path)
