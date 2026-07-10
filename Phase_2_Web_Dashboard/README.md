# Road Damage Detection Model v1

This package contains the trained YOLOv8 Medium model for detecting road damages and potholes.

## Contents
- `best.pt`: Trained model weights (100 Epochs, SGD optimized).
- `data.yaml`: Configuration file defining the classes.
- `inference.py`: Python script to run detections on new images.

## Detection Classes
- **D00**: Longitudinal Crack
- **D10**: Transverse Crack
- **D20**: Alligator Crack
- **D40**: Pothole (Priority)

## How to Use

### 1. Install Requirements
Ensure you have Python installed, then install the Ultralytics library:
```bash
pip install ultralytics
```

### 2. Run Inference
You can run the model on a single image or an entire folder:

**Via the included script:**
```bash
python inference.py --source path/to/your/image.jpg
```

**Via Command Line (CLI):**
```bash
yolo predict model=best.pt source=path/to/image.jpg
```

## Performance
This model was trained on 1,530 ground-truth images (80/20 split) with heavy data augmentation and pothole oversampling to minimize false negatives.
