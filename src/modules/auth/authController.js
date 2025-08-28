import { authService } from './authService.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await authService.registerUser(req.body);
    res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
  });

  login = asyncHandler(async (req, res) => {
    const { accessToken, user } = await authService.loginUser(req.body);
    res.status(200).json(new ApiResponse(200, { user, accessToken }, 'User logged in successfully'));
  });
}

export const authController = new AuthController();