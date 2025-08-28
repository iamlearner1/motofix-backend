import { PredefinedVehicle } from './predefinedVehicleModel.js';
import { UserVehicle } from './userVehicleModel.js';
import { ApiError } from '../../utils/apiError.js';

class VehicleService {
  async addPredefinedVehicle({ brand, model }) {
    return PredefinedVehicle.create({ brand, model });
  }

  async getPredefinedVehicles() {
    return PredefinedVehicle.find({});
  }

  async addUserVehicle(ownerId, { predefinedVehicleId, registrationNumber }) {
    const vehicleExists = await PredefinedVehicle.findById(predefinedVehicleId);
    if (!vehicleExists) {
      throw new ApiError(404, 'The selected vehicle model does not exist');
    }
    const userVehicle = await UserVehicle.create({ owner: ownerId, vehicleInfo: predefinedVehicleId, registrationNumber });
    return userVehicle.populate({ path: 'vehicleInfo', model: 'PredefinedVehicle' });
  }

  async getUserVehicles(ownerId) {
    return UserVehicle.find({ owner: ownerId }).populate('vehicleInfo');
  }
}

export const vehicleService = new VehicleService();