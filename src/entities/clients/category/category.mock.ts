import type { IClientsCategory, IClientsCategoryData } from '@/entities/clients'
import { ClientsCategory } from '@/entities/clients'

export const mockClientsCategoriesData = (): IClientsCategoryData[] => [
  {
    id: '0',
    name: 'Постоянный',
    deletable: false,
  },
  {
    id: '1',
    name: 'VIP',
    deletable: false,
  },
  {
    id: '2',
    name: 'Проблемный',
    deletable: false,
  },
]

export const mockClientsCategories = (
  data: IClientsCategoryData[] = mockClientsCategoriesData()
): IClientsCategory[] => data.map((x) => new ClientsCategory(x))
