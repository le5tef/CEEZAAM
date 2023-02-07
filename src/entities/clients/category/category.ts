import type { IClientsCategory, IClientsCategoryData } from './category.types'

export class ClientsCategory implements IClientsCategory {
  id?: string
  deletable: boolean
  name: string

  static empty() {
    return new ClientsCategory({ deletable: true, name: '' })
  }

  constructor(data: IClientsCategoryData) {
    this.id = data.id
    this.deletable = data.deletable
    this.name = data.name
  }
}
