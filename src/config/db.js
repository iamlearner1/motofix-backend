import mongoose from 'mongoose';
import { env } from './envConfig.js';

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(env.MONGODB_URI);
    console.log(`\n✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};