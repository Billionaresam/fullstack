import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const defaultPassword = await bcrypt.hash('changeme', 10);

    const staffList = [
      { staffId: 'ED/0001/25', role: 'Editor' },
      { staffId: 'ED/0002/25', role: 'Editor' },
      { staffId: 'PU/0003/25', role: 'Publisher' },
      { staffId: 'AD/0004/25', role: 'Admin' }
    ];

    for (const staff of staffList) {
      const staffId = staff.staffId.toUpperCase();
      const exists = await User.findOne({ staffId });

      if (!exists) {
        await User.create({
          staffId,
          role: staff.role,
          password: defaultPassword
        });
        console.log(`✅ Created ${staff.role}: ${staffId}`);
      } else {
        console.log(`⚠️ Skipped (already exists): ${staffId}`);
      }
    }

    console.log('🎉 Seeding complete');
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding users:', err.message);
    process.exit(1);
  }
};

seedUsers();
