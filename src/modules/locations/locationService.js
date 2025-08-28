import { Location } from './locationModel.js';
import { Booking } from '../bookings/bookingModel.js';
import { ApiError } from '../../utils/apiError.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

class LocationService {
  async createLocation(locationData) {
    return Location.create(locationData);
  }

  async getAllLocations() {
    return Location.find({}).populate('offeredServices');
  }

  async getAvailableSlots(locationId, date) {
    if (!date) {
      throw new ApiError(400, 'A date query parameter is required');
    }

    const location = await Location.findById(locationId);
    if (!location) {
      throw new ApiError(404, 'Location not found');
    }

    const requestedDate = dayjs.utc(date).startOf('day');

    // 1. Generate all possible time slots for the day
    const allSlots = [];
    let currentTime = requestedDate.hour(parseInt(location.openingTime.split(':')[0])).minute(parseInt(location.openingTime.split(':')[1]));
    const closingTime = requestedDate.hour(parseInt(location.closingTime.split(':')[0])).minute(parseInt(location.closingTime.split(':')[1]));

    while (currentTime.isBefore(closingTime)) {
      allSlots.push(currentTime.format('HH:mm'));
      currentTime = currentTime.add(location.slotDurationMinutes, 'minute');
    }

    // 2. Find all bookings for that location on that day
    const bookingsOnDate = await Booking.find({
      location: locationId,
      slotDate: {
        $gte: requestedDate.toDate(),
        $lt: requestedDate.add(1, 'day').toDate(),
      },
    });

    // 3. Extract the time of the taken slots
    const takenSlots = new Set(bookingsOnDate.map(booking => booking.slotTime));

    // 4. Filter out the taken slots
    const availableSlots = allSlots.filter(slot => !takenSlots.has(slot));

    return availableSlots;
  }
}

export const locationService = new LocationService();