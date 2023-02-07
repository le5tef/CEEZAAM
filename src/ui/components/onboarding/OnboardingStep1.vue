<script lang="ts" setup>
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router'
import { ROUTES_PATHS } from '@/constants'
import { useUserStore } from '@/store/user'
import { useOnboardingStore } from '@/store/onboarding'
import { CompanyTypeEnum } from '@/client'
import { useCompanyStore } from '@/store/company'

const userStore = useUserStore()
const companyStore = useCompanyStore()
const onboardingStore = useOnboardingStore()

const formRef = ref<FormInstance>()

const types: { label: string; value: string }[] = []
for (const type in CompanyTypeEnum) {
  const readableName =
    {
      [CompanyTypeEnum.HAIRDRESSING]: 'Парикмахерская',
      [CompanyTypeEnum.MASSAGE]: 'Массаж',
    }[type] || type.toString()
  types.push({ label: readableName, value: type })
}

const stateDefault = Object.freeze({
  types: types,
})
const state = ref<typeof stateDefault>({ ...stateDefault })

const DataRules = ref<FormRules>({
  lastName: [
    {
      required: true,
      message: 'Введите фамилию',
      trigger: 'blur',
    },
  ],
  firstName: [
    {
      required: true,
      message: 'Введите имя',
      trigger: 'blur',
    },
  ],
  patronymic: [
    {
      required: false,
      message: 'Введите отчество',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: 'Введите тип салона',
      trigger: 'blur',
    },
  ],
  seatsQuantity: [
    {
      required: true,
      message: 'Введите количество рабочих мест',
      trigger: 'blur',
      validator: (rule, v) => {
        return !!v && !Number.isNaN(Number.isInteger(v))
      },
    },
  ],
  name: [
    {
      required: true,
      message: 'Введите название',
      trigger: 'blur',
    },
  ],
})

const dataForm = ref({
  lastName: '',
  firstName: '',
  patronymic: '',
  type: CompanyTypeEnum.HAIRDRESSING as CompanyTypeEnum,
  seatsQuantity: '',
  name: '' as string,
})

if (userStore.user) {
  dataForm.value.firstName = userStore.user.first_name || ''
  dataForm.value.lastName = userStore.user.last_name || ''
  dataForm.value.patronymic = userStore.user.middle_name || ''
}

if (companyStore.currentCompany) {
  dataForm.value.type = companyStore.currentCompany.type
  dataForm.value.name = companyStore.currentCompany.title
}
if (companyStore.currentCompanyOffice) {
  dataForm.value.seatsQuantity = companyStore.currentCompanyOffice.workplaces_count.toString()
}

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const form_valid = await formEl.validate()
  if (form_valid && formRef.value && dataForm.value.seatsQuantity) {
    await formRef.value.validate(async (valid) => {
      if (!valid) return
      await userStore.updateUser({
        first_name: dataForm.value.firstName,
        middle_name: dataForm.value.patronymic,
        last_name: dataForm.value.lastName,
      })
      onboardingStore.updateCompany({
        type: dataForm.value.type,
        title: dataForm.value.name,
      })
      onboardingStore.updateOffice({
        workplaces_count: parseInt(dataForm.value.seatsQuantity),
      })
      await router.push(ROUTES_PATHS.ONBOARDING_STEP_2)
    })
  }
}
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :class="$style.inputs"
      :model="dataForm"
      :rules="DataRules"
      label-position="top"
      @submit.prevent
    >
      <el-row :class="$style.root" :gutter="20">
        <el-col :class="$style.box" :sm="12" :span="24">
          <div :class="['heading', 'font-18']">Привет, как тебя зовут?</div>

          <el-form-item label="Фамилия" prop="lastName">
            <el-input v-model="dataForm.lastName" size="large" />
          </el-form-item>
          <el-form-item label="Имя" prop="firstName">
            <el-input v-model="dataForm.firstName" size="large" />
          </el-form-item>
          <el-form-item label="Отчество">
            <el-input v-model="dataForm.patronymic" size="large" />
          </el-form-item>
        </el-col>
        <el-col :class="$style.box" :sm="12" :span="24">
          <div :class="['heading', 'font-18']">Какой у тебя салон?</div>

          <el-form-item label="Тип" prop="type">
            <el-select v-model="dataForm.type" size="large" style="width: 100%">
              <el-option
                v-for="(type, id) in state.types"
                :key="id"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Количество рабочих мест" prop="seatsQuantity">
            <el-input v-model="dataForm.seatsQuantity" type="number" size="large" />
          </el-form-item>
          <el-form-item label="Название" prop="name">
            <el-input v-model="dataForm.name" size="large" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-button :class="$style.submit" color="#BB01FF" size="large" @click="submit(formRef)">
        Далее
      </el-button>
    </el-form>
  </div>
</template>

<style lang="stylus" module>
.root
  //
.box
  //

.inputs
  margin-top 24px
  margin-bottom 40px

.submit
  text-decoration none
  height 60px
  width 150px
  font-weight 700
  font-size 14px
  margin-bottom 20px
  @media (max-width: $tabletVerWidth)
    width 100%
</style>
