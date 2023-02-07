import type {
  IBookingFilter,
  IBookingFilterData,
} from '@/entities/booking/booking_filter/booking_filter.types'

export class BookingFilter implements IBookingFilter {
  office_id: string
  date_gte: string
  date_lte: string

  constructor(data: IBookingFilterData) {
    Object.assign(this, data)
  }
}
