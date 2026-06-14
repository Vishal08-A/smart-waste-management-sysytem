const express = require('express');
const router = express.Router();
const Bin = require('../models/Bin');
const alertController = require('../controllers/alertController');

// Routes
router.get('/', alertController.getAlerts);

module.exports = router;

