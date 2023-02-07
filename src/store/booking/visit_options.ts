import { allBookingSources, bookingSourceReadable } from '@/enums/booking/source'
import { allBookingTypes, bookingTypeReadable } from '@/enums/booking/type'

export const sourceOptions = allBookingSources.map((x) => ({
  label: bookingSourceReadable(x),
  value: x,
}))

export const typeOptions = allBookingTypes.map((x) => ({
  label: bookingTypeReadable(x),
  value: x,
}))
