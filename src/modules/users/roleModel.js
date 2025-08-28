import mongoose, { Schema } from 'mongoose';

const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['user', 'staff', 'manager'], // Defines the only possible roles
  },
});

export const Role = mongoose.model('Role', roleSchema);