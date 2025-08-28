import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    vehicle: { type: Schema.Types.ObjectId, ref: 'UserVehicle', required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    bookedServices: [{ type: Schema.Types.ObjectId, ref: 'Service', required: true }],
    issueDescription: { type: String, trim: true, default: '' },
    slotDate: { type: Date, required: true }, // Stores the date part, e.g., 2025-10-25T00:00:00.000Z
    slotTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ }, // Stores the time part, e.g., "14:00"
    status: {
      type: String,
      required: true,
      enum: ['Confirmed', 'In-Progress', 'Completed', 'Cancelled'],
      default: 'Confirmed',
    },
  },
  { timestamps: true }
);

// Compound index to prevent double booking the same slot at the same location
bookingSchema.index({ location: 1, slotDate: 1, slotTime: 1 }, { unique: true });

export const Booking = mongoose.model('Booking', bookingSchema);