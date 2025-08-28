import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { User } from './userModel.js';

class UserController {
  getCurrentUser = asyncHandler(async (req, res) => {
    // req.user is attached by the verifyJWT middleware
    res.status(200).json(new ApiResponse(200, req.user, 'Current user fetched successfully'));
  });

  // Example manager-only route
  getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').populate('role');
    res.status(200).json(new ApiResponse(200, users, 'All users retrieved'));
  });
}

export const userController = new UserController();