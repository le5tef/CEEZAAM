import { communicationWayReadable, sexReadable, subscriptionReadable } from '@/services/clients'
import {
  BoolEnum,
  CommunicationWaysEnum,
  DayOfWeekEnum,
  dayOfWeekReadable,
  SexEnum,
  SubscriptionEnum,
} from '@/enums'
import { computed } from 'vue'
import { useCompanyStore } from '@/store/company'
import { useEmployeesStore } from '@/store/employees'
import dayjs from 'dayjs'

export const howDidYYouKnowFiltersOptions = [
  {
    label: 'Не важно',
    value: '',
  },
  {
    label: 'Интернет',
    value: 'Интернет',
  },
  {
    label: 'Знакомые/родственники',
    value: 'Знакомые/родственники',
  },
  {
    label: 'Подарок',
    value: 'Подарок',
  },
  {
    label: 'Баннер/фасад',
    value: 'Баннер/фасад',
  },
  {
    label: 'Живу рядом',
    value: 'Живу рядом',
  },
  {
    label: 'Лифт',
    value: 'Лифт',
  },
  {
    label: 'Журнал',
    value: 'Журнал',
  },
  {
    label: 'Instagram',
    value: 'Instagram',
  },
  {
    label: 'ВК',
    value: 'ВК',
  },
  {
    label: 'Facebook',
    value: 'Facebook',
  },
]

export const sexFiltersOptions = [
  {
    label: sexReadable(SexEnum.M),
    value: SexEnum.M,
  },
  {
    label: sexReadable(SexEnum.F),
    value: SexEnum.F,
  },
  {
    label: sexReadable(SexEnum.ANY),
    value: SexEnum.ANY,
  },
]

export type lastVisitOptionSchema = {
  isEditable: boolean
  id: string
  label: string
  value: { from: dayjs.Dayjs | null; to: dayjs.Dayjs | null }
}

export const lastVisitOptions = [
  {
    id: '0',
    label: 'Менее 30 дней',
    value: {
      from: dayjs().subtract(30, 'days'),
      to: dayjs(),
    },
  },
  {
    id: '1',
    label: 'От 30 до 60 дней',
    value: {
      from: dayjs().subtract(60, 'days'),
      to: dayjs().subtract(30, 'days'),
    },
  },
  {
    id: '2',
    label: 'От 60 до 180 дней',
    value: {
      from: dayjs().subtract(180, 'days'),
      to: dayjs().subtract(60, 'days'),
    },
  },
  {
    id: '3',
    label: 'Более года',
    value: {
      from: null,
      to: dayjs().subtract(365, 'days'),
    },
  },
  {
    id: '4',
    isEditable: true,
    label: 'Произвольный период',
    value: {
      from: null,
      to: null,
    },
  },
] as lastVisitOptionSchema[]

export const daysOfWeekFiltersOptions = [
  {
    label: dayOfWeekReadable(DayOfWeekEnum.MONDAY),
    value: {
      id: '1',
      value: DayOfWeekEnum.MONDAY,
    },
  },
  {
    label: dayOfWeekReadable(DayOfWeekEnum.TUESDAY),
    value: {
      id: '2',
      value: DayOfWeekEnum.TUESDAY,
    },
  },
  {
    label: dayOfWeekReadable(DayOfWeekEnum.WEDNESDAY),
    value: {
      id: '3',
      value: DayOfWeekEnum.WEDNESDAY,
    },
  },
  {
    label: dayOfWeekReadable(DayOfWeekEnum.THURSDAY),
    value: {
      id: '4',
      value: DayOfWeekEnum.THURSDAY,
    },
  },
  {
    label: dayOfWeekReadable(DayOfWeekEnum.FRIDAY),
    value: {
      id: '5',
      value: DayOfWeekEnum.FRIDAY,
    },
  },
  {
    label: dayOfWeekReadable(DayOfWeekEnum.SUNDAY),
    value: {
      id: '6',
      value: DayOfWeekEnum.SUNDAY,
    },
  },
  {
    label: dayOfWeekReadable(DayOfWeekEnum.SATURDAY),
    value: {
      id: '7',
      value: DayOfWeekEnum.SATURDAY,
    },
  },
]

export const emailFiltersOptions = [
  {
    label: 'Не важно',
    value: BoolEnum.ANY,
  },
  {
    label: 'Нет',
    value: BoolEnum.FALSE,
  },
  {
    label: 'Есть',
    value: BoolEnum.TRUE,
  },
]

export const allCommunicationWays = [
  CommunicationWaysEnum.CALLS,
  CommunicationWaysEnum.SMS,
  CommunicationWaysEnum.TELEGRAM,
  CommunicationWaysEnum.WHATSAPP,
]

export const communicationWaysFiltersOptions = computed(() => {
  const options = []
  for (let i = 0; i < allCommunicationWays.length; i++) {
    options.push({
      label: communicationWayReadable(allCommunicationWays[i]),
      value: {
        value: allCommunicationWays[i],
        id: i.toString(),
      },
    })
  }

  return options
})

