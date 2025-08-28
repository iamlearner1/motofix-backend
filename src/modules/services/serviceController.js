import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { serviceService } from './serviceService.js';

class ServiceController {
  createService = asyncHandler(async (req, res) => {
    const service = await serviceService.createService(req.body);
    res.status(201).json(new ApiResponse(201, service, 'Service created successfully'));
  });

  getAllServices = asyncHandler(async (req, res) => {
    const services = await serviceService.getAllServices();
    res.status(200).json(new ApiResponse(200, services, 'All services retrieved'));
  });
}

export const serviceController = new ServiceController();