import { BoolEnum, CommunicationWaysEnum, SexEnum, SubscriptionEnum } from '@/enums'
import { Client, ClientsCategory, ClientsFilter } from '@/entities/clients'
import type {
  ClientCategorySchema,
  ClientFilterSchema,
  ClientSchema,
  CreateClientSchema,
  GeneralClientSchema,
  UpdateClientSchema,
} from '@/client'
import { CommunicationWayEnum as ApiCommunicationWayEnum, SexEnum as ApiSexEnum } from '@/client'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { allCommunicationWays } from '@/store/clients'
import { useEmployeesStore } from '@/store/employees'

const communicationWayToApiMap = {
  [CommunicationWaysEnum.WHATSAPP]: ApiCommunicationWayEnum.WA,
  [CommunicationWaysEnum.TELEGRAM]: ApiCommunicationWayEnum.TG,
  [CommunicationWaysEnum.SMS]: ApiCommunicationWayEnum.SMS,
  [CommunicationWaysEnum.CALLS]: ApiCommunicationWayEnum.CALL,
}

export function communicationWayReadable(role: CommunicationWaysEnum) {
  return (
    {
      [CommunicationWaysEnum.SMS]: 'Сообщения',
      [CommunicationWaysEnum.CALLS]: 'Звонки',
      [CommunicationWaysEnum.TELEGRAM]: 'Telegram',
      [CommunicationWaysEnum.WHATSAPP]: 'WhatsApp',
    }[role] || 'Неизвестный способ коммуникации'
  )
}

export function sexReadable(sex: SexEnum) {
  return (
    {
      [SexEnum.M]: 'Мужской',
      [SexEnum.F]: 'Женский',
      [SexEnum.ANY]: 'Не важно',
    }[sex] || 'Неизвестный пол'
  )
}

export function subscriptionReadable(subscription: SubscriptionEnum) {
  return (
    {
      [SubscriptionEnum.ACTIVE]: 'Действующий',
      [SubscriptionEnum.ENDED]: 'Просроченный',
      [SubscriptionEnum.END_SOON]: 'Скоро завершится',
    }[subscription] || 'Неизвестный абонемент'
  )
}

export const communicationWaysOptions = computed(() => {
  const options = []
  for (let i = 0; i < allCommunicationWays.length; i++) {
    options.push({
      label: communicationWayReadable(allCommunicationWays[i]),
      value: allCommunicationWays[i],
    })
  }
  return options
})

export function clientEntityToUpdateSchema(client: Client): UpdateClientSchema {
  const sex = client.general.sex
    ? {
        [SexEnum.M]: ApiSexEnum.M,
        [SexEnum.F]: ApiSexEnum.F,
        [SexEnum.ANY]: undefined,
      }[client.general.sex]
    : undefined

  const communicationWays = client.contacts.allowCommunicationWays.map((x) => ({
    way: communicationWayToApiMap[x.channel],
  }))

  return {
    first_name: client.general.firstName,
    middle_name: client.general.patronymic,
    last_name: client.general.lastName,
    categories: client.general.categories,
    sex: sex,
    birthday: dayjs(client.general.birthDate).format('YYYY-MM-DD'),

    phone: client.contacts.phone,
    email: client.contacts.email,
    communication_ways: communicationWays,

    comment_note: client.additional.description,
    know_about_us_from: client.additional.howDidYouKnow,
    hate_note: client.additional.contraindications,
    like_note: client.additional.interests,
  }
}

export function clientEntityToCreateSchema(client: Client): CreateClientSchema {
  if (!client.companyId) {
    throw Error('You must need specify companyId to create client')
  }

  const updateSchema = clientEntityToUpdateSchema(client)
  return {
    ...updateSchema,
    company_id: client.companyId,
  } as CreateClientSchema
}

export function clientSchemaToEntity(schema: ClientSchema): Client {
  return new Client({
    id: schema.id,
    general: {
      firstName: schema.first_name,
      lastName: schema.last_name,
      patronymic: schema.middle_name,
      sex:
        schema.sex &&
        {
          [ApiSexEnum.M]: SexEnum.M,
          [ApiSexEnum.F]: SexEnum.F,
        }[schema.sex],
      birthDate: schema.birthday ? new Date(schema.birthday) : undefined,
      categories: schema.categories || [],
    },
    additional: {
      howDidYouKnow: schema.know_about_us_from,
      contraindications: schema.hate_note,
      interests: schema.like_note,
      description: schema.comment_note,
    },
    contacts: {
      phone: schema.phone,
      email: schema.email,
      allowCommunicationWays:
        schema.communication_ways?.map((x) => ({
          channel: {
            [ApiCommunicationWayEnum.CALL]: CommunicationWaysEnum.CALLS,
            [ApiCommunicationWayEnum.WA]: CommunicationWaysEnum.WHATSAPP,
            [ApiCommunicationWayEnum.TG]: CommunicationWaysEnum.TELEGRAM,
            [ApiCommunicationWayEnum.SMS]: CommunicationWaysEnum.SMS,
          }[x.way],
        })) || [],
    },
    relatives: [],
  })
}

export function clientGeneralSchemaToEntity(schema: GeneralClientSchema): Client {
  return new Client({
    id: schema.id,
    general: {
      firstName: schema.first_name || '',
      lastName: schema.last_name,
      patronymic: schema.middle_name,
      sex:
        schema.sex &&
        {
          [ApiSexEnum.M]: SexEnum.M,
          [ApiSexEnum.F]: SexEnum.F,
        }[schema.sex],
      birthDate: schema.birthday ? new Date(schema.birthday) : undefined,
      categories: schema.categories || [],
    },
    additional: {
      howDidYouKnow: schema.know_about_us_from,
      description: schema.comment_note,
    },
    contacts: {
      phone: schema.phone,
      email: schema.email,
      allowCommunicationWays:
        schema.communication_ways?.map((x) => ({
          channel: {
            [ApiCommunicationWayEnum.CALL]: CommunicationWaysEnum.CALLS,
            [ApiCommunicationWayEnum.WA]: CommunicationWaysEnum.WHATSAPP,
            [ApiCommunicationWayEnum.TG]: CommunicationWaysEnum.TELEGRAM,
            [ApiCommunicationWayEnum.SMS]: CommunicationWaysEnum.SMS,
          }[x.way],
        })) || [],
    },
    relatives: [],
  })
}

export function categorySchemaToEntity(schema: ClientCategorySchema): ClientsCategory {
  return new ClientsCategory({
    id: schema.id,
    name: schema.title,
    deletable: true,
  })
}

export const howDidYYouKnowFiltersOptions = [
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
]
export const emailFiltersOptions = [
  {
    label: 'Нет',
    value: BoolEnum.FALSE,
  },
  {
    label: 'Есть',
    value: BoolEnum.TRUE,
  },
]

export const favoriteMasterFiltersOptions = computed(() => {
  const employeesStore = useEmployeesStore()
  return [...[employeesStore.mastersOptions]]
})
export const visitTypes = computed(() => ['Входящий', 'Исходящий', 'Чат'])
export const distanceFiltersOptions = computed(() => [
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
export const depositFiltersOptions = computed(() => [
  {
    id: 1,
    label: 'Нет',
    value: BoolEnum.FALSE,
  },
  {
    id: 2,
    label: 'Есть',
    value: BoolEnum.TRUE,
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

export function clientsFilterEntityToSchema(entity: ClientsFilter): ClientFilterSchema {
  return {
    ...entity,
    communication_ways: entity.communication_ways?.map((x) => communicationWayToApiMap[x]),
  }
}
