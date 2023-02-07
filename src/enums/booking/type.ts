import { BookingTypeEnum } from '@/client'

export { BookingTypeEnum } from '@/client'

export function bookingTypeReadable(v: BookingTypeEnum) {
  return {
    [BookingTypeEnum.DEPOSIT]: 'Депозит',
    [BookingTypeEnum.SINGLE]: 'Входящий трафик',
    [BookingTypeEnum.GIFT_CERT]: 'Исходящий трафик',
    [BookingTypeEnum.SUBSCRIPTION]: 'Абонемент',
  }[v]
}

export const allBookingTypes = [
  BookingTypeEnum.DEPOSIT,
  BookingTypeEnum.SINGLE,
  BookingTypeEnum.GIFT_CERT,
  BookingTypeEnum.SUBSCRIPTION,
]
