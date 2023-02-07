import { BookingTypesEnum } from '@/enums'

export function bookingTypesReadable(type: BookingTypesEnum) {
  return (
    {
      [BookingTypesEnum.DAY]: 'День',
      [BookingTypesEnum.WEEK]: 'Неделя',
    }[type] || 'Неизвестный тип'
  )
}
