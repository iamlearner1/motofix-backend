import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { bookingService } from './bookingService.js';
class BookingController {
  createBooking = asyncHandler(async (req, res) => {
    const booking = await bookingService.createBooking(req.user._id, req.body);
    res.status(201).json(new ApiResponse(201, booking, 'Booking confirmed successfully'));
  });

  getUserHistory = asyncHandler(async (req, res) => {
    const bookings = await bookingService.getBookingsByUserId(req.user._id);
    res.status(200).json(new ApiResponse(200, bookings, 'User service history retrieved'));
  });

  getLocationBookings = asyncHandler(async (req, res) => {
    const { locationId } = req.params;
    const bookings = await bookingService.getBookingsByLocationId(locationId);
    res.status(200).json(new ApiResponse(200, bookings, 'Location bookings retrieved'));
  });

  updateBookingStatus = asyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;
    const updatedBooking = await bookingService.updateBookingStatus(bookingId, status);
    res.status(200).json(new ApiResponse(200, updatedBooking, 'Booking status updated successfully'));
  });
  getAllBookings = asyncHandler(async (req, res) => {
    // The controller's only job is to call the service
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(new ApiResponse(200, bookings, 'All bookings retrieved successfully'));
  });
}

export const bookingController = new BookingController();