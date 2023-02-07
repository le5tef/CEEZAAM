<script lang="ts" setup>
import { useEmployeesStore } from '@/store/employees'
import { useDialogStore } from '@/store/dialog'

import Modal from '@/ui/components/ModalBase.vue'
import { computed } from 'vue'
import { roleReadable } from '@/services/CompanyService'
import { useCompanyStore } from '@/store/company'
import { buildMediaUrl } from '@/utils/mediaUrl'

const employeesStore = useEmployeesStore()
const companyStore = useCompanyStore()
const dialogStore = useDialogStore()

const role = computed(() =>
  employeesStore.selectedEmployee ? roleReadable(employeesStore.selectedEmployee.role) : ''
)

const employee = computed(() => employeesStore.selectedEmployee)

const officeName = computed(() =>
  employee.value?.attached_office_id
    ? companyStore.findOfficeNameById(employee.value.attached_office_id)
    : ''
)
</script>

<template>
  <Modal :width="412" name="EmployeesCard">
    <template #title>
      <div v-if="employee" class="d-flex">
        <img
          v-if="employeesStore?.selectedEmployee?.avatar"
          :class="$style.avatar"
          :src="buildMediaUrl(employeesStore.selectedEmployee.avatar)"
          alt=""
        />
        <div v-if="employeesStore.selectedEmployee" class="d-flex flex-column ml-4">
          <div :class="['heading', 'font-18', 'mb-1']">
            {{ employee.user.first_name }}
          </div>
          <div :class="['mb-1']">{{ employee.user.email }}</div>
          <div :class="['mb-1']">
            <div :class="['d-flex', 'align-center']">
              {{ role }}
              <div :class="[$style.description, 'ml-1']">
                {{ employee.characteristic }}
              </div>
            </div>
          </div>
          <div :class="['mb-1']">{{ officeName }}</div>
          <div>{{ employee.description }}</div>
        </div>
      </div>
    </template>
    <template #content>
      <button :class="$style.button" @click="dialogStore.openDialog('EmployeesAbsence')">
        Отметить отсутствие
      </button>
      <button :class="$style.button" @click="dialogStore.openDialog('EmployeesCustomEmployee')">
        Редактировать
      </button>
      <button :class="$style.button" @click="dialogStore.openDialog('EmployeesDismissal')">
        Уволить
      </button>

      <button
        :class="[$style.button, $style.outlined]"
        @click="dialogStore.closeDialog('EmployeesCard')"
      >
        Закрыть
      </button>
    </template>
  </Modal>
</template>
<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important
</style>

<style lang="stylus" module>
.root
  margin-top 24px
  margin-bottom 40px

.assistants
  margin-bottom 20px


.description
  font-weight 400
  font-size 14px
  line-height 24px
  color $cTextMuted

.avatar
  height 120px
  width 120px
  border-radius 8px

.primary
  color $cPrimary !important
  font-weight 700
  font-family Verdana

.button
  cursor pointer
  width 100%
  padding 0 20px
  height 50px
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  order: 0
  flex-grow: 0
  color $cPrimary
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0

.outlined
  border 1px solid $cPrimary
  color $cPrimary
  background: white

.submit
  border none
  color white
  background: $cPrimary

.actions
  display flex
  flex-direction row
  justify-content right
  @media (max-width $tabletVerWidth)
    flex-direction column
</style>
