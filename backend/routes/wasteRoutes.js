const express = require('express');
const router = express.Router();
const Bin = require('../models/Bin');
const wasteController = require('../controllers/wasteController');

// Routes
router.get('/', wasteController.getAllBins);
router.get('/:id', wasteController.getBinById);
router.post('/', wasteController.createBin);
router.put('/:id', wasteController.updateBin);
router.delete('/:id', wasteController.deleteBin);

module.exports = router;

