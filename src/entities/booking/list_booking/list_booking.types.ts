import type { BookingList, BookingMaster } from '@/entities/booking'

export type IListBookingData = {
  masters: Array<BookingMaster>
  bookings: Array<BookingList>
}

export type IListBooking = IListBookingData
