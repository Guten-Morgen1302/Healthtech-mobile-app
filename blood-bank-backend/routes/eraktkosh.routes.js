const express = require('express');
const router = express.Router();

// Mock Data Source
const MOCK_BLOOD_BANKS = {
  'O+': [
    { id: 1, hospitalName: 'Tata Memorial Hospital Blood Bank', distance: 2.3, address: 'Dr. E Borges Road, Parel, Mumbai - 400012', contact: '022-24177000', component: 'Whole Blood', stock: '45 Units', city: 'Mumbai', state: 'Maharashtra', latitude: 19.0185, longitude: 72.8436 },
    { id: 2, hospitalName: 'KEM Hospital Blood Bank', distance: 3.1, address: 'Acharya Donde Marg, Parel, Mumbai - 400012', contact: '022-24136051', component: 'Whole Blood', stock: '32 Units', city: 'Mumbai', state: 'Maharashtra', latitude: 19.0028, longitude: 72.8399 },
    { id: 3, hospitalName: 'JJ Hospital Blood Bank', distance: 4.5, address: 'J.J. Marg, Nagpada, Mumbai - 400008', contact: '022-23739600', component: 'Packed RBC', stock: '28 Units', city: 'Mumbai', state: 'Maharashtra', latitude: 18.9616, longitude: 72.8329 },
    { id: 4, hospitalName: 'Lilavati Hospital Blood Bank', distance: 5.2, address: 'A-791, Bandra Reclamation, Mumbai - 400050', contact: '022-26751000', component: 'Whole Blood', stock: '52 Units', city: 'Mumbai', state: 'Maharashtra', latitude: 19.0511, longitude: 72.8258 },
  ],
  'A+': [
    { id: 1, hospitalName: 'AIIMS Blood Bank', distance: 1.8, address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029', contact: '011-26588500', component: 'Whole Blood', stock: '67 Units', city: 'New Delhi', state: 'Delhi', latitude: 28.5670, longitude: 77.2100 },
    { id: 2, hospitalName: 'Safdarjung Hospital Blood Bank', distance: 2.5, address: 'Ring Road, Safdarjung Enclave, New Delhi - 110029', contact: '011-26730000', component: 'Packed RBC', stock: '38 Units', city: 'New Delhi', state: 'Delhi', latitude: 28.5684, longitude: 77.1906 },
    { id: 3, hospitalName: 'Apollo Hospital Blood Bank', distance: 4.2, address: 'Sarita Vihar, Mathura Road, New Delhi - 110076', contact: '011-29871000', component: 'Whole Blood', stock: '54 Units', city: 'New Delhi', state: 'Delhi', latitude: 28.5369, longitude: 77.2917 },
  ],
  'B+': [
    { id: 1, hospitalName: 'CMC Vellore Blood Bank', distance: 0.8, address: 'Ida Scudder Road, Vellore - 632004', contact: '0416-2281000', component: 'Whole Blood', stock: '89 Units', city: 'Vellore', state: 'Tamil Nadu', latitude: 12.9272, longitude: 79.1325 },
    { id: 2, hospitalName: 'Apollo Hospitals Blood Bank', distance: 3.4, address: 'Greams Lane, Chennai - 600006', contact: '044-28293333', component: 'Packed RBC', stock: '56 Units', city: 'Chennai', state: 'Tamil Nadu', latitude: 13.0645, longitude: 80.2520 },
  ],
  'AB+': [
    { id: 1, hospitalName: 'Manipal Hospital Blood Bank', distance: 2.1, address: '98, HAL Old Airport Road, Bangalore - 560017', contact: '080-25024444', component: 'Whole Blood', stock: '24 Units', city: 'Bangalore', state: 'Karnataka', latitude: 12.9602, longitude: 77.6433 },
    { id: 2, hospitalName: 'Narayana Hrudayalaya', distance: 5.3, address: '258/A, Bommasandra, Bangalore - 560099', contact: '080-71222222', component: 'Platelets', stock: '15 Units', city: 'Bangalore', state: 'Karnataka', latitude: 12.8093, longitude: 77.6975 },
  ],
  'O-': [
    { id: 1, hospitalName: 'Ruby Hall Clinic Blood Bank', distance: 1.5, address: '40, Sassoon Road, Pune - 411001', contact: '020-66455000', component: 'Whole Blood', stock: '12 Units', city: 'Pune', state: 'Maharashtra', latitude: 18.5297, longitude: 73.8760 },
    { id: 2, hospitalName: 'Jehangir Hospital Blood Bank', distance: 3.2, address: '32, Sassoon Road, Pune - 411001', contact: '020-66815555', component: 'Packed RBC', stock: '8 Units', city: 'Pune', state: 'Maharashtra', latitude: 18.5293, longitude: 73.8732 },
  ],
  'A-': [
    { id: 1, hospitalName: 'PGI Chandigarh Blood Bank', distance: 1.2, address: 'Sector 12, Chandigarh - 160012', contact: '0172-2747585', component: 'Whole Blood', stock: '18 Units', city: 'Chandigarh', state: 'Chandigarh', latitude: 30.7634, longitude: 76.7796 },
    { id: 2, hospitalName: 'Max Hospital Blood Bank', distance: 4.5, address: 'Phase 6, Mohali - 160055', contact: '0172-6652000', component: 'FFP', stock: '11 Units', city: 'Mohali', state: 'Punjab', latitude: 30.7311, longitude: 76.7214 },
  ],
  'B-': [
    { id: 1, hospitalName: 'KGMU Blood Bank', distance: 2.4, address: 'Shah Mina Road, Lucknow - 226003', contact: '0522-2258181', component: 'Whole Blood', stock: '9 Units', city: 'Lucknow', state: 'Uttar Pradesh', latitude: 26.8679, longitude: 80.9138 },
  ],
  'AB-': [
    { id: 1, hospitalName: 'NIMHANS Blood Bank', distance: 3.6, address: 'Hosur Road, Bangalore - 560029', contact: '080-26995000', component: 'Whole Blood', stock: '5 Units', city: 'Bangalore', state: 'Karnataka', latitude: 12.9365, longitude: 77.5956 },
  ]
};

const MOCK_FACILITIES = [
  { id: 1, facilityId: 'FAC001', name: 'Apollo Hospitals', address: 'Greams Lane, Off Greams Road', city: 'Chennai', state: 'Tamil Nadu', pincode: '600006', contact: '044-28293333', email: 'info@apollohospitals.com', latitude: 13.0569, longitude: 80.2425, distance: 2.5, facilityType: 'Multi-Specialty Hospital' },
  { id: 2, facilityId: 'FAC002', name: 'Fortis Healthcare', address: 'Sector 62, Phase VIII', city: 'Mohali', state: 'Punjab', pincode: '160062', contact: '0172-5096000', email: 'info@fortishealthcare.com', latitude: 30.7046, longitude: 76.7179, distance: 1.8, facilityType: 'Multi-Specialty Hospital' },
  { id: 3, facilityId: 'FAC003', name: 'Max Super Speciality Hospital', address: 'Press Enclave Road', city: 'Saket, New Delhi', state: 'Delhi', pincode: '110017', contact: '011-26515050', email: 'info@maxhealthcare.com', latitude: 28.5244, longitude: 77.2067, distance: 3.2, facilityType: 'Super Specialty Hospital' },
  { id: 4, facilityId: 'FAC004', name: 'Manipal Hospital', address: '98, Rustom Bagh', city: 'Bangalore', state: 'Karnataka', pincode: '560017', contact: '080-25024444', email: 'info@manipalhospitals.com', latitude: 12.9698, longitude: 77.6489, distance: 4.1, facilityType: 'Multi-Specialty Hospital' },
  { id: 5, facilityId: 'FAC005', name: 'Medanta - The Medicity', address: 'Sector 38', city: 'Gurugram', state: 'Haryana', pincode: '122001', contact: '0124-4141414', email: 'info@medanta.org', latitude: 28.4353, longitude: 77.0535, distance: 5.5, facilityType: 'Multi-Specialty Hospital' },
  { id: 6, facilityId: 'FAC006', name: 'Narayana Health', address: '258/A, Bommasandra Industrial Area', city: 'Bangalore', state: 'Karnataka', pincode: '560099', contact: '080-71222222', email: 'info@narayanahealth.org', latitude: 12.8050, longitude: 77.6869, distance: 6.8, facilityType: 'Cardiac Care Hospital' },
  { id: 7, facilityId: 'FAC007', name: 'Kokilaben Dhirubhai Ambani Hospital', address: 'Four Bungalows, Andheri West', city: 'Mumbai', state: 'Maharashtra', pincode: '400053', contact: '022-30999999', email: 'info@kokilabenhospital.com', latitude: 19.1266, longitude: 72.8304, distance: 3.7, facilityType: 'Multi-Specialty Hospital' },
  { id: 8, facilityId: 'FAC008', name: 'Breach Candy Hospital', address: '60-A, Bhulabhai Desai Road', city: 'Mumbai', state: 'Maharashtra', pincode: '400026', contact: '022-23667788', email: 'info@breachcandyhospital.org', latitude: 18.9732, longitude: 72.8008, distance: 2.9, facilityType: 'General Hospital' },
];

/**
 * GET /api/eraktkosh/nearby-blood-stock
 * Fetch mock nearby blood bank stock
 */
router.get('/nearby-blood-stock', (req, res) => {
  try {
    const { lat, long, bg } = req.query;

    // Simulate delay
    setTimeout(() => {
      // Normalize blood group
      const normalizedBg = bg ? bg.replace(/\s+/g, '+').toUpperCase() : 'O+';

      const results = MOCK_BLOOD_BANKS[normalizedBg] || MOCK_BLOOD_BANKS['O+'];

      // Randomize slightly for dynamic feel
      const normalizedData = results.map(bank => ({
        ...bank,
        stock: `${Math.max(1, parseInt(bank.stock) + Math.floor(Math.random() * 10 - 5))} Units`
      }));

      res.json({
        success: true,
        count: normalizedData.length,
        data: normalizedData,
        source: 'Mock Data'
      });
    }, 500);

  } catch (error) {
    console.error('Mock eRaktKosh Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mock data',
      error: error.message
    });
  }
});

/**
 * GET /api/eraktkosh/nearby-facilities
 * Fetch mock nearby healthcare facilities
 */
router.get('/nearby-facilities', (req, res) => {
  try {
    const { lat, long, radius = 10 } = req.query;

    setTimeout(() => {
      res.json({
        success: true,
        count: MOCK_FACILITIES.length,
        data: MOCK_FACILITIES,
        source: 'Mock Data'
      });
    }, 500);

  } catch (error) {
    console.error('Mock Facilities Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch mock facilities',
      error: error.message
    });
  }
});

module.exports = router;
