import { Booking } from './bookingModel.js';
import { Location } from '../locations/locationModel.js';
import { UserVehicle } from '../vehicles/userVehicleModel.js';
import { ApiError } from '../../utils/apiError.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

class BookingService {
  async createBooking(userId, bookingData) {
    const { vehicle, location, slotDate, slotTime } = bookingData;

    // Verify the vehicle belongs to the user
    const userVehicle = await UserVehicle.findOne({ _id: vehicle, owner: userId });
    if (!userVehicle) {
      throw new ApiError(403, "Forbidden: You do not own this vehicle.");
    }

    // Verify the slot is not already taken (double-check before creation)
    const existingBooking = await Booking.findOne({ location, slotDate, slotTime });
    if (existingBooking) {
      throw new ApiError(409, 'This time slot is no longer available. Please select another.');
    }

    const booking = await Booking.create({
      ...bookingData,
      customer: userId,
    });
    return booking.populate([
        { path: 'customer', select: 'name email' },
        { path: 'vehicle', populate: { path: 'vehicleInfo' } },
        { path: 'location', select: 'name address' },
        { path: 'bookedServices' }
    ]);
  }

  async getBookingsByUserId(userId) {
    return Booking.find({ customer: userId })
      .populate('vehicle', 'registrationNumber')
      .populate('location', 'name')
      .populate('bookedServices', 'name')
      .sort({ slotDate: -1, slotTime: -1 });
  }

  async getBookingsByLocationId(locationId) {
    return Booking.find({ location: locationId })
      .populate('customer', 'name email')
      .populate('vehicle')
      .populate('bookedServices', 'name')
      .sort({ slotDate: 1, slotTime: 1 });
  }

  async updateBookingStatus(bookingId, status) {
    const validStatuses = ['Confirmed', 'In-Progress', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      throw new ApiError(400, 'Invalid status provided.');
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    if (!booking) {
      throw new ApiError(404, 'Booking not found');
    }
    return booking;
  }
}

export const bookingService = new BookingService();