import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { vehicleService } from './vehicleService.js';
class VehicleController {
// --- Predefined Vehicle Management (Manager only) ---
addPredefinedVehicle = asyncHandler(async (req, res) => {
const vehicle = await vehicleService.addPredefinedVehicle(req.body);
res.status(201).json(new ApiResponse(201, vehicle, 'Predefined vehicle added'));
});
getPredefinedVehicles = asyncHandler(async (req, res) => {
const vehicles = await vehicleService.getPredefinedVehicles();
res.status(200).json(new ApiResponse(200, vehicles, 'Predefined vehicles retrieved'));
});
// --- User Vehicle Management ---
addUserVehicle = asyncHandler(async (req, res) => {
const vehicle = await vehicleService.addUserVehicle(req.user._id, req.body);
res.status(201).json(new ApiResponse(201, vehicle, 'User vehicle added to garage'));
});
getUserVehicles = asyncHandler(async (req, res) => {
const vehicles = await vehicleService.getUserVehicles(req.user._id);
res.status(200).json(new ApiResponse(200, vehicles, 'User vehicles retrieved'));
});
}
export const vehicleController = new VehicleController();