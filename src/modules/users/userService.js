import { User } from './userModel.js';
import { Role } from './roleModel.js';
import { Location } from '../locations/locationModel.js';
import { ApiError } from '../../utils/apiError.js';

class UserService {
  async createStaffMember({ name, email, password, location }) {
    // 1. Verify the 'staff' role exists
    const staffRole = await Role.findOne({ name: 'staff' });
    if (!staffRole) {
      throw new ApiError(500, 'Configuration error: "staff" role not found in database.');
    }

    // 2. Verify the provided location exists
    const assignedLocation = await Location.findById(location);
    if (!assignedLocation) {
      throw new ApiError(404, 'The specified location does not exist.');
    }

    // 3. Create the new user with the staff role and assigned location
    const newStaffMember = await User.create({
      name,
      email,
      password, // Password will be hashed automatically by the model's pre-save hook
      role: staffRole._id,
      location: assignedLocation._id,
    });

    // 4. Find and return the created user, excluding the password
    const createdUser = await User.findById(newStaffMember._id).select('-password').populate('role').populate('location');
    return createdUser;
  }

  async updateUserProfile(userId, updateData) {
    const { name, email } = updateData;

    // Find the user and update their details
    // { new: true } ensures that the updated document is returned
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password').populate('role');

    if (!updatedUser) {
      throw new ApiError(404, 'User not found');
    }

    return updatedUser;
  }
}

export const userService = new UserService();