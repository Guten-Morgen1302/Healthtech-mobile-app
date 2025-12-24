const express = require('express');
const router = express.Router();
const axios = require('axios');

// Blood Group Code Mapping for eRaktKosh API
const BLOOD_GROUP_CODES = {
  'A+': 11,
  'A-': 12,
  'B+': 13,
  'B-': 14,
  'O+': 15,
  'O-': 16,
  'AB+': 17,
  'AB-': 18
};

/**
 * GET /api/eraktkosh/nearby-blood-stock
 * Fetch nearby blood bank stock from eRaktKosh API
 * Query params: lat, long, bg (blood group like A+, O-, etc.)
 */
router.get('/nearby-blood-stock', async (req, res) => {
  try {
    const { lat, long, bg } = req.query;

    console.log('Blood Stock Request:', { lat, long, bg, rawQuery: req.url });

    if (!lat || !long || !bg) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: lat, long, bg',
        received: { lat, long, bg }
      });
    }

    // Normalize blood group (handle space that might come from decoded +)
    const normalizedBg = bg.replace(/\s+/g, '+').toUpperCase();
    const bgCode = BLOOD_GROUP_CODES[normalizedBg];
    
    if (!bgCode) {
      return res.status(400).json({
        success: false,
        message: `Invalid blood group: ${bg} (normalized: ${normalizedBg}). Valid options: ${Object.keys(BLOOD_GROUP_CODES).join(', ')}`,
        received: { original: bg, normalized: normalizedBg }
      });
    }

    const url = `https://www.eraktkosh.in/BLDAHIMS/bloodbank/nearbyBB.cnt?hmode=GETNEARBYSTOCK&lat=${lat}&long=${long}&bg=${bgCode}`;

    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Parse and normalize the response
    let bloodBanks = [];
    const data = response.data;

    if (Array.isArray(data)) {
      bloodBanks = data;
    } else if (typeof data === 'object') {
      for (const key of ['data', 'result', 'bloodBanks', 'records', 'nearbyBB']) {
        if (data[key] && Array.isArray(data[key])) {
          bloodBanks = data[key];
          break;
        }
      }
    }

    const normalizedData = bloodBanks.map((bb, index) => ({
      id: bb.id || index + 1,
      hospitalName: bb.hospitalName || bb.bbName || bb.name || bb.bloodBankName || 'Unknown Hospital',
      distance: bb.distance || bb.dist || bb.distanceKm || null,
      address: bb.address || bb.addr || bb.location || 'Address not available',
      contact: bb.contactNo || bb.contact || bb.phone || bb.mobile || 'N/A',
      component: bb.componentName || bb.bloodComponent || bb.component || 'Whole Blood',
      stock: bb.stock || bb.quantity || bb.units || bb.availableUnits || 'Available',
      latitude: bb.lat || bb.latitude || null,
      longitude: bb.lng || bb.long || bb.longitude || null
    }));

    res.json({
      success: true,
      count: normalizedData.length,
      data: normalizedData
    });

  } catch (error) {
    console.error('eRaktKosh API Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blood stock data',
      error: error.message
    });
  }
});

/**
 * GET /api/eraktkosh/nearby-facilities
 * Fetch nearby healthcare facilities from ABDM Facility Sandbox API
 * Query params: lat, long, radius (optional)
 */
router.get('/nearby-facilities', async (req, res) => {
  try {
    const { lat, long, radius = 10 } = req.query;

    if (!lat || !long) {
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters: lat, long'
      });
    }

    // ABDM Facility Sandbox API - try different endpoints
    const abdmBaseUrl = 'https://facilitysbx.abdm.gov.in';
    
    // Try the facilities search endpoint
    let response;
    try {
      response = await axios.get(`${abdmBaseUrl}/api/v1/facility/search`, {
        params: {
          latitude: parseFloat(lat),
          longitude: parseFloat(long),
          radius: parseFloat(radius)
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
    } catch (err) {
      // If that fails, try alternate endpoint structure
      response = await axios.post(`${abdmBaseUrl}/api/facility/nearby`, {
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        radius: parseFloat(radius)
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      });
    }

    // Parse and normalize the facilities response
    let facilities = [];
    const data = response.data;

    if (Array.isArray(data)) {
      facilities = data;
    } else if (typeof data === 'object') {
      // Check for various possible response structures
      for (const key of ['facilities', 'data', 'hospitals', 'healthcareFacilities', 'result', 'items']) {
        if (data[key] && Array.isArray(data[key])) {
          facilities = data[key];
          break;
        }
      }
      // If still empty, check if data itself has facility properties
      if (facilities.length === 0 && data.facilityId) {
        facilities = [data];
      }
    }

    const normalizedFacilities = facilities.map((facility, index) => ({
      id: facility.facilityId || facility.id || facility.hipId || index + 1,
      name: facility.facilityName || facility.name || facility.hospitalName || facility.providerName || 'Unknown Facility',
      address: facility.address || facility.addressLine || facility.addr || 'Address not available',
      city: facility.city || facility.cityName || facility.district || 'N/A',
      state: facility.state || facility.stateName || 'N/A',
      pincode: facility.pincode || facility.postalCode || facility.pin || 'N/A',
      contact: facility.phone || facility.contactNo || facility.contact || facility.mobile || 'N/A',
      email: facility.email || facility.emailId || 'N/A',
      latitude: facility.latitude || facility.lat || null,
      longitude: facility.longitude || facility.lng || facility.long || null,
      distance: facility.distance || null,
      facilityType: facility.facilityType || facility.type || facility.category || 'Healthcare Facility',
      bloodComponents: facility.bloodComponents || facility.services || []
    }));

    res.json({
      success: true,
      count: normalizedFacilities.length,
      data: normalizedFacilities,
      source: 'ABDM Facility Sandbox'
    });

  } catch (error) {
    console.error('ABDM Facility Search Error:', error.message);
    
    // If ABDM fails, provide helpful error message
    res.status(500).json({
      success: false,
      message: 'Failed to fetch nearby facilities from ABDM',
      error: error.message,
      tip: 'The ABDM Facility Sandbox API may require authentication or have connectivity issues. Check API documentation at https://facilitysbx.abdm.gov.in/v2/api-docs'
    });
  }
});

module.exports = router;
