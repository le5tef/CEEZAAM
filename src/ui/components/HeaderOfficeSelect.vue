<script lang="ts" setup>
import { computed } from 'vue'
import { useCompanyStore, useScheduleStore, useServicesStore } from '@/store'
import { useEmployeesStore } from '@/store/employees'
import { storeResetAndInit } from '@/store/utils'

const companyStore = useCompanyStore()

const officesOptions = computed(() => {
  return companyStore.currentCompanyOffices?.map((x) => ({
    label: x.address_note || companyStore.currentCompany?.title || x.id,
    value: x.id,
  }))
})

const officeModel = computed({
  get: () => companyStore.currentOfficeId,
  set: (val?: string) => {
    companyStore.currentOfficeId = val
    storeResetAndInit(useEmployeesStore())
    storeResetAndInit(useScheduleStore())
    storeResetAndInit(useServicesStore())
  },
})
</script>

<template>
  <el-select v-model="officeModel">
    <el-option
      v-for="opt in officesOptions"
      :key="opt.value"
      :label="opt.label"
      :value="opt.value"
    />
  </el-select>
</template>

<style scoped></style>
