import { defineStore } from 'pinia'
import type { CompanyEmployeeRoleEnum, CompanyTypeEnum } from '@/client'
import { useCompanyStore } from '@/store/company'
import { useEmployeesStore } from '@/store/employees'
import { useUserStore } from '@/store/user'
import { initStores } from '@/utils/clientUiHandler'

export type CompanyUpdate = {
  type?: CompanyTypeEnum
  title?: string
  logo?: File | null
  primary_color?: string
  accent_color?: string
}

export type Company = {
  type: CompanyTypeEnum
  title: string
  logo: File
  primary_color: string
  accent_color: string
}

export type OfficeUpdate = {
  workplaces_count?: number
}

export type Office = {
  workplaces_count: number
}

export type EmployeeSchema = {
  avatar: File | null
  role: CompanyEmployeeRoleEnum
  characteristic: string
  description: string
  user: {
    email: string
    password?: string
    first_name?: string
    last_name?: string
    middle_name?: string
  }
}

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    company: {} as Company,
    office: {} as Office,
  }),
  getters: {
    companyFirstStepFinished(): boolean {
      const companyStore = useCompanyStore()
      return !!(companyStore.currentCompany || (this.company.type && this.company.title))
    },
    userFirstStepFinished(): boolean {
      const userStore = useUserStore()
      return !!(userStore.user && userStore.user.first_name && userStore.user.last_name)
    },
    firstStepFinished(): boolean {
      return this.companyFirstStepFinished && this.userFirstStepFinished
    },
  },
  actions: {
    updateCompany(company: CompanyUpdate) {
      this.company = Object.assign(this.company, company)
    },
    updateOffice(office: OfficeUpdate) {
      this.office = Object.assign(this.office, office)
    },
    async saveCompany() {
      const companyData = {
        title: this.company.title,
        logo: this.company.logo,
        type: this.company.type,
        primary_color: this.company.primary_color,
        accent_color: this.company.accent_color,
      }

      const companyStore = useCompanyStore()
      if (companyStore.currentCompany?.id) {
        return await companyStore.updateCompany(companyStore.currentCompany.id, companyData)
      } else {
        return await companyStore.createCompany(companyData)
      }
    },
    async saveOffice() {
      const companyStore = useCompanyStore()

      if (companyStore.currentCompanyOffice) {
        await companyStore.updateOffice(companyStore.currentCompanyOffice.id, {
          ...companyStore.currentCompanyOffice,
          workplaces_count: this.office.workplaces_count,
        })
      } else if (companyStore.currentCompany) {
        await companyStore.createOffice({
          workplaces_count: this.office.workplaces_count,
          company_id: companyStore.currentCompany.id,
        })
      } else {
        throw Error('Unknown error')
      }

      initStores().then()
    },
    async saveEmployees(employeesData: EmployeeSchema[]) {
      const employeesStore = useEmployeesStore()
      for (let k = 0; k < employeesData.length; k += 1) {
        const empData = employeesData[k]

        const empResp = await employeesStore.addEmployee({
          role: empData.role,
          characteristic: empData.characteristic,
          description: empData.characteristic,
          user: empData.user,
        })

        if (empData.avatar && empResp.is_success && empResp.data) {
          await employeesStore.setEmployeeAvatar(empResp.data.id, empData.avatar)
        }
      }
    },
  },
})
