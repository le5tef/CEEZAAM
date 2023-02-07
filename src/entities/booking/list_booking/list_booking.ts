import type { BookingList, BookingMaster, IListBooking, IListBookingData } from '@/entities/booking'

export class ListBooking implements IListBooking {
  masters: Array<BookingMaster>
  bookings: Array<BookingList>

  constructor(data: IListBookingData) {
    Object.assign(this, data)
  }
}
