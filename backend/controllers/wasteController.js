const Bin = require('../models/Bin');

// Get all bins
const getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find().sort({ timestamp: -1 });
    res.json(bins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bin by ID
const getBinById = async (req, res) => {
  try {
    const bin = await Bin.findOne({ bin_id: req.params.id });
    if (!bin) return res.status(404).json({ message: 'Bin not found' });
    res.json(bin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update bin
const updateBin = async (req, res) => {
  try {
    const bin = await Bin.findOne({ bin_id: req.params.id });
    if (!bin) return res.status(404).json({ message: 'Bin not found' });

    Object.assign(bin, req.body);
    await bin.save();
    res.json(bin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Create bin (POST)
const createBin = async (req, res) => {
  const { bin_id, fill_level, waste_type, confidence, predicted_fill, location } = req.body;
  
  // Alert logic
  let alert = null;
  if (fill_level > 75) {
    alert = 'Bin almost full - dispatch collection';
  } else if (predicted_fill && predicted_fill > 80) {
    alert = 'Predicted overflow soon';
  }
  
  try {
    let bin = await Bin.findOne({ bin_id });
    if (bin) {
      return res.status(409).json({ message: 'Bin exists, use PUT to update' });
    }
    bin = new Bin({ bin_id, fill_level, waste_type, confidence, predicted_fill, location, alert });
    await bin.save();
    res.status(201).json(bin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete bin
const deleteBin = async (req, res) => {
  try {
    await Bin.deleteOne({ bin_id: req.params.id });
    res.json({ message: 'Bin deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBins,
  getBinById,
  createBin,
  updateBin,
  deleteBin
};


