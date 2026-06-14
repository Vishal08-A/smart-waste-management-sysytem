import pandas as pd
import numpy as np
import torch
import torch.nn as nn
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt

# 1. Generate sample dataset (replace with real sensor data)
data = {
    'timestamp': pd.date_range(start='2024-01-01', periods=1000, freq='H'),
    'bin_id': 'BIN101',
    'fill_level': np.cumsum(np.random.normal(0.05, 0.02, 1000)) % 100
}
df = pd.DataFrame(data)

# Save dataset
df.to_csv('../datasets/bin_data.csv', index=False)
print('Dataset created: bin_data.csv')

# 2. Preprocess
values = df['fill_level'].values.reshape(-1, 1)
scaler = MinMaxScaler()
scaled_data = scaler.fit_transform(values)

def create_sequences(data, seq_length=10):
    X, y = [], []
    for i in range(len(data) - seq_length):
        X.append(data[i:i+seq_length])
        y.append(data[i+seq_length])
    return np.array(X), np.array(y)

X, y = create_sequences(scaled_data)
X = torch.tensor(X, dtype=torch.float32)
y = torch.tensor(y, dtype=torch.float32)

# 3. LSTM Model (from task)
class LSTMModel(nn.Module):
    def __init__(self, input_size=1, hidden_size=50, num_layers=2):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)
    
    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])

model = LSTMModel()
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# 4. Training
epochs = 100
losses = []
for epoch in range(epochs):
    model.train()
    output = model(X)
    loss = criterion(output, y)
    
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    losses.append(loss.item())
    if (epoch + 1) % 20 == 0:
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

# Plot loss
plt.plot(losses)
plt.title('LSTM Training Loss')
plt.savefig('lstm_loss.png')
plt.show()

# 5. Save model
torch.save(model.state_dict(), 'lstm_model.pth')
print('LSTM model saved: lstm_model.pth')

# 6. Test prediction
model.eval()
with torch.no_grad():
    test_input = X[-1].unsqueeze(0)
    pred = model(test_input)
    pred_fill = scaler.inverse_transform(pred.numpy())[0][0]
    print(f'Predicted next fill level: {pred_fill:.2f}%')

