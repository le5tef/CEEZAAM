import type { IClient, IClientsCategory, IClientsFilter } from '@/entities/clients'

export interface IClientsService {
  createClient(client: IClient): Promise<IClient>
  updateClient(client: IClient): Promise<IClient>
  getClients(filters: IClientsFilter): Promise<IClient[]>
  getClient(id: string): Promise<IClient | undefined>
  getCategories(companyId: string): Promise<IClientsCategory[]>
}
