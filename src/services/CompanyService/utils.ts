import { CompanyEmployeeRoleEnum } from '@/client'

export function roleReadable(role: CompanyEmployeeRoleEnum) {
  return (
    {
      [CompanyEmployeeRoleEnum.ADMINISTRATOR]: 'Администратор',
      [CompanyEmployeeRoleEnum.MASTER]: 'Мастер',
      [CompanyEmployeeRoleEnum.OWNER]: 'Владелец',
    }[role] || 'Неизвестная роль'
  )
}
