import type {
  CompanyEmployeeWithUserSchema,
  CreateCompanyEmployeeSchema,
  CreateEmployeeDayoffSchema,
  UpdateCompanyEmployeeSchema,
} from '@/client'
import { CompanyEmployeeRoleEnum } from '@/client'
import { defineAutoInitStore } from './utils'
import { CompanyService } from '@/services'
import { useCompanyStore } from '@/store/company'

type MotivationScheme = {
  title: string
  description: string
}

const testMotivations = [
  {
    title: 'Продажа абонемента',
    description: '1000 RUB для всех мастеров',
  },
  {
    title: 'Продажа абонемента',
    description: '1000 RUB для всех мастеров',
  },
]

export const useEmployeesStore = defineAutoInitStore('employees', {
  state: () => ({
    isInitInProgress: false,
    ready: false,
    selectedEmployeeId: null as string | null,
    showMasters: true,
    motivations: [...testMotivations] as MotivationScheme[],
  }),
  getters: {
    selectedEmployee(): CompanyEmployeeWithUserSchema | null {
      return this.employees.find((x) => x.id === this.selectedEmployeeId) || null
    },
    employees(): CompanyEmployeeWithUserSchema[] {
      const companyStore = useCompanyStore()
      return companyStore.currentCompanyEmployees || []
    },
    employeesNames(): { label: string; value: string }[] | null {
      let names = []
      names = this.employees.map((x) => {
        return {
          label: `${x.user.first_name} ${x.user.last_name}`,
          value: x.id,
        }
      })
      return names
    },
    admins(): CompanyEmployeeWithUserSchema[] | null {
      let admins = []
      admins = this.employees.filter((x) => {
        return x.role === CompanyEmployeeRoleEnum.ADMINISTRATOR
      })
      return admins
    },
    masters(): CompanyEmployeeWithUserSchema[] | null {
      let masters = []
      masters = this.employees.filter((x) => {
        return x.role === CompanyEmployeeRoleEnum.MASTER
      })
      return masters
    },
    mastersOptions(): { label: string; value: string }[] | null {
      if (!this.masters) return []
      return this.masters.map((x) => {
        return {
          label: `${x.user?.first_name} ${x.user?.last_name}`,
          value: x.id,
        }
      })
    },
    displayedEmployees(): CompanyEmployeeWithUserSchema[] | null {
      if (this.showMasters) return this.masters
      return this.admins
    },
    worksEmployees(): CompanyEmployeeWithUserSchema[] | null {
      return this.employees.filter((x) => {
        return !x.active_dayoff
      })
    },
  },
  actions: {
    async init() {
      this.isInitInProgress = true
      await this.fetchCompanyEmployees()
      this.isInitInProgress = false
      this.ready = true
    },
    async fetchCompanyEmployees(companyId: string | null = null) {
      const companyStore = useCompanyStore()

      if (companyId === null) {
        if (!companyStore.currentCompany?.id) {
          throw Error('Company must be selected if companyId not provided')
        }
        companyId = companyStore.currentCompany.id as string
      }
      const resp = await CompanyService.listCompanyEmployees(companyId)
      if (resp.is_success && resp.data) {
        companyStore.companiesEmployees = companyStore.companiesEmployees.filter(
          (x) => x.companyId !== companyId
        )
        companyStore.companiesEmployees.push({
          companyId,
          employees: resp.data,
        })
      }
    },
    async addEmployee(data: CreateCompanyEmployeeSchema) {
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompany) throw Error()
      return await CompanyService.createCompanyEmployee(companyStore.currentCompany.id, data)
    },
    async updateEmployee(id: string, data: UpdateCompanyEmployeeSchema) {
      return await CompanyService.updateCompanyEmployee(id, data)
    },
    async setEmployeeAvatar(id: string, file: File) {
      return await CompanyService.setEmployeeAvatar(id, file)
    },
    async setEmployeeDayOff(id: string, data: CreateEmployeeDayoffSchema) {
      return await CompanyService.employeeSetDayOff(id, data)
    },
    async employeeDismiss(id: string) {
      return await CompanyService.employeeDismiss(id)
    },
    setShowMasters(val: boolean) {
      this.showMasters = val
    },
    setSelectedEmployee(val: CompanyEmployeeWithUserSchema) {
      if (!this.employees.find((x) => x.id === val.id)) {
        throw Error('Cannot select non-existent employee (id not presented in employees)')
      }
      this.selectedEmployeeId = val.id
    },
  },
})
