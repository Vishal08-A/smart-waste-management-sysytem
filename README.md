# Smart Waste Hybrid System

A production-ready end-to-end smart waste management system combining YOLO detection, CNN classification, LSTM prediction, Node.js backend, React dashboard, digital twin simulation, IoT integration, and Docker deployment.

## Quick Start

```bash
# Clone & Install
git clone <repo>
cd smart-waste-hybrid-system

# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm start

# AI Models (train once)
cd ai-engine
pip install -r requirements.txt
python train_yolo.py
python train_cnn.py
python train_lstm.py

# Full Deployment
docker-compose up
```

## Structure

```
smart-waste-hybrid-system/
├── ai-engine/          # YOLO + CNN + LSTM
├── backend/            # Node.js API + MongoDB
├── digital-twin/       # Python simulation
├── frontend/           # React dashboard
├── iot-module/         # ESP32 firmware
├── simulation-3d/      # Three.js twin
├── docker-compose.yml
└── README.md
```

## 🛠️ Technologies

- **AI**: PyTorch, Ultralytics YOLOv8
- **Backend**: Node.js, Express, Mongoose
- **Frontend**: React, Axios, Chart.js
- **Database**: MongoDB
- **Simulation**: Three.js, Python
- **IoT**: ESP32 Arduino
- **Deployment**: Docker Compose

## Features

- Real-time waste detection & classification
- Fill-level prediction with LSTM
- Digital twin simulation
- Route optimization alerts
- Responsive dashboard
- Production-ready deployment

## API Endpoints

```
GET  /api/waste           # All bins status
POST /api/waste           # Update bin data
GET  /api/alerts          # Active alerts
```

See `backend/routes/` for full API.

---
Built with for smart cities.

