const mongoose = require('mongoose');

const binSchema = new mongoose.Schema({
  bin_id: {
    type: String,
    required: true,
    unique: true
  },
  fill_level: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  waste_type: {
    type: String,
    enum: ['ewaste', 'metal', 'bio', 'general']
  },
  confidence: {
    type: Number,
    min: 0,
    max: 1
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  predicted_fill: {
    type: Number
  },
  location: {
    lat: Number,
    lng: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bin', binSchema);

