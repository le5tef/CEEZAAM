import type { IService } from '@/entities/services'
import type { Ref } from 'vue'

export interface IServicesService {
  services: Ref<IService[]>

  createService(service: IService): Promise<IService>

  updateService(service: IService): Promise<IService>

  getServices(companyId: string): Promise<IService[]>

  getService(id: string): Promise<IService | undefined>
}
