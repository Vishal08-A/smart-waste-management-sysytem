const Bin = require('../models/Bin');

const getAlerts = async (req, res) => {
  try {
    const alerts = await Bin.find({
      $or: [
        { fill_level: { $gt: 75 } },
        { predicted_fill: { $gt: 80 } }
      ]
    }).sort({ timestamp: -1 });
    
    res.json({
      alerts,
      count: alerts.length,
      critical: alerts.filter(a => a.fill_level > 90).length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAlerts };

