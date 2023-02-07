import type { ClientFilterSexEnum, CommunicationWaysEnum } from '@/enums'

export interface IClientsFilterData {
  search?: string
  page?: number
  limit?: 5 | 10 | 15 | 20
  email?: boolean | string
  company_ids?: Array<string>
  sex?: ClientFilterSexEnum
  categories?: Array<string>
  last_visit?: {
    gt?: string
    lt?: string
  }
  know_about_us_from?: Array<string>
  communication_ways?: Array<CommunicationWaysEnum>
}

export type IClientsFilter = IClientsFilterData
