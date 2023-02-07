import type { Ref } from 'vue'

import { useLocale } from 'element-plus'
const { t } = useLocale()

export function getApiRuleValidator(field: string, errors: Ref<Record<string, string>>) {
  return () => {
    if (field in errors.value) {
      throw new Error(t(`apiErrors.${errors.value[field]}`))
    }
    return true
  }
}
