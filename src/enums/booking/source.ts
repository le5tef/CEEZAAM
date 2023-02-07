import { BookingSourceEnum } from '@/client'

export { BookingSourceEnum } from '@/client'

export function bookingSourceReadable(v: BookingSourceEnum) {
  return {
    [BookingSourceEnum.CHAT]: 'Чат',
    [BookingSourceEnum.INCOMING]: 'Входящий трафик',
    [BookingSourceEnum.OUTGOING]: 'Исходящий трафик',
  }[v]
}

export const allBookingSources = [
  BookingSourceEnum.CHAT,
  BookingSourceEnum.INCOMING,
  BookingSourceEnum.OUTGOING,
]
