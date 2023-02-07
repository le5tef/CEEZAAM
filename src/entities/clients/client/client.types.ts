import type { CommunicationWaysEnum, SexEnum } from '@/enums'

export interface IClientGeneralData {
  firstName: string
  lastName?: string
  patronymic?: string
  sex?: SexEnum
  birthDate?: Date
  categories: string[]
  favoriteMaster?: string
  distanceFromSaloon?: string
}

export interface IClientCommunicationWay {
  channel: CommunicationWaysEnum
  telegram_username?: string
  telegram_phone?: string
  whatsapp_phone?: string
  phone?: string
}

export interface IClientContactsData {
  phone?: string
  email?: string
  allowCommunicationWays: IClientCommunicationWay[]
}

export interface IClientRelative {
  phone?: string
  relative?: string
}

export interface IClientAdditionalData {
  howDidYouKnow?: string
  contraindications?: string
  interests?: string
  description?: string
}

export interface IClientData {
  id?: string
  companyId?: string
  visits?: number
  subscription?: number
  general: IClientGeneralData
  contacts: IClientContactsData
  relatives: IClientRelative[]
  additional: IClientAdditionalData
}

export type IClient = IClientData
