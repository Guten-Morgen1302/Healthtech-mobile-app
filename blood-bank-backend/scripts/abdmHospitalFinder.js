/**
 * ABDM Health Facility Registry (HFR) - Nearby Hospital Finder
 * 
 * This script displays nearby hospitals using MOCK DATA for demo purposes.
 * Based on ABDM HFR API structure.
 * 
 * Location: Mumbai (19.0760, 72.8777) - Radius: 5000m
 */

// ============================================
// MOCK DATA - Nearby Healthcare Facilities
// ============================================
const MOCK_FACILITIES = [
    {
        id: 'HFR-MH-001',
        name: 'Lilavati Hospital and Research Centre',
        facilityType: 'Hospital',
        address: 'A-791, Bandra Reclamation, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        contact: '+91-22-2675-1000',
        distance: 0.8,
        latitude: 19.0509,
        longitude: 72.8294
    },
    {
        id: 'HFR-MH-002',
        name: 'Kokilaben Dhirubhai Ambani Hospital',
        facilityType: 'Hospital',
        address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400053',
        contact: '+91-22-3066-6666',
        distance: 1.2,
        latitude: 19.1306,
        longitude: 72.8260
    },
    {
        id: 'HFR-MH-003',
        name: 'Hinduja Hospital Blood Bank',
        facilityType: 'Blood Bank',
        address: 'Veer Savarkar Marg, Mahim',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400016',
        contact: '+91-22-2445-1515',
        distance: 1.5,
        latitude: 19.0368,
        longitude: 72.8406
    },
    {
        id: 'HFR-MH-004',
        name: 'Jaslok Hospital and Research Centre',
        facilityType: 'Hospital',
        address: '15, Dr. G. Deshmukh Marg, Pedder Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400026',
        contact: '+91-22-6657-3333',
        distance: 2.1,
        latitude: 18.9714,
        longitude: 72.8079
    },
    {
        id: 'HFR-MH-005',
        name: 'Breach Candy Hospital',
        facilityType: 'Hospital',
        address: '60-A, Bhulabhai Desai Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400026',
        contact: '+91-22-2366-7788',
        distance: 2.4,
        latitude: 18.9706,
        longitude: 72.8051
    },
    {
        id: 'HFR-MH-006',
        name: 'Tata Memorial Blood Bank',
        facilityType: 'Blood Bank',
        address: 'Dr. E Borges Road, Parel',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400012',
        contact: '+91-22-2417-7000',
        distance: 2.8,
        latitude: 19.0048,
        longitude: 72.8426
    },
    {
        id: 'HFR-MH-007',
        name: 'Apollo Clinic Bandra',
        facilityType: 'Clinic',
        address: 'Turner Road, Bandra West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400050',
        contact: '+91-22-2640-5500',
        distance: 3.0,
        latitude: 19.0544,
        longitude: 72.8328
    },
    {
        id: 'HFR-MH-008',
        name: 'Nanavati Super Speciality Hospital',
        facilityType: 'Hospital',
        address: 'S.V. Road, Vile Parle West',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400056',
        contact: '+91-22-2626-7500',
        distance: 3.5,
        latitude: 19.0989,
        longitude: 72.8438
    },
    {
        id: 'HFR-MH-009',
        name: 'Saifee Hospital Blood Bank',
        facilityType: 'Blood Bank',
        address: '15/17, Maharshi Karve Marg, Charni Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400004',
        contact: '+91-22-6757-0111',
        distance: 4.2,
        latitude: 18.9545,
        longitude: 72.8176
    },
    {
        id: 'HFR-MH-010',
        name: 'Wockhardt Hospitals',
        facilityType: 'Hospital',
        address: '1877, Dr. Anand Rao Nair Marg, Mumbai Central',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400011',
        contact: '+91-22-6178-4444',
        distance: 4.8,
        latitude: 18.9696,
        longitude: 72.8193
    }
];

// ============================================
// FILTER FACILITIES
// ============================================
const ALLOWED_TYPES = ['hospital', 'blood bank', 'clinic'];

function filterFacilities(facilities) {
    return facilities.filter(f =>
        ALLOWED_TYPES.some(type => f.facilityType.toLowerCase().includes(type))
    );
}

// ============================================
// DISPLAY RESULTS
// ============================================
function displayResults(facilities) {
    console.log('\n' + '='.repeat(60));
    console.log('🏥 NEARBY HEALTHCARE FACILITIES - ABDM HFR (MOCK DATA)');
    console.log('='.repeat(60));
    console.log('📍 Location: Mumbai (19.0760, 72.8777)');
    console.log('📏 Radius: 5000 meters\n');

    if (facilities.length === 0) {
        console.log('❌ No facilities found near this location.');
        return;
    }

    console.log(`📊 Total facilities found: ${facilities.length}`);
    console.log(`🔝 Showing top 5 nearest:\n`);

    const top5 = facilities.slice(0, 5);

    top5.forEach((f, i) => {
        console.log(`┌${'─'.repeat(58)}┐`);
        console.log(`│ ${(i + 1 + '. ' + f.name).substring(0, 56).padEnd(57)}│`);
        console.log(`├${'─'.repeat(58)}┤`);
        console.log(`│ 🏢 Type: ${f.facilityType.padEnd(47)}│`);
        console.log(`│ 📍 Address: ${f.address.substring(0, 44).padEnd(44)}│`);
        console.log(`│ 🌆 City: ${f.city.padEnd(48)}│`);
        console.log(`│ 📏 Distance: ${(f.distance + ' km').padEnd(44)}│`);
        console.log(`│ 📞 Contact: ${f.contact.padEnd(45)}│`);
        console.log(`└${'─'.repeat(58)}┘`);
        console.log('');
    });
}

// ============================================
// MAIN
// ============================================
function main() {
    console.log('\n🏥 ABDM Health Facility Registry - Nearby Hospital Finder');
    console.log('━'.repeat(60));
    console.log('⚠️  Using MOCK DATA for demonstration');

    const filtered = filterFacilities(MOCK_FACILITIES);
    displayResults(filtered);

    console.log('✅ Script completed successfully.\n');
}

// Run
main();
