import { User } from '../users/userModel.js';
import { Role } from '../users/roleModel.js'; // Ensure Role is imported
import { ApiError } from '../../utils/apiError.js';

class AuthService {
  // --- THIS IS THE UPDATED METHOD ---
  async registerUser({ name, email, password }) {
    // 1. Find the specific 'user' role from the database.
    const userRole = await Role.findOne({ name: 'user' });

    // 2. This is a critical server configuration check. If the 'user' role doesn't exist,
    //    the system cannot register new users.
    if (!userRole) {
      throw new ApiError(500, 'Configuration error: Default "user" role not found.');
    }

    // 3. Create the user, explicitly assigning the 'user' role's ObjectId.
    const user = await User.create({
      name,
      email,
      password,
      role: userRole._id, // Hardcode the role here
    });

    // 4. Find and return the newly created user, populating their role.
    const createdUser = await User.findById(user._id).select('-password').populate('role');
    return createdUser;
  }

  // --- The loginUser method remains exactly the same ---
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