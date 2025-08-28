import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true, trim: true },
    offeredServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],

    // Fields for dynamic slot generation
    openingTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/, comment: 'HH:MM format' }, // e.g., "09:00"
    closingTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/, comment: 'HH:MM format' }, // e.g., "17:00"
    slotDurationMinutes: { type: Number, required: true, default: 60 }, // e.g., 60 for 1-hour slots
  },
  { timestamps: true }
);

export const Location = mongoose.model('Location', locationSchema);