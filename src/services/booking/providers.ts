import { BookingService } from './booking'

export const useBookingService = (): BookingService => new BookingService()
