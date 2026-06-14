import torch
import torch.nn as nn
import torch.nn.functional as F

class WasteCNN(nn.Module):
    def __init__(self, num_classes=4):
        super(WasteCNN, self).__init__()
        
        self.conv1 = nn.Conv2d(3, 16, 3, padding=1)
        self.conv2 = nn.Conv2d(16, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        
        self.fc1 = nn.Linear(32 * 56 * 56, 128)  # Adjust based on input size 224x224
        self.fc2 = nn.Linear(128, num_classes)
        
        self.classes = ['ewaste', 'metal', 'bio', 'general']
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 32 * 56 * 56)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

def hybrid_decision(yolo_class, yolo_conf, cnn_class, cnn_probs):
    """
    Hybrid decision logic
    """
    if yolo_conf > 0.85:
        return yolo_class
    else:
        pred = torch.argmax(cnn_probs)
        return WasteCNN().classes[pred]

# Example
if __name__ == '__main__':
    model = WasteCNN()
    dummy_input = torch.randn(1, 3, 224, 224)
    output = model(dummy_input)
    print(output.shape)

