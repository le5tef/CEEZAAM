import type {
  ICompanyColorsSettings,
  ICompanyColorsSettingsData,
} from '@/entities/settings/company_colors.types'

export class CompanyColorsSettings implements ICompanyColorsSettings {
  logo: File | null
  primary_color: string
  accent_color: string

  constructor(data: ICompanyColorsSettingsData) {
    Object.assign(this, data)
  }
}
