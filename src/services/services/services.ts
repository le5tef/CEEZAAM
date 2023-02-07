import type { IServicesService } from './services.types'
import type { Service } from '@/entities/services'
import type { ServiceSchema } from '@/client'
import * as APIClient from '@/client'
import {
  serviceEntityToCreateSchema,
  serviceEntityToUpdateSchema,
  serviceSchemaToEntity,
} from '@/services/services/utils'
import type { Ref } from 'vue'
import { ref } from 'vue'

export class ServicesService implements IServicesService {
  services: Ref<Service[]> = ref([])

  async createService(service: Service): Promise<Service> {
    const resp = await APIClient.ServiceService.serviceCreate(serviceEntityToCreateSchema(service))
    return serviceSchemaToEntity(resp.data as ServiceSchema)
  }

  async updateService(service: Service): Promise<Service> {
    if (!service.id) {
      throw Error('Cannot update service, missing id')
    }
    const resp = await APIClient.ServiceService.serviceUpdate(
      service.id,
      serviceEntityToUpdateSchema(service)
    )
    return serviceSchemaToEntity(resp.data as ServiceSchema)
  }

  async getServices(companyId: string): Promise<Service[]> {
    const resp = await APIClient.ServiceService.serviceList(companyId)
    this.services.value = (resp.data as ServiceSchema[]).map(serviceSchemaToEntity)
    return this.services.value
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.value.find((x) => x.id === id)
  }
}
