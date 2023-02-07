import { CommunicationWaysEnum, SexEnum } from '@/enums'
import type { IClient, IClientData } from './client.types'
import { Client } from '@/entities/clients'

export const mockClientsData = (): IClientData[] => [
  {
    id: '0',
    general: {
      firstName: 'Марина',
      lastName: 'Некрасова',
      patronymic: 'Александровна',
      sex: SexEnum.F,
      birthDate: new Date('10/23/2015'),
      categories: [],
      favoriteMaster: 'Леха',
      distanceFromSaloon: '5 минут пешком',
    },
    contacts: {
      phone: '79020574388',
      email: 'marina@mail.ru',
      allowCommunicationWays: [
        {
          channel: CommunicationWaysEnum.WHATSAPP,
          whatsapp_phone: '79020574388',
        },
      ],
    },
    relatives: [{}],
    additional: {
      howDidYouKnow: 'Лифт',
      description: 'Массаж, маски, сальто',
    },
    visits: 5,
    subscription: 2,
  },
  {
    id: '1',
    general: {
      firstName: 'Людка',
      lastName: '',
      patronymic: '',
      sex: SexEnum.M,
      categories: [],
      favoriteMaster: '',
      distanceFromSaloon: '',
    },
    contacts: {
      phone: '79020574388',
      email: 'marina@mail.ru',
      allowCommunicationWays: [
        {
          channel: CommunicationWaysEnum.TELEGRAM,
          telegram_username: 'ass',
        },
        {
          channel: CommunicationWaysEnum.WHATSAPP,
          whatsapp_phone: '79020574388',
        },
      ],
    },
    relatives: [{}],
    additional: {
      howDidYouKnow: 'Лифт',
      description: 'Массаж, маски, сальто',
    },
    visits: 5,
    subscription: 2,
  },
  {
    id: '2',
    general: {
      firstName: 'Марина',
      lastName: 'Некрасова',
      patronymic: 'Александровна',
      sex: SexEnum.F,
      birthDate: new Date('10/23/2015'),
      categories: [],
      favoriteMaster: '',
      distanceFromSaloon: '',
    },
    contacts: {
      phone: '79020574388',
      email: 'marina@mail.ru',
      allowCommunicationWays: [
        {
          channel: CommunicationWaysEnum.CALLS,
          phone: '79020574388',
        },
      ],
    },
    relatives: [{}],
    additional: {
      howDidYouKnow: 'Лифт',
      description: 'Массаж, маски, сальто',
    },
    visits: 5,
    subscription: 2,
  },
]

export const mockClients = (data: IClientData[] = mockClientsData()): IClient[] =>
  data.map((x) => new Client(x))
