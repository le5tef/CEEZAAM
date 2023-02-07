<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { useDialogStore } from '@/store/dialog'
import { useUiStore } from '@/store'
import { useServicesStore } from '@/store/services'
import { useCompanyStore } from '@/store/company'
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const dialogName = 'ServiceEdit'
const dialogStore = useDialogStore()
const servicesStore = useServicesStore()
const uiStore = useUiStore()
const companyStore = useCompanyStore()
const closeDialog = () => {
  dialogStore.closeDialog(dialogName)
}

const serviceRules = ref<FormRules>({
  name: [
    {
      required: true,
      message: 'Введите название',
      trigger: 'blur',
    },
  ],
  offices: [
    {
      required: true,
      message: 'Выберите салоны',
      trigger: 'blur',
      validator: (rule, v) => {
        return !!v.length
      },
    },
  ],
  mastersAmount: [
    {
      required: true,
      message: 'Введите число не равное 0',
      trigger: 'blur',
      validator: (rule, v) => {
        return !!v && !!Number(v)
      },
    },
  ],
  duration: [
    {
      required: true,
      message: 'Введите число не равное 0',
      trigger: 'blur',
      validator: (rule, v) => {
        return !!v && !!Number(v)
      },
    },
  ],
  requiredTimeBefore: [
    {
      required: true,
      message: 'Введите число не равное 0',
      trigger: 'blur',
      validator: (rule, v) => {
        return !!v && !!Number(v)
      },
    },
  ],
  requiredTimeAfter: [
    {
      required: true,
      message: 'Введите число не равное 0',
      trigger: 'blur',
      validator: (rule, v) => {
        return !!v && !!Number(v)
      },
    },
  ],
})

const create = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const form_valid = await formEl.validate()
  if (form_valid && formRef.value) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      await servicesStore.saveTempService()
      closeDialog()
    })
  }
}
</script>

<template>
  <Modal :fullscreen="!!uiStore.isMobileWidth" :name="dialogName" :width="960">
    <template #title>
      <div :class="$style.heading">Создание услуги</div>
    </template>
    <template #content>
      <el-form
        ref="formRef"
        :rules="serviceRules"
        :model="servicesStore.temp"
        class="w-full"
        label-position="top"
        @submit.prevent
      >
        <el-row :gutter="16">
          <el-col :md="5" :sm="12">
            <el-form-item label="Наименование" prop="name">
              <el-input v-model="servicesStore.temp.name" />
            </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12">
            <el-form-item label="Салон" prop="offices">
              <el-select-v2
                v-model="servicesStore.temp.offices"
                :options="companyStore.currentCompanyOfficesOptions"
                clearable
                collapse-tags
                collapse-tags-tooltip
                filterable
                multiple
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :md="14" :sm="24">
            <el-form-item label="Описание услуги">
              <el-input v-model="servicesStore.temp.description" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :md="6" :sm="12">
            <el-form-item label="Количество мастеров" prop="mastersAmount">
              <el-input v-model="servicesStore.temp.mastersAmount" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="Продолжительность услуги" prop="duration">
              <el-input v-model="servicesStore.temp.duration" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="Требуется время после услуги" prop="requiredTimeAfter">
              <el-input v-model="servicesStore.temp.requiredTimeAfter" type="number" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="Требуется время до услуги" prop="requiredTimeBefore">
              <el-input v-model="servicesStore.temp.requiredTimeBefore" type="number" />
            </el-form-item>
          </el-col>
        </el-row>
        <div :class="$style.actions">
          <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
          <button :class="[$style.button, $style.submit]" @click="create(formRef)">Создать</button>
        </div>
      </el-form>
    </template>
  </Modal>
</template>

<style lang="stylus" scoped>
:deep(.is-focused.el-select-v2__wrapper .el-select-v2__input-wrapper)
  margin-inline-start 12px

:deep(.el-select-v2__wrapper .el-select-v2__input-wrapper)
  margin-inline-start 0

:deep(.el-form-item__label)
  color: $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important
</style>

<style lang="stylus" module>
.heading
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 18px
  line-height 24px

.inputs
  display flex
  margin 16px 0
  align-items center
  @media (max-width $tabletHorWidth)
    flex-direction column

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

.actions
  display flex
  flex-direction row
  justify-content right
  @media (max-width $tabletVerWidth)
    flex-direction column
</style>
