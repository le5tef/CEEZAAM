<script lang="ts" setup>
import { ref } from 'vue'
import UploadInputImage from '@/ui/components/onboarding/UploadInputImage.vue'
import Modal from '@/ui/components/ModalBase.vue'
import { useEmployeesStore } from '@/store/employees'
import { useCompanyStore } from '@/store/company'
import { Logger } from '@/utils'
import { CompanyEmployeeRoleEnum } from '@/client'
import { roleReadable } from '@/services/CompanyService'
import { useDialogStore } from '@/store/dialog'
import type { FormInstance, FormRules } from 'element-plus'

const logger = new Logger({ prefix: 'EmployeesAddEmployeeDialog' })
const employeesStore = useEmployeesStore()
const companyStore = useCompanyStore()
const dialogStore = useDialogStore()

type Employee = {
  avatar: File | null
  firstName: string
  email: string
  role: CompanyEmployeeRoleEnum
  characteristic: string
  description: string
}

const stateDefault = Object.freeze({
  ...({
    avatar: null,
    firstName: '',
    email: '',
    role: CompanyEmployeeRoleEnum.MASTER,
    characteristic: '',
    description: '',
  } as Employee),
})

const formRef = ref<FormInstance>()

const AllowedRoles = [CompanyEmployeeRoleEnum.ADMINISTRATOR, CompanyEmployeeRoleEnum.MASTER]

const state = ref({ ...stateDefault })
const dialogName = 'EmployeesAddEmployee'

const rules = ref<FormRules>({
  firstName: [
    {
      required: true,
      message: 'Введите имя',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Введите почту',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'Введите корректную почту',
      trigger: ['blur', 'change'],
    },
  ],
})

async function submit(formEl: FormInstance | undefined) {
  if (!formEl) return
  const form_valid = await formEl.validate()
  if (form_valid && formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      if (!companyStore.currentCompany?.id || !companyStore.currentCompanyOffice?.id) {
        const err = Error('Company or office not selected')
        logger.error('submit()', err)
        throw err
      }

      const employeeResponse = await employeesStore.addEmployee({
        role: state.value.role,
        attached_office_id: companyStore.currentCompanyOffice.id,
        characteristic: state.value.characteristic,
        description: state.value.description,
        user: {
          email: state.value.email,
          first_name: state.value.firstName,
        },
      })

      if (employeeResponse.is_success && employeeResponse.data) {
        if (state.value.avatar !== null) {
          await employeesStore.setEmployeeAvatar(employeeResponse.data.id, state.value.avatar)
        }
        await employeesStore.fetchCompanyEmployees(companyStore.currentCompany.id)
        closeDialog()
      }
    })
  }
}

function closeDialog() {
  state.value = { ...stateDefault }
  dialogStore.closeDialog(dialogName)
}

function handleEmployeeImage(file: File | null) {
  state.value.avatar = file
}
</script>

<template>
  <Modal :name="dialogName" :width="612">
    <template #title>
      <div :class="['heading', 'font-18']">Добавить сотрудника</div>
    </template>
    <template #content>
      <el-form
        ref="formRef"
        :class="$style.inputs"
        :model="state"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <el-form-item>
          <div class="d-flex justify-space-between align-start w-full">
            <UploadInputImage
              :acceptable-extensions="'image/png'"
              :closable="true"
              @change="handleEmployeeImage($event)"
            />
          </div>
        </el-form-item>
        <el-form-item label="Имя" prop="firstName">
          <el-input v-model="state.firstName" size="large" />
        </el-form-item>
        <el-form-item label="Роль" prop="role">
          <el-radio-group v-model="state.role" size="large" style="margin-bottom: 18px">
            <el-radio-button v-for="role in AllowedRoles" :key="role" :label="role">
              {{ roleReadable(role) }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="state.email" size="large" />
        </el-form-item>
        <el-form-item label="Характеристика">
          <el-input v-model="state.characteristic" placeholder="Стажер" size="large" />
        </el-form-item>
        <el-form-item label="Описание">
          <el-input v-model="state.description" size="large" />
        </el-form-item>
      </el-form>

      <button :class="[$style.submit, $style.button]" @click="submit(formRef)">Далее</button>
      <button :class="[$style.outlined, $style.button]">Назад</button>
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
</style>
