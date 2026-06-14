from ultralytics import YOLO
import cv2
import numpy as np

class WasteDetector:
    def __init__(self, model_path='yolov8n.pt'):  # Use pretrained, replace with best.pt after training
        self.model = YOLO(model_path)
        self.classes = ['ewaste', 'metal', 'bio', 'general']

    def detect_waste(self, frame):
        """
        Detect waste type and confidence from image/frame
        """
        results = self.model(frame)
        
        detections = []
        for r in results:
            if r.boxes is not None:
                for box in r.boxes:
                    cls = int(box.cls[0])
                    confidence = float(box.conf[0])
                    x1, y1, x2, y2 = box.xyxy[0].tolist()
                    
                    detections.append({
                        'class': self.classes[cls] if cls < len(self.classes) else 'unknown',
                        'confidence': confidence,
                        'bbox': [x1, y1, x2, y2]
                    })
        
        # Return highest confidence detection
        if detections:
            best = max(detections, key=lambda x: x['confidence'])
            return best['class'], best['confidence']
        
        return 'unknown', 0.0

# Example usage
if __name__ == '__main__':
    detector = WasteDetector()
    frame = cv2.imread('sample_waste.jpg')  # Replace with camera feed
    waste_type, conf = detector.detect_waste(frame)
    print(f'Detected: {waste_type} ({conf:.2f})')

