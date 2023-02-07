<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import UploadInputImage from '@/ui/components/onboarding/UploadInputImage.vue'
import { useEmployeesStore } from '@/store/employees'
import Modal from '@/ui/components/ModalBase.vue'
import { useDialogStore } from '@/store/dialog'
import { buildMediaUrl } from '@/utils/mediaUrl'
import { CompanyEmployeeRoleEnum } from '@/client'
import { roleReadable } from '@/services/CompanyService'

const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()

const dialogName = 'EmployeesCustomEmployee'
const stateDefault = Object.freeze({
  avatar: null as File | null,
  name: '' as string,
  role: null as CompanyEmployeeRoleEnum | null,
  characteristic: '' as string,
  description: '' as string,
})
const state = ref({ ...stateDefault })
const AllowedRoles = [CompanyEmployeeRoleEnum.ADMINISTRATOR, CompanyEmployeeRoleEnum.MASTER]

watch(() => employeesStore.selectedEmployee, parseSelected)

function parseSelected() {
  if (employeesStore.selectedEmployee) {
    state.value.name = employeesStore.selectedEmployee.user.first_name || ''
    state.value.role = employeesStore.selectedEmployee.role
    state.value.characteristic = employeesStore.selectedEmployee.characteristic
    state.value.description = employeesStore.selectedEmployee.description
  }
}

const currentSrc = computed(() =>
  employeesStore.selectedEmployee?.avatar
    ? buildMediaUrl(employeesStore.selectedEmployee.avatar)
    : undefined
)

async function submit() {
  if (!employeesStore.selectedEmployeeId || state.value.role === null) {
    throw Error()
  }

  await employeesStore.updateEmployee(employeesStore.selectedEmployeeId, {
    role: state.value.role,
    characteristic: state.value.characteristic,
    description: state.value.description,
    user: {
      first_name: state.value.name,
    },
  })
  if (state.value.avatar) {
    await employeesStore.setEmployeeAvatar(employeesStore.selectedEmployeeId, state.value.avatar)
  }
  closeDialog()
  await employeesStore.fetchCompanyEmployees()
}

function handleEmployeeImage(file: File | null) {
  state.value.avatar = file
}

const closeDialog = () => {
  dialogStore.closeDialog(dialogName)
}
</script>

<template>
  <Modal :width="612" :name="dialogName">
    <template #title>
      <div :class="['heading', 'font-18']">Редактировать сотрудника</div>
    </template>
    <template #content>
      <div v-if="employeesStore.selectedEmployee" class="d-flex">
        <UploadInputImage
          :full-width-size="false"
          :closable="true"
          :current-src="currentSrc"
          @change="handleEmployeeImage($event)"
        />
      </div>
      <el-form :class="$style.inputs" label-position="top" @submit.prevent>
        <el-form-item label="Имя*">
          <el-input v-model="state.name" size="large" />
        </el-form-item>
        <el-form-item label="Роль*">
          <el-radio-group v-model="state.role" size="large" style="margin-bottom: 18px">
            <el-radio-button v-for="role in AllowedRoles" :key="role" :label="role">
              {{ roleReadable(role) }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Характеристика">
          <el-input v-model="state.characteristic" size="large" placeholder="Стажер" />
        </el-form-item>
        <el-form-item label="Описание">
          <el-input v-model="state.description" size="large" />
        </el-form-item>
      </el-form>

      <div :class="$style.actions">
        <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
        <button :class="[$style.button, $style.submit]" @click="submit">Сохранить</button>
      </div>
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

.button
  cursor pointer
  margin 0 24px 16px 0
  padding 0 20px
  width 180px
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
  @media (max-width: $tabletVerWidth)
    width 100%
    margin 0 0 16px 0

.primary
  color $cPrimary !important
  font-weight 700
  font-family Verdana

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
