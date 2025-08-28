import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);