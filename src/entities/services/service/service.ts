import type { IService, IServiceData } from './service.types'

export class Service implements IService {
  id?: string
  companyId?: string
  name: string
  offices: string[]
  description?: string
  mastersAmount?: number
  duration: number
  requiredTimeBefore: number
  requiredTimeAfter: number

  static empty(): Service {
    return new Service({
      name: '',
      offices: [],
      mastersAmount: 0,
      duration: 0,
      requiredTimeBefore: 0,
      requiredTimeAfter: 0,
    })
  }

  constructor(data: IServiceData) {
    Object.assign(this, data)
  }
}

export class ServiceSaved extends Service {
  declare id: string
}
