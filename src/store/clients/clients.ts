import { Client, ClientsCategory, ClientsFilter } from '@/entities/clients'
import { Logger, reportError } from '@/utils'
import { useClientsService } from '@/services'
import { useCompanyStore } from '@/store/company'
import { useClientsFiltersStore } from '@/store/clients/filters'
import { toRaw } from 'vue'

import { defineAutoInitStore } from '@/store/utils'
import { ApiError } from '@/client'
import { BoolEnum, ClientFilterSexEnum, SexEnum } from '@/enums'
import dayjs from 'dayjs'

const clientDefault = Client.empty()

const logger = new Logger({ prefix: 'ClientsStore' })

export const useClientsStore = defineAutoInitStore('clients', {
  state: () => ({
    isInitInProgress: false as boolean,
    ready: false as boolean,
    clients: [] as Client[],
    clientsLoading: false as boolean,
    temp: structuredClone(clientDefault) as Client,
    categories: [] as ClientsCategory[],
    selectedClientId: null as string | null,
    selectedClient: null as Client | null,
  }),
  getters: {
    findClientById(): (id: string) => Client | null {
      return (id: string) => this.clients?.find((x) => x.id === id) || null
    },
    categoriesOptions(): { value: string; label: string }[] {
      return this.categories.map((x) => {
        return {
          label: x.name,
          value: x.id as string,
        }
      })
    },
    tempClientFullName(): string {
      return (
        this.temp.general?.lastName +
        ' ' +
        this.temp.general?.firstName +
        ' ' +
        this.temp.general?.patronymic
      )
    },
  },
  actions: {
    async init() {
      if (this.ready) throw Error('Ready now')
      if (this.isInitInProgress) throw Error('Init already in progress')
      this.isInitInProgress = true
      try {
        await Promise.all([this.fetchCategories(), this.fetchClients()])
      } catch (e) {
        logger.error('Cannot initialize store', e)
      }
      this.ready = true
      this.isInitInProgress = false
    },
    async fetchClients() {
      const clientsService = useClientsService()
      const filtersStore = useClientsFiltersStore()
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompany) {
        throw Error('Cannot fetch client before company select')
      }

      const filters = filtersStore.filters
      const dateFormat = 'YYYY-MM-DD'
      const apiFilters = new ClientsFilter({
        company_ids: [companyStore.currentCompany.id],
        page: 1,
        limit: 20,

        search: filters.search || undefined,
        sex: {
          [SexEnum.M]: ClientFilterSexEnum.M,
          [SexEnum.F]: ClientFilterSexEnum.F,
          [SexEnum.ANY]: ClientFilterSexEnum.ANY,
        }[filters.general.sex.value],
        categories: filters.general.categories.length > 0 ? filters.general.categories : undefined,
        email: {
          [BoolEnum.ANY]: undefined,
          [BoolEnum.TRUE]: true,
          [BoolEnum.FALSE]: false,
        }[filters.contacts.hasEmail.value],
        communication_ways: filters.contacts.allowCommunicationWays?.length
          ? filters.contacts.allowCommunicationWays?.map((x) => x.value)
          : undefined,
        know_about_us_from: filters.contacts.howDidYouKnow.value
          ? [filters.contacts.howDidYouKnow.value]
          : undefined,
        last_visit: {
          gt: filters.general.lastVisitPeriod.value.from
            ? dayjs(filters.general.lastVisitPeriod.value.from).format(dateFormat)
            : undefined,
          lt: filters.general.lastVisitPeriod.value.to
            ? dayjs(filters.general.lastVisitPeriod.value.to).format(dateFormat)
            : undefined,
        },
      })

      this.clientsLoading = true
      this.clients = await clientsService.getClients(apiFilters)
      this.clientsLoading = false
    },
    async fetchSelectedClient() {
      const clientsService = useClientsService()
      if (!this.selectedClientId) {
        throw Error('Cannot fetch, Client not selected')
      }
      this.selectedClient = await clientsService.getClient(this.selectedClientId)
    },
    async fetchCategories() {
      const clientsService = useClientsService()
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompany) throw Error('Cannot fetch categories, company not selected')
      this.categories = await clientsService.getCategories(companyStore.currentCompany.id)
    },
    copySelectedClientToTemp() {
      this.temp = structuredClone(toRaw(this.selectedClient))
    },
    resetTempUser() {
      this.temp = structuredClone(clientDefault)
    },
    async saveTempClient(client?: Client): Promise<Client> {
      const clientsService = useClientsService()
      const tempClient = client || this.temp
      try {
        if (tempClient.id) {
          client = await clientsService.updateClient(tempClient)
        } else {
          const companyStore = useCompanyStore()
          this.temp.companyId = companyStore.currentCompany?.id
          client = await clientsService.createClient(tempClient)
        }
        this.fetchClients()
        return client
      } catch (e) {
        if (e instanceof ApiError) {
          reportError(e, { notify: true })
        }
        throw e
      }
    },
    async setSelectedClient(id: string) {
      this.selectedClientId = id
      await this.fetchSelectedClient()
      this.copySelectedClientToTemp()
    },
    addRelative() {
      this.temp.relatives?.push({})
    },
    removeRelative(relativeId: number) {
      if (this.temp.relatives) {
        this.temp.relatives = this.temp.relatives.filter((x, id) => id !== relativeId)
      }
    },
  },
})
