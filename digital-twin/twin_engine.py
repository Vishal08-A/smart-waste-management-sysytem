import time
import random
from datetime import datetime

class DigitalTwin:
    def __init__(self):
        self.bins = {}
        self.predictions = {}
    
    def update_bin(self, bin_id, fill_level, waste_type='general'):
        self.bins[bin_id] = {
            'fill_level': fill_level,
            'waste_type': waste_type,
            'timestamp': datetime.now(),
            'status': 'normal' if fill_level < 75 else 'warning' if fill_level < 90 else 'critical'
        }
    
    def predict_fill(self, bin_id, model_path='lstm_model.pth'):
        # Simulate LSTM prediction
        current = self.bins.get(bin_id, {}).get('fill_level', 50)
        growth = random.uniform(0.5, 2.0)
        predicted = min(100, current + growth * random.randint(1, 24))  # Next 24h
        self.predictions[bin_id] = predicted
        return predicted
    
    def check_alerts(self):
        alerts = []
        for bin_id, data in self.bins.items():
            predicted = self.predict_fill(bin_id)
            if data['fill_level'] > 75 or predicted > 80:
                alerts.append({
                    'bin_id': bin_id,
                    'current': data['fill_level'],
                    'predicted': predicted,
                    'action': 'Schedule collection'
                })
        return alerts
    
    def optimize_routes(self, alerts):
        # Simple genetic algorithm placeholder
        if len(alerts) > 1:
            # Simulate route optimization
            return sorted(alerts, key=lambda x: x['predicted'], reverse=True)
        return alerts

# Simulation example
if __name__ == '__main__':
    twin = DigitalTwin()
    
    # Simulate updates
    for i in range(5):
        twin.update_bin(f'BIN{i+1:03d}', random.randint(20, 95))
        time.sleep(1)
    
    alerts = twin.check_alerts()
    print('Alerts:', alerts)
    print('Optimized routes:', twin.optimize_routes(alerts))

