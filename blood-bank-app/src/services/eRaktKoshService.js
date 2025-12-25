/**
 * eRaktKosh Blood Stock API Service - MOCK DATA VERSION
 * Uses mock data instead of live API calls
 */

// Backend API base URL
// const BACKEND_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Mock blood bank data
const MOCK_BLOOD_BANKS = {
  'O+': [
    { id: 1, hospitalName: 'Tata Memorial Hospital Blood Bank', distance: 2.3, address: 'Dr. E Borges Road, Parel, Mumbai - 400012', contact: '022-24177000', component: 'Whole Blood', stock: '45 Units', city: 'Mumbai', state: 'Maharashtra' },
    { id: 2, hospitalName: 'KEM Hospital Blood Bank', distance: 3.1, address: 'Acharya Donde Marg, Parel, Mumbai - 400012', contact: '022-24136051', component: 'Whole Blood', stock: '32 Units', city: 'Mumbai', state: 'Maharashtra' },
    { id: 3, hospitalName: 'JJ Hospital Blood Bank', distance: 4.5, address: 'J.J. Marg, Nagpada, Mumbai - 400008', contact: '022-23739600', component: 'Packed RBC', stock: '28 Units', city: 'Mumbai', state: 'Maharashtra' },
    { id: 4, hospitalName: 'Lilavati Hospital Blood Bank', distance: 5.2, address: 'A-791, Bandra Reclamation, Mumbai - 400050', contact: '022-26751000', component: 'Whole Blood', stock: '52 Units', city: 'Mumbai', state: 'Maharashtra' },
  ],
  'A+': [
    { id: 1, hospitalName: 'AIIMS Blood Bank', distance: 1.8, address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029', contact: '011-26588500', component: 'Whole Blood', stock: '67 Units', city: 'New Delhi', state: 'Delhi' },
    { id: 2, hospitalName: 'Safdarjung Hospital Blood Bank', distance: 2.5, address: 'Ring Road, Safdarjung Enclave, New Delhi - 110029', contact: '011-26730000', component: 'Packed RBC', stock: '38 Units', city: 'New Delhi', state: 'Delhi' },
    { id: 3, hospitalName: 'Apollo Hospital Blood Bank', distance: 4.2, address: 'Sarita Vihar, Mathura Road, New Delhi - 110076', contact: '011-29871000', component: 'Whole Blood', stock: '54 Units', city: 'New Delhi', state: 'Delhi' },
  ],
  'B+': [
    { id: 1, hospitalName: 'CMC Vellore Blood Bank', distance: 0.8, address: 'Ida Scudder Road, Vellore - 632004', contact: '0416-2281000', component: 'Whole Blood', stock: '89 Units', city: 'Vellore', state: 'Tamil Nadu' },
    { id: 2, hospitalName: 'Apollo Hospitals Blood Bank', distance: 3.4, address: 'Greams Lane, Chennai - 600006', contact: '044-28293333', component: 'Packed RBC', stock: '56 Units', city: 'Chennai', state: 'Tamil Nadu' },
  ],
  'AB+': [
    { id: 1, hospitalName: 'Manipal Hospital Blood Bank', distance: 2.1, address: '98, HAL Old Airport Road, Bangalore - 560017', contact: '080-25024444', component: 'Whole Blood', stock: '24 Units', city: 'Bangalore', state: 'Karnataka' },
    { id: 2, hospitalName: 'Narayana Hrudayalaya', distance: 5.3, address: '258/A, Bommasandra, Bangalore - 560099', contact: '080-71222222', component: 'Platelets', stock: '15 Units', city: 'Bangalore', state: 'Karnataka' },
  ],
  'O-': [
    { id: 1, hospitalName: 'Ruby Hall Clinic Blood Bank', distance: 1.5, address: '40, Sassoon Road, Pune - 411001', contact: '020-66455000', component: 'Whole Blood', stock: '12 Units', city: 'Pune', state: 'Maharashtra' },
    { id: 2, hospitalName: 'Jehangir Hospital Blood Bank', distance: 3.2, address: '32, Sassoon Road, Pune - 411001', contact: '020-66815555', component: 'Packed RBC', stock: '8 Units', city: 'Pune', state: 'Maharashtra' },
  ],
  'A-': [
    { id: 1, hospitalName: 'PGI Chandigarh Blood Bank', distance: 1.2, address: 'Sector 12, Chandigarh - 160012', contact: '0172-2747585', component: 'Whole Blood', stock: '18 Units', city: 'Chandigarh', state: 'Chandigarh' },
    { id: 2, hospitalName: 'Max Hospital Blood Bank', distance: 4.5, address: 'Phase 6, Mohali - 160055', contact: '0172-6652000', component: 'FFP', stock: '11 Units', city: 'Mohali', state: 'Punjab' },
  ],
  'B-': [
    { id: 1, hospitalName: 'KGMU Blood Bank', distance: 2.4, address: 'Shah Mina Road, Lucknow - 226003', contact: '0522-2258181', component: 'Whole Blood', stock: '9 Units', city: 'Lucknow', state: 'Uttar Pradesh' },
  ],
  'AB-': [
    { id: 1, hospitalName: 'NIMHANS Blood Bank', distance: 3.6, address: 'Hosur Road, Bangalore - 560029', contact: '080-26995000', component: 'Whole Blood', stock: '5 Units', city: 'Bangalore', state: 'Karnataka' },
  ]
};

// Mock healthcare facilities
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
 * Fetch nearby blood bank stock - MOCK VERSION
 * @param {number} latitude - User's latitude
 * @param {number} longitude - User's longitude
 * @param {string} bloodGroup - Blood group (e.g., 'A+', 'O-')
 * @returns {Promise<Array>} - Mock blood bank data
 */
export const fetchNearbyBloodStock = async (latitude, longitude, bloodGroup) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const results = MOCK_BLOOD_BANKS[bloodGroup] || [];

  // Add slight randomization to make it feel dynamic
  return results.map(bank => ({
    ...bank,
    distance: Math.max(0.5, bank.distance + (Math.random() * 2 - 1)),
    stock: `${Math.max(1, parseInt(bank.stock) + Math.floor(Math.random() * 10 - 5))} Units`
  }));
};

/**
 * Fetch nearby blood bank facilities - MOCK VERSION
 * @param {number} latitude - User's latitude
 * @param {number} longitude - User's longitude
 * @param {number} radius - Search radius in km (default: 10)
 * @returns {Promise<Array>} - Mock healthcare facilities
 */
export const fetchNearbyFacilities = async (latitude, longitude, radius = 10) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Filter facilities based on radius
  return MOCK_FACILITIES.filter(facility => facility.distance <= radius)
    .map(facility => ({
      ...facility,
      distance: Math.max(0.5, facility.distance + (Math.random() * 1 - 0.5))
    }));
};

/**
 * Get user's current location
 * @returns {Promise<{latitude: number, longitude: number}>}
 */
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied. Please enable location access in your browser.'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out'));
            break;
          default:
            reject(new Error('Unknown location error'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  });
};

export default {
  fetchNearbyBloodStock,
  fetchNearbyFacilities,
  getCurrentLocation
};

