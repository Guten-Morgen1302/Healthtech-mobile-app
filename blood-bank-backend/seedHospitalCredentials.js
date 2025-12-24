require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Hospital = require('./models/Hospital');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding Hospital Credentials'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

const seedHospitalCredentials = async () => {
  try {
    console.log('🔐 Adding login credentials to Apollo Hospital Bangalore...');
    
    // Find Apollo Hospital Bangalore
    const hospital = await Hospital.findOne({ Hosp_Name: 'Apollo Hospital Bangalore' });
    
    if (!hospital) {
      console.log('❌ Apollo Hospital Bangalore not found. Run seedIndianData.js first.');
      process.exit(1);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Update hospital with credentials
    hospital.email = 'apollo@hospital.com';
    hospital.password = hashedPassword;
    hospital.isApproved = true;
    
    await hospital.save();

    console.log('\n✅ Hospital credentials added successfully!');
    console.log('\n📋 Login Details:');
    console.log('   Email: apollo@hospital.com');
    console.log('   Password: password123');
    console.log('   Hospital: Apollo Hospital Bangalore');
    console.log('\n🌐 Login at: http://localhost:3000/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding hospital credentials:', error);
    process.exit(1);
  }
};

seedHospitalCredentials();
