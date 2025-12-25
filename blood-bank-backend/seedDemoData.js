/**
 * Seed Script: Populate database with demo data
 * Run with: node seedDemoData.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Import models
const Donor = require('./models/Donor');
const DonationCamp = require('./models/DonationCamp');
const EmergencyRequest = require('./models/EmergencyRequest');
const DonorReward = require('./models/DonorReward');
const Hospital = require('./models/Hospital');

const seedData = async () => {
    try {
        await connectDB();
        console.log('🌱 Starting database seeding...\n');

        // ========== SEED DONORS ==========
        console.log('👥 Seeding donors...');

        const donorsData = [
            { Bd_Name: 'Rahul Sharma', Bd_Age: 28, Bd_Sex: 'M', Bd_Phone: '9876543210', Bd_Bgroup: 'O+', city: 'Mumbai' },
            { Bd_Name: 'Priya Patel', Bd_Age: 32, Bd_Sex: 'F', Bd_Phone: '9876543211', Bd_Bgroup: 'A+', city: 'Delhi' },
            { Bd_Name: 'Amit Kumar', Bd_Age: 25, Bd_Sex: 'M', Bd_Phone: '9876543212', Bd_Bgroup: 'B+', city: 'Bangalore' },
            { Bd_Name: 'Sneha Reddy', Bd_Age: 30, Bd_Sex: 'F', Bd_Phone: '9876543213', Bd_Bgroup: 'AB+', city: 'Chennai' },
            { Bd_Name: 'Vikram Singh', Bd_Age: 35, Bd_Sex: 'M', Bd_Phone: '9876543214', Bd_Bgroup: 'O-', city: 'Pune' },
        ];

        // Clear existing and insert new donors
        await Donor.deleteMany({ Bd_Phone: { $in: donorsData.map(d => d.Bd_Phone) } });
        const donors = await Donor.insertMany(donorsData);
        console.log(`   ✅ Created ${donors.length} donors`);

        // ========== SEED DONOR REWARDS ==========
        console.log('🏆 Seeding donor rewards...');

        const rewardsData = donors.map((donor, index) => ({
            donorId: donor._id,
            totalPoints: 500 - (index * 80),
            totalDonations: 10 - index * 2,
            emergencyResponses: 3 - index,
            livesSaved: 10 - index * 2,
            currentStreak: 5 - index,
            longestStreak: 8 - index,
            rank: index === 0 ? 'legend' : index === 1 ? 'hero' : 'contributor',
            badges: [
                { name: 'First Donation', level: 'bronze', icon: '🩸' },
                { name: 'Life Saver', level: index === 0 ? 'gold' : 'silver', icon: '💖' },
            ],
            transactions: [
                { type: 'donation', points: 100, description: 'Regular blood donation' },
                { type: 'emergency_response', points: 200, description: 'Responded to emergency' },
            ]
        }));

        await DonorReward.deleteMany({ donorId: { $in: donors.map(d => d._id) } });
        const rewards = await DonorReward.insertMany(rewardsData);
        console.log(`   ✅ Created ${rewards.length} reward records`);

        // ========== SEED DONATION CAMPS ==========
        console.log('🏕️ Seeding donation camps...');

        const today = new Date();
        const campsData = [
            {
                campName: 'World Blood Donor Day Camp',
                description: 'Join us for a special blood donation drive to save lives! Free checkups and refreshments for all donors.',
                campDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                startTime: '09:00 AM',
                endTime: '05:00 PM',
                location: {
                    name: 'City Convention Center',
                    address: 'MG Road, Central Plaza, Mumbai - 400001',
                    city: 'Mumbai',
                    coordinates: { latitude: 19.0760, longitude: 72.8777 }
                },
                organizer: 'Red Cross Society',
                contactPerson: { name: 'Dr. Anil Mehta', phone: '9820001234', email: 'anil@redcross.org' },
                expectedDonors: 100,
                status: 'upcoming'
            },
            {
                campName: 'Corporate Blood Drive - Tech Park',
                description: 'Annual blood donation camp for IT professionals. Every drop counts!',
                campDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
                startTime: '10:00 AM',
                endTime: '04:00 PM',
                location: {
                    name: 'Manyata Tech Park',
                    address: 'Outer Ring Road, Hebbal, Bangalore - 560045',
                    city: 'Bangalore',
                    coordinates: { latitude: 13.0467, longitude: 77.6217 }
                },
                organizer: 'Rotary Club Bangalore',
                contactPerson: { name: 'Rajesh Kumar', phone: '9900112233', email: 'rajesh@rotary.org' },
                expectedDonors: 200,
                status: 'upcoming'
            },
            {
                campName: 'Community Health & Blood Camp',
                description: 'Free health checkup along with blood donation. Help us reach 500 units!',
                campDate: new Date(today.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
                startTime: '08:00 AM',
                endTime: '06:00 PM',
                location: {
                    name: 'Nehru Stadium',
                    address: 'JLN Marg, Near Metro Station, Delhi - 110003',
                    city: 'Delhi',
                    coordinates: { latitude: 28.5933, longitude: 77.2372 }
                },
                organizer: 'Lions Club Delhi',
                contactPerson: { name: 'Suman Verma', phone: '9811223344', email: 'suman@lionsclub.org' },
                expectedDonors: 500,
                status: 'upcoming'
            }
        ];

        await DonationCamp.deleteMany({ campName: { $in: campsData.map(c => c.campName) } });
        const camps = await DonationCamp.insertMany(campsData);
        console.log(`   ✅ Created ${camps.length} donation camps`);

        // ========== SEED HOSPITALS (for emergencies) ==========
        console.log('🏥 Checking/Seeding hospitals...');

        let hospital = await Hospital.findOne({ Hosp_Name: 'City General Hospital' });
        if (!hospital) {
            hospital = await Hospital.create({
                Hosp_Name: 'City General Hospital',
                Hosp_Phone: '022-12345678',
                email: 'info@cityhospital.com',
                City: 'Mumbai',
                address: 'Dr. E Borges Road, Parel, Mumbai - 400012',
                isApproved: true
            });
            console.log('   ✅ Created demo hospital');
        } else {
            console.log('   ℹ️ Demo hospital already exists');
        }

        // ========== SEED EMERGENCY REQUESTS ==========
        console.log('🚨 Seeding emergency requests...');

        const emergenciesData = [
            {
                hospitalId: hospital._id,
                hospitalName: 'City General Hospital',
                bloodGroup: 'O-',
                unitsNeeded: 3,
                urgencyLevel: 'critical',
                patientCondition: 'Accident victim with severe blood loss. Immediate transfusion required.',
                location: {
                    coordinates: { latitude: 19.0170, longitude: 72.8570 },
                    address: 'Dr. E Borges Road, Parel, Mumbai - 400012'
                },
                donorsNotified: 15,
                status: 'active',
                expiresAt: new Date(today.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now
            },
            {
                hospitalId: hospital._id,
                hospitalName: 'Apollo Hospitals',
                bloodGroup: 'AB+',
                unitsNeeded: 2,
                urgencyLevel: 'urgent',
                patientCondition: 'Scheduled surgery patient needs blood reserve. Surgery in 4 hours.',
                location: {
                    coordinates: { latitude: 13.0569, longitude: 80.2425 },
                    address: 'Greams Lane, Off Greams Road, Chennai - 600006'
                },
                donorsNotified: 8,
                status: 'active',
                expiresAt: new Date(today.getTime() + 4 * 60 * 60 * 1000) // 4 hours from now
            }
        ];

        await EmergencyRequest.deleteMany({ status: 'active' });
        const emergencies = await EmergencyRequest.insertMany(emergenciesData);
        console.log(`   ✅ Created ${emergencies.length} active emergencies`);

        // ========== SUMMARY ==========
        console.log('\n✨ Database seeding completed successfully!');
        console.log('────────────────────────────────────────');
        console.log(`   👥 Donors:      ${donors.length}`);
        console.log(`   🏆 Rewards:     ${rewards.length}`);
        console.log(`   🏕️ Camps:       ${camps.length}`);
        console.log(`   🚨 Emergencies: ${emergencies.length}`);
        console.log('────────────────────────────────────────\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedData();
