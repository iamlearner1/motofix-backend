import { User } from '../users/userModel.js';
import { Role } from '../users/roleModel.js';
import { ApiError } from '../../utils/apiError.js';

class AuthService {
  async registerUser({ name, email, password, roleName = 'user' }) {
    const role = await Role.findOne({ name: roleName });
    if (!role) {
      // This is a setup step: ensure roles are in the DB.
      // For now, we throw an error. A real app might seed the DB.
      throw new ApiError(500, `Default role '${roleName}' not found. Please setup database roles.`);
    }

    const user = await User.create({ name, email, password, role: role._id });
    const createdUser = await User.findById(user._id).select('-password').populate('role');
    return createdUser;
  }

  async loginUser({ email, password }) {
    const user = await User.findOne({ email }).populate('role');
    if (!user) {
      throw new ApiError(404, 'User does not exist');
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid user credentials');
    }

    const accessToken = user.generateAccessToken();
    const loggedInUser = await User.findById(user._id).select('-password').populate('role');
    
    return { accessToken, user: loggedInUser };
  }
}

export const authService = new AuthService();