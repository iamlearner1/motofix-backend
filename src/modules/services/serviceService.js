import { Service } from './serviceModel.js';

class ServiceService {
  async createService(serviceData) {
    return Service.create(serviceData);
  }

  async getAllServices() {
    return Service.find({});
  }
}

export const serviceService = new ServiceService();