import type {
  Body_company__create,
  Body_company__update,
  CreateCompanyEmployeeSchema,
  CreateCompanyOfficeSchema,
  CreateEmployeeDayoffSchema,
  UpdateCompanyEmployeeSchema,
  UpdateCompanyOfficeSchema,
} from '@/client'
import { CompanyEmployeeService, CompanyOfficeService, CompanyService } from '@/client'
import { Logger } from '@/utils'

const logger = new Logger({ prefix: 'CompanyService/providers' })

export async function createCompany(data: Body_company__create) {
  const response = await CompanyService.companyCreate(data)
  logger.info('createCompany()', response)
  return response
}

export async function updateCompany(company_id: string, data: Body_company__update) {
  const response = await CompanyService.companyUpdate(company_id, data)
  logger.info('updateCompany()', response)
  return response
}

export async function listCompany() {
  const response = await CompanyService.companyList()
  logger.info('listCompany()', response)
  return response
}

export async function createCompanyEmployee(companyId: string, data: CreateCompanyEmployeeSchema) {
  const response = await CompanyEmployeeService.companyEmployeeAdd(companyId, data)
  logger.info('createCompanyEmployee()', response)
  return response
}

export async function updateCompanyEmployee(employeeId: string, data: UpdateCompanyEmployeeSchema) {
  const response = await CompanyEmployeeService.companyEmployeeUpdate(employeeId, data)
  logger.info('updateCompanyEmployee()', response)
  return response
}

export async function setEmployeeAvatar(employeeId: string, file: File) {
  const response = await CompanyEmployeeService.companySetEmployeeAvatar(employeeId, {
    avatar: file,
  })
  logger.info('setEmployeeAvatar()', response)
  return response
}

export async function listCompanyEmployees(companyId: string) {
  const response = await CompanyEmployeeService.companyEmployeeList(companyId)
  logger.info('listCompanyEmployees()', response)
  return response
}

export async function createOffice(data: CreateCompanyOfficeSchema) {
  const response = await CompanyOfficeService.companyOfficeAdd(data)
  logger.info('createOffice()', response)
  return response
}

export async function updateOffice(officeId: string, data: UpdateCompanyOfficeSchema) {
  const response = await CompanyOfficeService.companyOfficeUpdate(officeId, data)
  logger.info('updateOffice()', response)
  return response
}

export async function listOffices(companyId: string) {
  const response = await CompanyOfficeService.companyOfficesList(companyId)
  logger.info('listOffices()', response)
  return response
}

export async function employeeDismiss(employeeId: string) {
  const response = await CompanyEmployeeService.companyEmployeeDismiss(employeeId)
  logger.info('employeeDismiss()', response)
  return response
}

export async function employeeSetDayOff(employeeId: string, data: CreateEmployeeDayoffSchema) {
  const response = await CompanyEmployeeService.companySetEmployeeDayoff(employeeId, { data })
  logger.info('employeeSetDayOff()', response)
  return response
}
