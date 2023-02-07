import type {
  Body_company__create,
  Body_company__update,
  CompanyEmployeeWithUserSchema,
  CompanyOfficeSchema,
  CompanySchema,
  CreateCompanyOfficeSchema,
  UpdateCompanyOfficeSchema,
} from '@/client'
import { AuthService, CompanyService } from '@/services'
import { defineAutoInitStore } from './utils'

export const useCompanyStore = defineAutoInitStore('company', {
  state: () => ({
    isInitInProgress: false,
    companies: null as CompanySchema[] | null,
    companiesEmployees: [] as { companyId: string; employees: CompanyEmployeeWithUserSchema[] }[],
    companiesOffices: [] as { companyId: string; offices: CompanyOfficeSchema[] }[],
    currentCompanyId: undefined as string | undefined,
    currentOfficeId: undefined as string | undefined,
    ready: false,
  }),
  getters: {
    currentCompany(): CompanySchema | null {
      return this.companies?.find((x) => x.id === this.currentCompanyId) || null
    },
    currentCompanyEmployees(): CompanyEmployeeWithUserSchema[] | null {
      if (this.currentCompany) {
        const companyId = this.currentCompany.id
        return this.companiesEmployees.find((x) => x.companyId === companyId)?.employees || []
      }
      return null
    },
    currentCompanyOffices(): CompanyOfficeSchema[] | null {
      if (this.currentCompany) {
        const companyId = this.currentCompany.id
        return this.companiesOffices.find((x) => x.companyId === companyId)?.offices || []
      }
      return null
    },
    currentCompanyOfficesOptions(): { label: string; value: string }[] {
      return (
        this.currentCompanyOffices?.map((x) => {
          return {
            label: x.address_note || x.id,
            value: x.id,
          }
        }) || []
      )
    },
    currentCompanyOffice(): CompanyOfficeSchema | null {
      return this.currentCompanyOffices?.find((x) => x.id === this.currentOfficeId) || null
    },
    findOfficeById(): (id: string) => CompanyOfficeSchema | null {
      return (id: string) => this.currentCompanyOffices?.find((x) => x.id === id) || null
    },
    findOfficeNameById(): (id: string) => string {
      return (id: string) =>
        this.currentCompanyOffices?.find((x) => x.id === id)?.address_note || ''
    },
  },
  actions: {
    async init() {
      this.isInitInProgress = true
      if (AuthService.isAuthorized()) {
        await this.fetchCompanies()
        this.currentCompanyId =
          (this.companies && this.companies.length > 0 && this.companies[0].id) || undefined
        if (this.currentCompany?.id) {
          await this.fetchCompanyOffices(this.currentCompany.id)
          this.currentOfficeId =
            (this.currentCompanyOffices &&
              this.currentCompanyOffices.length &&
              this.currentCompanyOffices[0].id) ||
            undefined
        }
      }
      this.isInitInProgress = false
      this.ready = true
    },

    async createCompany(data: Body_company__create) {
      const company = (await CompanyService.createCompany(data)).data
      if (company) {
        this.companies = [company]
        this.currentCompanyId = company.id
      }
      return company
    },
    async updateCompany(id: string, data: Body_company__update) {
      const company = (await CompanyService.updateCompany(id, data)).data
      if (company) {
        this.companies = [company]
        this.currentCompanyId = company.id
      }
      return company
    },
    async fetchCompanies() {
      try {
        const resp = await CompanyService.listCompany()
        if (resp.is_success && resp.data) {
          this.companies = resp.data
        }
      } catch {
        this.companies = null
      }
    },
    async createOffice(data: CreateCompanyOfficeSchema) {
      return await CompanyService.createOffice(data)
    },
    async updateOffice(id: string, data: UpdateCompanyOfficeSchema) {
      return await CompanyService.updateOffice(id, data)
    },
    async fetchCompanyOffices(companyId: string) {
      const resp = await CompanyService.listOffices(companyId)
      if (resp.is_success && resp.data) {
        this.companiesOffices = this.companiesOffices.filter((x) => x.companyId !== companyId)
        this.companiesOffices.push({ companyId, offices: resp.data })
      }
    },
  },
})
