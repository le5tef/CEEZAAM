<script lang="ts" setup>
import { ref } from 'vue'
import { ROUTES_NAMES, ROUTES_PATHS } from '@/constants'
import router from '@/router'
import { Back } from '@element-plus/icons-vue'
import ClientsGeneralInformationForm from '@/ui/components/clients/ClientsGeneralInformationForm.vue'
import ClientsContactsForm from '@/ui/components/clients/ClientsContactsForm.vue'
import ClientsRelativesForm from '@/ui/components/clients/ClientsRelativesForm.vue'
import ClientsAdditionalInformationForm from '@/ui/components/clients/ClientsAdditionalInformationForm.vue'
import ActionButtons from '@/ui/components/settings/ActionButtons.vue'
import { useClientsStore } from '@/store/clients'
import type { FormRules } from 'element-plus'

const clientsStore = useClientsStore()

const formRef = ref()

const rules = ref<FormRules>({
  'contacts.phone': [
    {
      required: true,
      message: 'Введите телефон',
      trigger: 'blur',
    },
    {
      message: 'Введите корректный телефон',
      trigger: ['blur', 'change'],
      validator: (rule, v) => {
        const phoneRegExp = new RegExp(/^\+7\d{3}\d{7,10}$/)
        return phoneRegExp.test(v)
      },
    },
  ],
  'contacts.email': [
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
  'general.firstName': [
    {
      required: true,
      message: 'Введите имяфф',
      trigger: 'blur',
    },
  ],
})

// const validate = (data: { name: string; isValid: boolean }) => {
//   if (data.isValid) {
//     console.log(data.isValid)
//     validData.value.push(data.name)
//   } else if (validData.value.includes(data.name)) {
//     validData.value = [...validData.value.filter((x) => x !== data.name)]
//   }
//   console.log(validData.value)
// }
// const create = async (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   const form_valid = await formEl.validate()
//   if (form_valid && formRef.value) {
//     await formRef.value.validate(async (valid) => {
//       if (!valid) return
//       await servicesStore.saveTempService()
//       closeDialog()
//     })
//   }
// }
async function create() {
  if (!formRef.value) return
  const form_valid = await formRef.value.validate()
  if (form_valid) {
    const client = await clientsStore.saveTempClient()
    await router.push({
      name: ROUTES_NAMES.CLIENTS_EDIT,
      params: { id: client.id },
    })
  }
  // route.back()
}
</script>

<template>
  <div>
    <div :class="['heading', 'font-26', 'd-flex', 'align-center']">
      <el-button text @click="router.push(ROUTES_PATHS.CLIENTS)">
        <el-icon :size="32">
          <Back />
        </el-icon>
      </el-button>
      <div>Создание нового клиента</div>
    </div>
    <div :class="['mt-12', $style.wrapper]">
      <el-form
        ref="formRef"
        :model="clientsStore.temp"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <ClientsGeneralInformationForm ref="general" />
        <el-divider />
        <ClientsContactsForm ref="contacts" />
        <el-divider />
        <ClientsRelativesForm ref="relatives" />
        <el-divider />
        <ClientsAdditionalInformationForm ref="additional" />
      </el-form>
    </div>
    <ActionButtons @submit="create" @reset="clientsStore.resetTempUser" />
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color: $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important

:deep(.el-checkbox__label)
  word-wrap break-word
  width 100%

:deep(.el-button + .el-button)
  margin-left 0

:deep(.el-tabs__item)
  color: $cTextMuted
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
</style>

<style lang="stylus" module>
.wrapper
  padding 24px
  margin-top 24px
  background white
  overflow auto
  box-shadow 0px 0px 8px 0px rgba(26, 14, 62, 0.25)
  border-radius 8px

.phoneActions
  display flex !important
  justify-content left
  align-items center
  @media (max-width $tabletVerWidth)
    margin-bottom 24px


.description
  font-family: 'Verdana';
  font-style normal
  font-weight 400
  font-size 12px
  line-height 16px
  color $cTextMuted
  margin-bottom 24px
</style>
