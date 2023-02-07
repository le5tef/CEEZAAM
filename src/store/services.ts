import { Service } from '@/entities/services'
import { Logger } from '@/utils'
import { toRaw } from 'vue'

import { defineAutoInitStore } from '@/store/utils'
import { useServicesService } from '@/services/services'
import { useCompanyStore } from '@/store/company'

const servicesService = useServicesService()
const serviceDefault = Service.empty()

const logger = new Logger({ prefix: 'ServicesStore' })

export const useServicesStore = defineAutoInitStore('services', {
  state: () => ({
    isInitInProgress: false as boolean,
    ready: false as boolean,
    search: null as string | null,
    temp: structuredClone(serviceDefault) as Service,
    selectedServiceId: null as string | null,
    selectedService: undefined as Service | undefined,
  }),
  getters: {
    services(): Service[] {
      return servicesService.services.value
    },
    servicesOptions(): { label: string; value: string }[] {
      return this.services.map((x) => {
        return {
          label: x.name,
          value: x.id as string,
        }
      })
    },
    filteredServices(): Service[] {
      return servicesService.services.value.filter((service) => {
        if (this.search) return service.name.toLowerCase().includes(this.search.toLowerCase())
        else return this.services
      })
    },
    findServiceById(): (id: string) => Service | null {
      return (id: string) => this.services?.find((x) => x.id === id) || null
    },
  },
  actions: {
    async init() {
      if (this.ready) throw Error('Ready now')
      if (this.isInitInProgress) throw Error('Init already in progress')
      this.isInitInProgress = true
      try {
        await Promise.all([this.fetchServices()])
      } catch (e) {
        logger.error('Cannot initialize store', e)
      }
      this.ready = true
      this.isInitInProgress = false
    },
    setSearch(val: string) {
      this.search = val
    },
    async fetchServices() {
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompany?.id) {
        throw Error('Cannot fetch services, select company first')
      }
      await servicesService.getServices(companyStore.currentCompany.id)
    },
    async fetchSelectedService() {
      if (!this.selectedServiceId) {
        throw Error('Cannot fetch, Client not selected')
      }
      this.selectedService = await servicesService.getService(this.selectedServiceId)
    },
    copySelectedServiceToTemp() {
      this.temp = structuredClone(toRaw(this.selectedService))
    },
    resetTempService() {
      this.temp = structuredClone(serviceDefault)
    },
    async saveTempService() {
      if (this.temp.id) {
        await servicesService.updateService(this.temp)
      } else {
        const companyStore = useCompanyStore()
        if (!companyStore.currentCompany?.id) {
          throw Error('Cannot create service, select company first')
        }
        this.temp.companyId = companyStore.currentCompany.id
        await servicesService.createService(this.temp)
      }
      await this.fetchServices()
    },
    async setSelectedService(id: string) {
      this.selectedServiceId = id
      await this.fetchSelectedService()
      this.copySelectedServiceToTemp()
    },
  },
})
