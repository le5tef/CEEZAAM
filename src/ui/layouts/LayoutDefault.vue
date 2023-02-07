<script lang="ts" setup>
import SideBar from '@/ui/components/SideBar.vue'
import DefaultHeader from '@/ui/components/DefaultHeader.vue'

import { useUserStore } from '@/store/user'
import { computed } from 'vue'
import { useCompanyStore } from '@/store/company'

const userStore = useUserStore()

const cssVariables = computed(() => {
  const companyStore = useCompanyStore()

  if (!userStore.user) return {}

  if (!companyStore.currentCompany) {
    return {}
  }

  const newShade = (hexColor: string, magnitude: number) => {
    hexColor = hexColor.replace('#', '')
    if (hexColor.length === 6) {
      const decimalColor = parseInt(hexColor, 16)
      let r = (decimalColor >> 16) + magnitude
      r > 255 && (r = 255)
      r < 0 && (r = 0)
      let g = (decimalColor & 0x0000ff) + magnitude
      g > 255 && (g = 255)
      g < 0 && (g = 0)
      let b = ((decimalColor >> 8) & 0x00ff) + magnitude
      b > 255 && (b = 255)
      b < 0 && (b = 0)
      return `#${(g | (b << 8) | (r << 16)).toString(16)}`
    } else {
      return hexColor
    }
  }

  return {
    '--el-color-primary': companyStore.currentCompany.primary_color,
    '--cz-primary-color': companyStore.currentCompany.primary_color,
    '--cz-primary-color-hover': newShade(companyStore.currentCompany.primary_color, -50),

    '--cz-accent-color': companyStore.currentCompany.accent_color,
    '--cz-accent-color-hover': newShade(companyStore.currentCompany.accent_color, -50),
  }
})
</script>

<template>
  <div :style="cssVariables" class="d-flex">
    <SideBar />
    <div class="layout layout-default">
      <DefaultHeader />
      <slot />
    </div>
  </div>
</template>
