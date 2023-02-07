import type { IService, IServiceData } from './service.types'
import { Service } from './service'

export const mockServicesData = (): IServiceData[] => [
  {
    id: '0',
    name: 'Массаж',
    offices: ['567'],
    description: 'Смачный массаж',
    mastersAmount: 2,
    duration: 60,
    requiredTimeBefore: 5,
    requiredTimeAfter: 5,
  },
  {
    id: '2',
    name: 'Массаж ног',
    offices: ['5673'],
    description: 'Смачный массаж ног',
    mastersAmount: 1,
    duration: 30,
    requiredTimeBefore: 15,
    requiredTimeAfter: 5,
  },
  {
    id: '3',
    name: 'Сальто',
    offices: ['567'],
    description: 'Крутое сальто',
    mastersAmount: 1,
    duration: 1,
    requiredTimeBefore: 10,
    requiredTimeAfter: 10,
  },
]

export const mockServices = (data: IServiceData[] = mockServicesData()): IService[] =>
  data.map((x) => new Service(x))
