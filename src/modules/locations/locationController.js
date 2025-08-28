import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { locationService } from './locationService.js';

class LocationController {
  createLocation = asyncHandler(async (req, res) => {
    const location = await locationService.createLocation(req.body);
    res.status(201).json(new ApiResponse(201, location, 'Location created successfully'));
  });

  getAllLocations = asyncHandler(async (req, res) => {
    const locations = await locationService.getAllLocations();
    res.status(200).json(new ApiResponse(200, locations, 'All locations retrieved'));
  });

  getAvailableSlots = asyncHandler(async (req, res) => {
    const { locationId, date } = req.query; // e.g., ?date=2025-12-25
    const slots = await locationService.getAvailableSlots(locationId, date);
    res.status(200).json(new ApiResponse(200, { availableSlots: slots }, 'Available slots retrieved'));
  });
}

export const locationController = new LocationController();