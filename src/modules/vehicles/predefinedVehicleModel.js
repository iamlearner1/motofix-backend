import mongoose, { Schema } from 'mongoose';

const predefinedVehicleSchema = new Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Create a compound index to ensure brand/model combinations are unique
predefinedVehicleSchema.index({ brand: 1, model: 1 }, { unique: true });

export const PredefinedVehicle = mongoose.model('PredefinedVehicle', predefinedVehicleSchema);