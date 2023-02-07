import type {
  IClient,
  IClientAdditionalData,
  IClientContactsData,
  IClientData,
  IClientGeneralData,
  IClientRelative,
} from './client.types'

export class Client implements IClient {
  id?: string
  companyId?: string
  additional: IClientAdditionalData
  contacts: IClientContactsData
  general: IClientGeneralData
  relatives: IClientRelative[]
  subscription?: number
  visits?: number

  static empty(): Client {
    return new Client({
      general: { firstName: '', categories: [] },
      contacts: { allowCommunicationWays: [] },
      relatives: [{}],
      additional: {},
    })
  }

  constructor(data: IClientData) {
    this.id = data.id
    this.companyId = data.companyId
    this.additional = data.additional
    this.contacts = data.contacts
    this.general = data.general
    this.relatives = data.relatives
    this.subscription = data.subscription
    this.visits = data.visits
  }
}
