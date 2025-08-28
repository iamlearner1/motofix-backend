import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import { User } from '../src/modules/users/userModel.js';
import { Role } from '../src/modules/users/roleModel.js';
import { env } from '../src/config/envConfig.js';

const createManager = async () => {
  try {
    // --- Connection ---
    await mongoose.connect(env.MONGODB_URI);
    console.log('Database connected for seeding...');

    // --- User Details (passed via command line or hardcoded) ---
    const managerEmail = process.argv[2] || 'manager@motofix.com';
    const managerPassword = process.argv[3] || 'SecretManagerPa$$123';

    // --- Check if Manager already exists ---
    const existingManager = await User.findOne({ email: managerEmail });
    if (existingManager) {
      console.log('Manager with this email already exists.');
      process.exit(1);
    }

    // --- Get the Manager Role ID ---
    const managerRole = await Role.findOne({ name: 'manager' });
    if (!managerRole) {
      console.error('CRITICAL: "manager" role not found in the database. Please seed roles first.');
      process.exit(1);
    }

    // --- Create the Manager User ---
    const manager = new User({
      name: 'MotoFix Manager',
      email: managerEmail,
      password: managerPassword, // Password will be hashed by the pre-save hook in the model
      role: managerRole._id,
    });

    await manager.save();
    console.log('✅ Manager account created successfully!');
    console.log(`Email: ${managerEmail}`);
    console.log(`Password: ${managerPassword} (Please change after first login)`);

  } catch (error) {
    console.error('Error creating manager account:', error);
  } finally {
    // --- Disconnection ---
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

createManager();