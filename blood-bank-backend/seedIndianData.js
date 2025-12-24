require('dotenv').config();
const mongoose = require('mongoose');
const City = require('./models/City');
const BloodDonor = require('./models/Donor');
const Recipient = require('./models/Recipient');
const HospitalInfo = require('./models/Hospital');
const BloodSpecimen = require('./models/BloodSpecimen');
const BBManager = require('./models/BB_Manager');
const RecordingStaff = require('./models/Recording_Staff');
const Registers = require('./models/Registers');
const Records = require('./models/Records');
const RequestTo = require('./models/Request_To');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected for Seeding'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

const seedIndianData = async () => {
  try {
    console.log('🗑️  Clearing existing data (keeping login credentials)...');
    
    // Clear all collections EXCEPT Users
    await City.deleteMany({});
    await BloodDonor.deleteMany({});
    await Recipient.deleteMany({});
    await HospitalInfo.deleteMany({});
    await BloodSpecimen.deleteMany({});
    await BBManager.deleteMany({});
    await RecordingStaff.deleteMany({});
    await Registers.deleteMany({});
    await Records.deleteMany({});
    await RequestTo.deleteMany({});
    
    console.log('✅ All collections cleared (login data preserved)');
    
    // 1. INDIAN CITIES
    console.log('\n📍 Seeding Indian Cities...');
    const cities = [
      { City_Id: 1, City_Name: 'Mumbai' },
      { City_Id: 2, City_Name: 'Delhi' },
      { City_Id: 3, City_Name: 'Bangalore' },
      { City_Id: 4, City_Name: 'Hyderabad' },
      { City_Id: 5, City_Name: 'Chennai' },
      { City_Id: 6, City_Name: 'Kolkata' },
      { City_Id: 7, City_Name: 'Pune' },
      { City_Id: 8, City_Name: 'Ahmedabad' },
      { City_Id: 9, City_Name: 'Jaipur' },
      { City_Id: 10, City_Name: 'Lucknow' },
      { City_Id: 11, City_Name: 'Surat' },
      { City_Id: 12, City_Name: 'Kanpur' },
      { City_Id: 13, City_Name: 'Nagpur' },
      { City_Id: 14, City_Name: 'Indore' },
      { City_Id: 15, City_Name: 'Coimbatore' }
    ];
    await City.insertMany(cities);
    console.log(`✅ Inserted ${cities.length} Indian cities`);
    
    // 2. BB_MANAGERS (Indian names)
    console.log('\n👔 Seeding Blood Bank Managers...');
    const managers = [
      { M_Id: 1, M_Name: 'Dr. Rajesh Kumar Sharma', M_Phone: '9876543210' },
      { M_Id: 2, M_Name: 'Dr. Priya Lakshmi Nair', M_Phone: '9876543211' },
      { M_Id: 3, M_Name: 'Dr. Amit Chandrakant Patel', M_Phone: '9876543212' },
      { M_Id: 4, M_Name: 'Dr. Sneha Venkatesh Reddy', M_Phone: '9876543213' },
      { M_Id: 5, M_Name: 'Dr. Vikram Singh Rathore', M_Phone: '9876543214' },
      { M_Id: 6, M_Name: 'Dr. Meera Ramachandran', M_Phone: '9876543215' },
      { M_Id: 7, M_Name: 'Dr. Arun Kumar Joshi', M_Phone: '9876543216' },
      { M_Id: 8, M_Name: 'Dr. Kavita Suresh Deshmukh', M_Phone: '9876543217' }
    ];
    await BBManager.insertMany(managers);
    console.log(`✅ Inserted ${managers.length} BB managers`);
    
    // 3. RECORDING STAFF (Indian names)
    console.log('\n📝 Seeding Recording Staff...');
    const staff = [
      { Reco_Id: 1, Reco_Name: 'Rahul Mohan Verma', Reco_Phone: '9123456780' },
      { Reco_Id: 2, Reco_Name: 'Anita Kumari Desai', Reco_Phone: '9123456781' },
      { Reco_Id: 3, Reco_Name: 'Suresh Krishnan Nair', Reco_Phone: '9123456782' },
      { Reco_Id: 4, Reco_Name: 'Kavita Prakash Joshi', Reco_Phone: '9123456783' },
      { Reco_Id: 5, Reco_Name: 'Manoj Kumar Gupta', Reco_Phone: '9123456784' },
      { Reco_Id: 6, Reco_Name: 'Pooja Srinivasan Iyer', Reco_Phone: '9123456785' },
      { Reco_Id: 7, Reco_Name: 'Ravi Shankar Pillai', Reco_Phone: '9123456786' },
      { Reco_Id: 8, Reco_Name: 'Deepa Lakshmi Menon', Reco_Phone: '9123456787' },
      { Reco_Id: 9, Reco_Name: 'Sanjay Bhaskar Rao', Reco_Phone: '9123456788' },
      { Reco_Id: 10, Reco_Name: 'Neha Malhotra', Reco_Phone: '9123456789' }
    ];
    await RecordingStaff.insertMany(staff);
    console.log(`✅ Inserted ${staff.length} recording staff`);
    
    // 4. BLOOD DONORS (Indian names with diverse backgrounds)
    console.log('\n🩸 Seeding Blood Donors...');
    const donors = [
      { Bd_Id: 1, Bd_Name: 'Arjun Ramesh Mehta', Bd_Age: 28, Bd_Sex: 'M', Bd_Phone: '9988776601', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-01-15'), City_Id: 1 },
      { Bd_Id: 2, Bd_Name: 'Priya Lakshmi Nair', Bd_Age: 32, Bd_Sex: 'F', Bd_Phone: '9988776602', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-02-20'), City_Id: 2 },
      { Bd_Id: 3, Bd_Name: 'Rohit Vikas Sharma', Bd_Age: 45, Bd_Sex: 'M', Bd_Phone: '9988776603', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-03-10'), City_Id: 3 },
      { Bd_Id: 4, Bd_Name: 'Anjali Suresh Gupta', Bd_Age: 27, Bd_Sex: 'F', Bd_Phone: '9988776604', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2024-04-05'), City_Id: 4 },
      { Bd_Id: 5, Bd_Name: 'Vikram Venkatesh Rao', Bd_Age: 38, Bd_Sex: 'M', Bd_Phone: '9988776605', Bd_Bgroup: 'A-', Bd_reg_Date: new Date('2024-05-12'), City_Id: 5 },
      { Bd_Id: 6, Bd_Name: 'Sneha Arun Reddy', Bd_Age: 29, Bd_Sex: 'F', Bd_Phone: '9988776606', Bd_Bgroup: 'O-', Bd_reg_Date: new Date('2024-06-18'), City_Id: 1 },
      { Bd_Id: 7, Bd_Name: 'Karthik Prasad Kumar', Bd_Age: 41, Bd_Sex: 'M', Bd_Phone: '9988776607', Bd_Bgroup: 'B-', Bd_reg_Date: new Date('2024-07-22'), City_Id: 6 },
      { Bd_Id: 8, Bd_Name: 'Neha Rajesh Singh', Bd_Age: 26, Bd_Sex: 'F', Bd_Phone: '9988776608', Bd_Bgroup: 'AB-', Bd_reg_Date: new Date('2024-08-30'), City_Id: 7 },
      { Bd_Id: 9, Bd_Name: 'Aditya Manoj Patel', Bd_Age: 35, Bd_Sex: 'M', Bd_Phone: '9988776609', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-09-14'), City_Id: 8 },
      { Bd_Id: 10, Bd_Name: 'Divya Krishnan Iyer', Bd_Age: 31, Bd_Sex: 'F', Bd_Phone: '9988776610', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2024-10-08'), City_Id: 9 },
      { Bd_Id: 11, Bd_Name: 'Sanjay Kumar Verma', Bd_Age: 44, Bd_Sex: 'M', Bd_Phone: '9988776611', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2024-11-20'), City_Id: 10 },
      { Bd_Id: 12, Bd_Name: 'Kavita Prakash Desai', Bd_Age: 30, Bd_Sex: 'F', Bd_Phone: '9988776612', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2024-12-05'), City_Id: 2 },
      { Bd_Id: 13, Bd_Name: 'Rajesh Mohan Nair', Bd_Age: 39, Bd_Sex: 'M', Bd_Phone: '9988776613', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2025-01-10'), City_Id: 3 },
      { Bd_Id: 14, Bd_Name: 'Pooja Srinivasan Menon', Bd_Age: 28, Bd_Sex: 'F', Bd_Phone: '9988776614', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2025-02-15'), City_Id: 4 },
      { Bd_Id: 15, Bd_Name: 'Deepak Ravi Shankar', Bd_Age: 36, Bd_Sex: 'M', Bd_Phone: '9988776615', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2025-03-20'), City_Id: 5 },
      { Bd_Id: 16, Bd_Name: 'Meera Venkatesh', Bd_Age: 33, Bd_Sex: 'F', Bd_Phone: '9988776616', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2025-04-10'), City_Id: 6 },
      { Bd_Id: 17, Bd_Name: 'Suresh Babu Pillai', Bd_Age: 42, Bd_Sex: 'M', Bd_Phone: '9988776617', Bd_Bgroup: 'A+', Bd_reg_Date: new Date('2025-05-25'), City_Id: 7 },
      { Bd_Id: 18, Bd_Name: 'Lakshmi Kumari Devi', Bd_Age: 29, Bd_Sex: 'F', Bd_Phone: '9988776618', Bd_Bgroup: 'AB+', Bd_reg_Date: new Date('2025-06-15'), City_Id: 8 },
      { Bd_Id: 19, Bd_Name: 'Ramesh Chandra Tripathi', Bd_Age: 47, Bd_Sex: 'M', Bd_Phone: '9988776619', Bd_Bgroup: 'B+', Bd_reg_Date: new Date('2025-07-30'), City_Id: 9 },
      { Bd_Id: 20, Bd_Name: 'Ananya Priya Chatterjee', Bd_Age: 25, Bd_Sex: 'F', Bd_Phone: '9988776620', Bd_Bgroup: 'O+', Bd_reg_Date: new Date('2025-08-12'), City_Id: 10 }
    ];
    await BloodDonor.insertMany(donors);
    console.log(`✅ Inserted ${donors.length} blood donors`);
    
    // 5. RECIPIENTS (Indian names)
    console.log('\n🏥 Seeding Recipients...');
    const recipients = [
      { Reci_Id: 1, Reci_Name: 'Mohit Kumar Singh', Reci_Age: 52, Reci_Sex: 'M', Reci_Phone: '9876512340', Reci_Bgroup: 'O+', Reci_Bgrou_Needed: 'O+', Reci_reg_date: new Date('2024-06-10'), City_Id: 1, M_Id: 1 },
      { Reci_Id: 2, Reci_Name: 'Sunita Devi Sharma', Reci_Age: 48, Reci_Sex: 'F', Reci_Phone: '9876512341', Reci_Bgroup: 'A+', Reci_Bgrou_Needed: 'A+', Reci_reg_date: new Date('2024-07-15'), City_Id: 2, M_Id: 2 },
      { Reci_Id: 3, Reci_Name: 'Ravi Kiran Reddy', Reci_Age: 61, Reci_Sex: 'M', Reci_Phone: '9876512342', Reci_Bgroup: 'B+', Reci_Bgrou_Needed: 'B+', Reci_reg_date: new Date('2024-08-20'), City_Id: 3, M_Id: 3 },
      { Reci_Id: 4, Reci_Name: 'Geeta Ramesh Patel', Reci_Age: 45, Reci_Sex: 'F', Reci_Phone: '9876512343', Reci_Bgroup: 'AB+', Reci_Bgrou_Needed: 'AB+', Reci_reg_date: new Date('2024-09-12'), City_Id: 4, M_Id: 4 },
      { Reci_Id: 5, Reci_Name: 'Prakash Subramaniam', Reci_Age: 57, Reci_Sex: 'M', Reci_Phone: '9876512344', Reci_Bgroup: 'A-', Reci_Bgrou_Needed: 'A-', Reci_reg_date: new Date('2024-10-18'), City_Id: 5, M_Id: 5 },
      { Reci_Id: 6, Reci_Name: 'Radha Krishna Murthy', Reci_Age: 39, Reci_Sex: 'F', Reci_Phone: '9876512345', Reci_Bgroup: 'O-', Reci_Bgrou_Needed: 'O-', Reci_reg_date: new Date('2024-11-05'), City_Id: 6, M_Id: 1 },
      { Reci_Id: 7, Reci_Name: 'Anil Kumar Jain', Reci_Age: 54, Reci_Sex: 'M', Reci_Phone: '9876512346', Reci_Bgroup: 'B-', Reci_Bgrou_Needed: 'B-', Reci_reg_date: new Date('2024-12-10'), City_Id: 7, M_Id: 2 },
      { Reci_Id: 8, Reci_Name: 'Shanti Devi Agarwal', Reci_Age: 63, Reci_Sex: 'F', Reci_Phone: '9876512347', Reci_Bgroup: 'AB-', Reci_Bgrou_Needed: 'AB-', Reci_reg_date: new Date('2025-01-22'), City_Id: 8, M_Id: 3 },
      { Reci_Id: 9, Reci_Name: 'Harish Chandra Tiwari', Reci_Age: 50, Reci_Sex: 'M', Reci_Phone: '9876512348', Reci_Bgroup: 'O+', Reci_Bgrou_Needed: 'O+', Reci_reg_date: new Date('2025-02-14'), City_Id: 9, M_Id: 4 },
      { Reci_Id: 10, Reci_Name: 'Sarita Kumari Pandey', Reci_Age: 46, Reci_Sex: 'F', Reci_Phone: '9876512349', Reci_Bgroup: 'A+', Reci_Bgrou_Needed: 'A+', Reci_reg_date: new Date('2025-03-08'), City_Id: 10, M_Id: 5 }
    ];
    await Recipient.insertMany(recipients);
    console.log(`✅ Inserted ${recipients.length} recipients`);
    
    // 6. HOSPITALS (Real Indian hospitals)
    console.log('\n🏥 Seeding Hospital Information...');
    const hospitals = [
      { Hosp_Name: 'Tata Memorial Hospital', Hosp_Phone: '022-24177000', Hosp_Needed_Bgrp: 'O+', City_Id: 1, M_Id: 1, isApproved: true },
      { Hosp_Name: 'AIIMS Delhi', Hosp_Phone: '011-26588500', Hosp_Needed_Bgrp: 'A+', City_Id: 2, M_Id: 2, isApproved: true },
      { Hosp_Name: 'Apollo Hospital Bangalore', Hosp_Phone: '080-26304050', Hosp_Needed_Bgrp: 'B+', City_Id: 3, M_Id: 3, isApproved: true },
      { Hosp_Name: 'NIMS Hospital Hyderabad', Hosp_Phone: '040-23489000', Hosp_Needed_Bgrp: 'AB+', City_Id: 4, M_Id: 4, isApproved: true },
      { Hosp_Name: 'Apollo Hospital Chennai', Hosp_Phone: '044-28293333', Hosp_Needed_Bgrp: 'O+', City_Id: 5, M_Id: 5, isApproved: true },
      { Hosp_Name: 'SSKM Hospital Kolkata', Hosp_Phone: '033-22041000', Hosp_Needed_Bgrp: 'A-', City_Id: 6, M_Id: 1, isApproved: true },
      { Hosp_Name: 'Ruby Hall Clinic Pune', Hosp_Phone: '020-66455000', Hosp_Needed_Bgrp: 'B+', City_Id: 7, M_Id: 2, isApproved: true },
      { Hosp_Name: 'Sterling Hospital Ahmedabad', Hosp_Phone: '079-40004000', Hosp_Needed_Bgrp: 'O+', City_Id: 8, M_Id: 3, isApproved: true },
      { Hosp_Name: 'Fortis Hospital Jaipur', Hosp_Phone: '0141-2547000', Hosp_Needed_Bgrp: 'A+', City_Id: 9, M_Id: 4, isApproved: true },
      { Hosp_Name: 'SGPGI Lucknow', Hosp_Phone: '0522-2494402', Hosp_Needed_Bgrp: 'B+', City_Id: 10, M_Id: 5, isApproved: true },
      { Hosp_Name: 'Manipal Hospital Bangalore', Hosp_Phone: '080-25024444', Hosp_Needed_Bgrp: 'O+', City_Id: 3, M_Id: 3, isApproved: true },
      { Hosp_Name: 'Lilavati Hospital Mumbai', Hosp_Phone: '022-26751000', Hosp_Needed_Bgrp: 'A+', City_Id: 1, M_Id: 1, isApproved: true },
      { Hosp_Name: 'Max Super Speciality Hospital Delhi', Hosp_Phone: '011-26515050', Hosp_Needed_Bgrp: 'AB+', City_Id: 2, M_Id: 2, isApproved: true },
      { Hosp_Name: 'Narayana Health Bangalore', Hosp_Phone: '080-71222222', Hosp_Needed_Bgrp: 'O-', City_Id: 3, M_Id: 3, isApproved: true },
      { Hosp_Name: 'Medanta Gurugram', Hosp_Phone: '0124-4141414', Hosp_Needed_Bgrp: 'B+', City_Id: 2, M_Id: 2, isApproved: true }
    ];
    const insertedHospitals = await HospitalInfo.insertMany(hospitals);
    console.log(`✅ Inserted ${insertedHospitals.length} hospitals`);
    
    // 7. BLOOD SPECIMENS
    console.log('\n💉 Seeding Blood Specimens...');
    const specimens = [
      { specimenNumber: 'SPEC1001', bloodGroup: 'A+', status: 'available', donor: donors[0]._id, collectionDate: new Date('2024-01-20'), expiryDate: new Date('2024-05-20') },
      { specimenNumber: 'SPEC1002', bloodGroup: 'O+', status: 'available', donor: donors[1]._id, collectionDate: new Date('2024-02-25'), expiryDate: new Date('2024-06-25') },
      { specimenNumber: 'SPEC1003', bloodGroup: 'B+', status: 'available', donor: donors[2]._id, collectionDate: new Date('2024-03-15'), expiryDate: new Date('2024-07-15') },
      { specimenNumber: 'SPEC1004', bloodGroup: 'AB+', status: 'available', donor: donors[3]._id, collectionDate: new Date('2024-04-10'), expiryDate: new Date('2024-08-10') },
      { specimenNumber: 'SPEC1005', bloodGroup: 'A-', status: 'available', donor: donors[4]._id, collectionDate: new Date('2024-05-17'), expiryDate: new Date('2024-09-17') },
      { specimenNumber: 'SPEC1006', bloodGroup: 'O-', status: 'available', donor: donors[5]._id, collectionDate: new Date('2024-06-23'), expiryDate: new Date('2024-10-23') },
      { specimenNumber: 'SPEC1007', bloodGroup: 'B-', status: 'available', donor: donors[6]._id, collectionDate: new Date('2024-07-27'), expiryDate: new Date('2024-11-27') },
      { specimenNumber: 'SPEC1008', bloodGroup: 'AB-', status: 'reserved', donor: donors[7]._id, collectionDate: new Date('2024-09-04'), expiryDate: new Date('2025-01-04') },
      { specimenNumber: 'SPEC1009', bloodGroup: 'A+', status: 'available', donor: donors[8]._id, collectionDate: new Date('2024-09-19'), expiryDate: new Date('2025-01-19') },
      { specimenNumber: 'SPEC1010', bloodGroup: 'O+', status: 'available', donor: donors[9]._id, collectionDate: new Date('2024-10-13'), expiryDate: new Date('2025-02-13') },
      { specimenNumber: 'SPEC1011', bloodGroup: 'B+', status: 'available', donor: donors[10]._id, collectionDate: new Date('2024-11-25'), expiryDate: new Date('2025-03-25') },
      { specimenNumber: 'SPEC1012', bloodGroup: 'A+', status: 'available', donor: donors[11]._id, collectionDate: new Date('2024-12-10'), expiryDate: new Date('2025-04-10') },
      { specimenNumber: 'SPEC1013', bloodGroup: 'O+', status: 'used', donor: donors[12]._id, collectionDate: new Date('2025-01-15'), expiryDate: new Date('2025-05-15') },
      { specimenNumber: 'SPEC1014', bloodGroup: 'AB+', status: 'available', donor: donors[13]._id, collectionDate: new Date('2025-02-20'), expiryDate: new Date('2025-06-20') },
      { specimenNumber: 'SPEC1015', bloodGroup: 'B+', status: 'available', donor: donors[14]._id, collectionDate: new Date('2025-03-25'), expiryDate: new Date('2025-07-25') }
    ];
    await BloodSpecimen.insertMany(specimens);
    console.log(`✅ Inserted ${specimens.length} blood specimens`);
    
    console.log('\n✅ SEEDING COMPLETED SUCCESSFULLY!');
    console.log('\n📊 Summary:');
    console.log(`   • ${cities.length} Indian cities`);
    console.log(`   • ${managers.length} BB managers`);
    console.log(`   • ${staff.length} recording staff`);
    console.log(`   • ${donors.length} blood donors`);
    console.log(`   • ${recipients.length} recipients`);
    console.log(`   • ${insertedHospitals.length} hospitals`);
    console.log(`   • ${specimens.length} blood specimens`);
    console.log('\n🔒 Login credentials preserved!');
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding
seedIndianData();
