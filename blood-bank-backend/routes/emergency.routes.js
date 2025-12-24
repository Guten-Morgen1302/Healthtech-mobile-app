const express = require('express');
const router = express.Router();
const {
  createEmergencyBroadcast,
  getActiveEmergencies,
  respondToEmergency,
  getEmergencyById,
  updateEmergencyStatus
} = require('../controllers/emergencyController');
const isHospitalAuthenticated = require('../middleware/isHospitalAuthenticated');
const isAuthenticated = require('../middleware/isAuthenticated');

// Public routes
router.get('/active', getActiveEmergencies);
router.get('/:id', getEmergencyById);
router.post('/:id/respond', respondToEmergency);

// Hospital routes
router.post('/broadcast', isHospitalAuthenticated, createEmergencyBroadcast);

// Admin routes
router.put('/:id/status', isAuthenticated, updateEmergencyStatus);

module.exports = router;