export const favoriteMasterFiltersOptions = computed(() => {
  const employeesStore = useEmployeesStore()
  return [{ label: 'Не важно', value: '' }, ...[employeesStore.mastersOptions]]
})

export const visitHoursFiltersOptions = computed(() => {
  return [
    {
      id: 0,
      label: 'Не важно',
      value: {
        from: null,
        to: null,
      },
    },
    {
      id: 1,
      label: 'Утро (08:00 - 13:00)',
      value: {
        from: 8,
        to: 13,
      },
    },
    {
      id: 2,
      label: 'День (13:00 - 17:00)',
      value: {
        from: 13,
        to: 17,
      },
    },
    {
      id: 3,
      label: 'Вечер (17:00 - 23:00)',
      value: {
        from: 17,
        to: 23,
      },
    },
  ]
})

export const favoriteSaloonFiltersOptions = computed(() => {
  const companyStore = useCompanyStore()
  const saloons = companyStore.currentCompanyOffices?.map((x) => {
    return {
      label: x.address,
      value: x.id,
    }
  })
  saloons?.push({
    label: 'Не важно',
    value: '',
  })
  return saloons
})

export const distanceFiltersOptions = computed(() => [
  {
    id: 0,
    label: 'Не важно',
    value: {
      from: null,
      to: null,
    },
  },
  {
    id: 1,
    label: '5 минут пешком',
    value: {
      from: 0,
      to: 5,
    },
  },
  {
    id: 2,
    label: 'от 5 до 15 минут',
    value: {
      from: 5,
      to: 15,
    },
  },
  {
    id: 3,
    label: 'до 30 минут',
    value: {
      from: null,
      to: 30,
    },
  },
  {
    id: 4,
    label: 'до часа и выше',
    value: {
      from: 30,
      to: null,
    },
  },
])

export const subscriptionFiltersOptions = computed(() => [
  {
    label: 'Не важно',
    value: null,
  },
  {
    label: subscriptionReadable(SubscriptionEnum.ACTIVE),
    value: SubscriptionEnum.ACTIVE,
  },
  {
    label: subscriptionReadable(SubscriptionEnum.ENDED),
    value: SubscriptionEnum.ENDED,
  },
  {
    label: subscriptionReadable(SubscriptionEnum.END_SOON),
    value: SubscriptionEnum.END_SOON,
  },
])

export const depositFiltersOptions = computed(() => [
  {
    id: 0,
    label: 'Не важно',
    value: BoolEnum.ANY,
  },
  {
    id: 1,
    label: 'Нет',
    value: BoolEnum.FALSE,
  },
  {
    id: 3,
    label: 'Есть',
    value: BoolEnum.TRUE,
  },
])

export const visitAmountFiltersOptions = computed(() => [
  {
    label: 'Не важно',
    value: {
      from: null,
      to: null,
    },
  },
  {
    label: 'Один',
    value: {
      from: 1,
      to: 1,
    },
  },
  {
    label: 'До 5',
    value: {
      from: 1,
      to: 5,
    },
  },
  {
    label: 'До 10',
    value: {
      from: 1,
      to: 10,
    },
  },
  {
    label: 'Более 10',
    value: {
      from: 10,
      to: null,
    },
  },
])

export const spentMoneyFiltersOptions = computed(() => [
  {
    label: 'Не важно',
    value: {
      from: null,
      to: null,
    },
  },
  {
    label: 'Хотя бы 1 рубль',
    value: {
      from: 1,
      to: 1,
    },
  },
  {
    label: 'До 5 тыс.',
    value: {
      from: 1,
      to: 5000,
    },
  },
  {
    label: 'До 10 тыс.',
    value: {
      from: 1,
      to: 10000,
    },
  },
  {
    label: 'До 25 тыс.',
    value: {
      from: 1,
      to: 25000,
    },
  },
  {
    label: 'До 100 тыс.',
    value: {
      from: 1,
      to: 100000,
    },
  },
  {
    label: 'Более 100 тыс.',
    value: {
      from: 100000,
      to: null,
    },
  },
])

export const distanceTypes = [
  {
    label: '5 минут пешком',
    value: {
      from: 0,
      to: 5,
    },
  },
  {
    label: 'от 5 до 15 минут',
    value: {
      from: 5,
      to: 15,
    },
  },
  {
    label: 'до 30 минут',
    value: {
      from: null,
      to: 30,
    },
  },
  {
    label: 'до часа и выше',
    value: {
      from: 30,
      to: null,
    },
  },
]

export const howDidYYouKnowTypes = [
  'Интернет',
  'Знакомые/родственники',
  'Подарок',
  'Баннер/фасад',
  'Живу рядом',
  'Лифт',
  'Журнал',
  'Instagram',
  'ВК',
  'Facebook',
]
