import mongoose, { Schema } from 'mongoose';

const userVehicleSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    vehicleInfo: { type: Schema.Types.ObjectId, ref: 'PredefinedVehicle', required: true },
    registrationNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
  },
  { timestamps: true }
);

export const UserVehicle = mongoose.model('UserVehicle', userVehicleSchema);