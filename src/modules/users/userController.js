import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { User } from './userModel.js';
import { userService } from './userService.js'; // <-- IMPORT THE NEW SERVICE

class UserController {
  getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, req.user, 'Current user fetched successfully'));
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password').populate('role');
    res.status(200).json(new ApiResponse(200, users, 'All users retrieved'));
  });

  // --- NEW METHOD TO ADD ---
  createStaffMember = asyncHandler(async (req, res) => {
    const staffMember = await userService.createStaffMember(req.body);
    res.status(201).json(new ApiResponse(201, staffMember, 'Staff member created successfully'));
  });

  updateCurrentUser = asyncHandler(async (req, res) => {
    // req.user._id is attached by our verifyJWT middleware
    const updatedUser = await userService.updateUserProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully'));
  });

}

export const userController = new UserController();