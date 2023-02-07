import type { Ref } from 'vue'
import type {
  Booking,
  BookingCreate,
  BookingFilter,
  BookingUpdate,
  ListBooking,
} from '@/entities/booking'

export interface IBookingService {
  list_booking: Ref<ListBooking | null>

  fetchBookings(filter: BookingFilter): Promise<void>

  createBooking(booking: BookingCreate): Promise<Array<Booking>>

  updateBooking(booking: BookingUpdate): Promise<Booking>
}
