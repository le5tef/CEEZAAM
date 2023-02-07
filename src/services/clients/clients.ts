import type { IClientsService } from './clients.types'
import type { Client, ClientsCategory } from '@/entities/clients'
import {
  categorySchemaToEntity,
  clientEntityToCreateSchema,
  clientEntityToUpdateSchema,
  clientGeneralSchemaToEntity,
  clientSchemaToEntity,
  clientsFilterEntityToSchema,
} from './utils'
import type { ClientCategorySchema, ClientSchema } from '@/client'
import * as APIClient from '@/client'
import { Logger } from '@/utils'
import type { IClientsFilter } from '@/entities/clients/filter/filter.types'

const logger = new Logger({ prefix: 'services/ClientsService' })

export class ClientsService implements IClientsService {
  async createClient(client: Client): Promise<Client> {
    const data = clientEntityToCreateSchema(client)
    const response = await APIClient.ClientsService.clientsCreate(data)

    logger.info('createClient()', response)

    return clientSchemaToEntity(response.data as ClientSchema)
  }

  async updateClient(client: Client): Promise<Client> {
    if (!client.id) {
      throw Error('Cannot update user without id')
    }

    const data = clientEntityToUpdateSchema(client)
    const response = await APIClient.ClientsService.clientsUpdate(client.id, data)

    logger.info('createClient()', response)

    return clientSchemaToEntity(response.data as ClientSchema)
  }

  async getClients(filters: IClientsFilter): Promise<Client[]> {
    const response = await APIClient.ClientsService.clientsList(
      clientsFilterEntityToSchema(filters)
    )
    logger.info('getClients()', response)

    return (response.data as ClientSchema[]).map(clientGeneralSchemaToEntity)
  }

  async getClient(id: string): Promise<Client> {
    const response = await APIClient.ClientsService.clientsGet(id)
    logger.info('getClient()', response)

    return clientSchemaToEntity(response.data as ClientSchema)
  }

  async getCategories(companyId: string): Promise<ClientsCategory[]> {
    const response = await APIClient.ClientsCategoriesService.clientsCategoryList(companyId)
    logger.info('getCategories()', response)
    return (response.data as ClientCategorySchema[]).map(categorySchemaToEntity)
  }
}
