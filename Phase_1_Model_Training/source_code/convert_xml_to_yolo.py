import os
import xml.etree.ElementTree as ET
import shutil
from pathlib import Path
import random

# Configuration
XML_DIR = Path('dataset/rdd_gt/train/annotations/xmls')
IMAGE_DIR = Path('dataset/rdd_gt/train/images')
OUTPUT_DIR = Path('dataset/yolo_ground_truth')
TRAIN_RATIO = 0.8

# Class mapping (as per data.yaml)
CLASS_MAPPING = {
    'D00': 0,
    'D10': 1,
    'D20': 2,
    'D40': 3
}

def convert_box(size, box):
    dw = 1. / size[0]
    dh = 1. / size[1]
    x = (box[0] + box[1]) / 2.0
    y = (box[2] + box[3]) / 2.0
    w = box[1] - box[0]
    h = box[3] - box[2]
    return (x * dw, y * dh, w * dw, h * dh)

def process_xml(xml_path, output_label_path):
    tree = ET.parse(xml_path)
    root = tree.getroot()
    
    size = root.find('size')
    w = int(size.find('width').text)
    h = int(size.find('height').text)
    
    if w == 0 or h == 0:
        return False

    labels = []
    for obj in root.iter('object'):
        name = obj.find('name').text
        if name not in CLASS_MAPPING:
            continue
        
        cls_id = CLASS_MAPPING[name]
        xmlbox = obj.find('bndbox')
        b = (float(xmlbox.find('xmin').text), float(xmlbox.find('xmax').text), 
             float(xmlbox.find('ymin').text), float(xmlbox.find('ymax').text))
        bb = convert_box((w, h), b)
        labels.append(f"{cls_id} {' '.join([f'{a:.6f}' for a in bb])}")
    
    if not labels:
        return False
        
    with open(output_label_path, 'w') as f:
        f.write('\n'.join(labels))
    return True

def main():
    # Create directories
    for split in ['train', 'val']:
        (OUTPUT_DIR / split / 'images').mkdir(parents=True, exist_ok=True)
        (OUTPUT_DIR / split / 'labels').mkdir(parents=True, exist_ok=True)
    
    xml_files = list(XML_DIR.glob('*.xml'))
    random.shuffle(xml_files)
    
    split_idx = int(len(xml_files) * TRAIN_RATIO)
    train_xmls = xml_files[:split_idx]
    val_xmls = xml_files[split_idx:]
    
    counts = {'train': 0, 'val': 0}
    
    for split, xmls in [('train', train_xmls), ('val', val_xmls)]:
        print(f"Processing {split} split...")
        for xml_path in xmls:
            img_name = xml_path.stem + '.jpg'
            img_path = IMAGE_DIR / img_name
            
            if not img_path.exists():
                # Try .png or others if needed, but RDD is usually .jpg
                img_name = xml_path.stem + '.png'
                img_path = IMAGE_DIR / img_name
                if not img_path.exists():
                    continue
            
            label_path = OUTPUT_DIR / split / 'labels' / (xml_path.stem + '.txt')
            if process_xml(xml_path, label_path):
                # Copy image
                shutil.copy(img_path, OUTPUT_DIR / split / 'images' / img_path.name)
                counts[split] += 1
                
    print(f"Done! Train: {counts['train']}, Val: {counts['val']}")

if __name__ == '__main__':
    main()
