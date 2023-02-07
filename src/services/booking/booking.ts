import type { IBookingService } from './booking.types'
import { Booking, ListBooking, BookingCreate, BookingUpdate } from '@/entities/booking'
import type { BookingFilter } from '@/entities/booking'
import type { BookingSchema, ListBookingSchema } from '@/client'
import * as APIClient from '@/client'
import type { Ref } from 'vue'
import { ref } from 'vue'

// const logger = new Logger({ prefix: 'services/ClientsService' })

export class BookingService implements IBookingService {
  list_booking: Ref<ListBooking | null> = ref(null)

  async fetchBookings(filter: BookingFilter): Promise<void> {
    const resp = await APIClient.BookingService.bookingList(filter)
    this.list_booking.value = new ListBooking(resp.data as ListBookingSchema)
  }

  async createBooking(booking: BookingCreate): Promise<Array<Booking>> {
    const resp = await APIClient.BookingService.bookingNew(booking.toSchema())
    return (resp.data as Array<BookingSchema>).map(Booking.fromSchema)
  }

  async updateBooking(booking: BookingUpdate): Promise<Booking> {
    const resp = await APIClient.BookingService.bookingUpdate(booking.id, booking.toSchema())
    return Booking.fromSchema(resp.data as BookingSchema)
  }
}
