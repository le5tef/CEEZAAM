export enum DayOfWeekEnum {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const allWeekDays = [
  DayOfWeekEnum.MONDAY,
  DayOfWeekEnum.TUESDAY,
  DayOfWeekEnum.WEDNESDAY,
  DayOfWeekEnum.THURSDAY,
  DayOfWeekEnum.FRIDAY,
  DayOfWeekEnum.SATURDAY,
  DayOfWeekEnum.SUNDAY,
]

export function dayOfWeekReadable(day: DayOfWeekEnum) {
  return (
    {
      [DayOfWeekEnum.MONDAY]: 'Понедельник',
      [DayOfWeekEnum.TUESDAY]: 'Вторник',
      [DayOfWeekEnum.WEDNESDAY]: 'Среда',
      [DayOfWeekEnum.THURSDAY]: 'Четверг',
      [DayOfWeekEnum.FRIDAY]: 'Пятница',
      [DayOfWeekEnum.SATURDAY]: 'Суббота',
      [DayOfWeekEnum.SUNDAY]: 'Воскресенье',
    }[day] || 'Неизвестный день'
  )
}

export function dayOfWeekShortReadable(day: DayOfWeekEnum) {
  return (
    {
      [DayOfWeekEnum.MONDAY]: 'ПН',
      [DayOfWeekEnum.TUESDAY]: 'ВТ',
      [DayOfWeekEnum.WEDNESDAY]: 'СР',
      [DayOfWeekEnum.THURSDAY]: 'ЧТ',
      [DayOfWeekEnum.FRIDAY]: 'ПТ',
      [DayOfWeekEnum.SATURDAY]: 'СБ',
      [DayOfWeekEnum.SUNDAY]: 'ВС',
    }[day] || 'Неизвестный день'
  )
}
