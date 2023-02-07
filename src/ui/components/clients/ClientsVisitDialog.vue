<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { ref } from 'vue'
import { useDialogStore } from '@/store/dialog'
import { useClientsStore } from '@/store/clients'
import { useUiStore } from '@/store'
import { useCompanyStore } from '@/store/company'
import { useEmployeesStore } from '@/store/employees'
import type { FormInstance, FormRules } from 'element-plus'

const companyStore = useCompanyStore()
const employeesStore = useEmployeesStore()
const dialogStore = useDialogStore()
const uiStore = useUiStore()
const clientsStore = useClientsStore()

const rules = ref<FormRules>({
  office: [
    {
      required: true,
      message: 'Выберите салон',
      trigger: 'blur',
    },
  ],
  master: [
    {
      required: true,
      message: 'Выберите мастера',
      trigger: 'blur',
    },
  ],
  date: [
    {
      required: true,
      message: 'Выберите дату',
      trigger: 'blur',
    },
  ],
  time: [
    {
      required: true,
      message: 'Выберите время',
      trigger: 'blur',
    },
  ],
})

const stateDefault = Object.freeze({
  office: null as string | null,
  date: new Date() as Date,
  master: null as string | null,
  time: null as string | null,
})

const formRef = ref<FormInstance>()

const timeOptions = ['08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00']

const state = ref<typeof stateDefault>({ ...stateDefault })
const dialogName = 'ClientsVisit'

const closeDialog = () => {
  state.value = { ...stateDefault }
  dialogStore.closeDialog(dialogName)
}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const form_valid = await formEl.validate()
  if (form_valid && formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      //todo: реинит стора с визитами
      closeDialog()
    })
  }
}
</script>

<template>
  <Modal :fullscreen="!!uiStore.isMobileWidth" :name="dialogName" :width="612">
    <template #title>
      <div :class="['heading', 'font-18']">Запись {{ clientsStore.tempClientFullName }}</div>
    </template>
    <template #content>
      <div>
        <el-form ref="formRef" :model="state" :rules="rules" label-position="top" @submit.prevent>
          <el-form-item label="Салон" prop="office">
            <el-select v-model="state.office" size="large">
              <el-option
                v-for="office in companyStore.currentCompanyOffices"
                :key="office.id"
                :value="office.company_id"
                :label="office.company_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Дата" prop="date">
            <el-date-picker
              v-model="state.date"
              class="w-full"
              placeholder="Выберите дату"
              size="large"
              type="date"
            />
          </el-form-item>
          <el-form-item label="Время" prop="time">
            <el-select
              v-model="state.time"
              :disabled="!(!!state.office || !!state.date)"
              size="large"
            >
              <el-option
                v-for="time in timeOptions"
                :key="time"
                :value="time"
                :label="time"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Мастер" prop="master">
            <el-select
              v-model="state.master"
              :disabled="!(!!state.office || !!state.date)"
              size="large"
            >
              <el-option
                v-for="master in employeesStore.mastersOptions"
                :key="master.value"
                :value="master.value"
                :label="master.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <div :class="['w-full', 'd-flex', uiStore.isMobileWidth ? 'flex-column' : '']">
            <div class="spacer" />
            <button :class="[$style.button, $style.outlined]" type="button" @click="closeDialog">
              Отмена
            </button>
            <button :class="[$style.button, $style.submit]" @click="submit(formRef)">
              Сохранить
            </button>
          </div>
        </el-form>
      </div>
    </template>
  </Modal>
</template>

<style lang="stylus" scoped>
:deep(.el-input)
  width 100% !important

:deep(.el-input__wrapper)
  width 100% !important

:deep(.el-select)
  width 100% !important

:deep(.is-focused.el-select-v2__wrapper .el-select-v2__input-wrapper)
  margin-inline-start 12px

:deep(.el-select-v2__wrapper .el-select-v2__input-wrapper)
  margin-inline-start 0

:deep(.el-form-item__label)
  color $cTextMuted !important
  font-size 14px !important
  line-height 24px !important
</style>

<style lang="stylus" module>

.button
  cursor pointer
  margin-right 4px
  padding 13px 16px 13px 16px
  height 50px
  word-break break-all
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
</style>
