export interface IServiceData {
  id?: string
  companyId?: string
  name: string
  offices: string[]
  description?: string
  mastersAmount?: number
  duration: number
  requiredTimeBefore: number
  requiredTimeAfter: number
}

export type IService = IServiceData
