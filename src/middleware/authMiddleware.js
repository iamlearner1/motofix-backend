import jwt from 'jsonwebtoken';
import { env } from '../config/envConfig.js';
import { User } from '../modules/users/userModel.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new ApiError(401, 'Unauthorized request: No token provided');
  }

  const decodedToken = jwt.verify(token, env.JWT_SECRET);
  const user = await User.findById(decodedToken?._id).select('-password').populate('role');

  if (!user) {
    throw new ApiError(401, 'Invalid Access Token');
  }

  req.user = user;
  next();
});

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role?.name;
    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ApiError(403, `Forbidden: Role '${userRole}' is not authorized to access this resource.`);
    }
    next();
  };
};