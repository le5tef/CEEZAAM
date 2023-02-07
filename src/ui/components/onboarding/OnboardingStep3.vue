<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router'
import { ROUTES_PATHS } from '@/constants'
import UploadInputImage from '@/ui/components/onboarding/UploadInputImage.vue'
import { Close, Plus } from '@element-plus/icons-vue'
import { CompanyEmployeeRoleEnum } from '@/client'
import type { EmployeeSchema } from '@/store/onboarding'
import { useOnboardingStore } from '@/store/onboarding'
import { useUserStore } from '@/store/user'

const onboardingStore = useOnboardingStore()
const userStore = useUserStore()

class Administrator {
  email: string

  constructor(email?: string) {
    this.email = email || ''
  }
}

class Assistant {
  avatar: File | null
  firstName: string
  email: string
  characteristic: string
  description: string

  constructor(firstName?: string, email?: string, characteristic?: string, description?: string) {
    this.firstName = firstName || ''
    this.email = email || ''
    this.characteristic = characteristic || ''
    this.description = description || ''
  }
}

const stateDefault = Object.freeze({
  test: '',
  assistants: [new Assistant()],
  administrators: [new Administrator()],
})
const state = ref({ ...stateDefault })

async function submit() {
  const employees: EmployeeSchema[] = []

  state.value.administrators.map((x) =>
    employees.push({
      avatar: null,
      role: CompanyEmployeeRoleEnum.ADMINISTRATOR,
      characteristic: '',
      description: '',
      user: { email: x.email },
    })
  )

  state.value.assistants.map((x) =>
    employees.push({
      avatar: x.avatar,
      role: CompanyEmployeeRoleEnum.MASTER,
      characteristic: x.characteristic,
      description: x.description,
      user: { email: x.email, first_name: x.firstName },
    })
  )

  await onboardingStore.saveEmployees(employees)
  await userStore.updateUser({ is_onboarding_finished: true })

  await router.push(ROUTES_PATHS.ONBOARDING_STEP_4)
}

function goToPreviousPage() {
  router.push(ROUTES_PATHS.ONBOARDING_STEP_2)
}

async function goToNextPage() {
  await userStore.updateUser({ is_onboarding_finished: true })
  await router.push(ROUTES_PATHS.ONBOARDING_STEP_4)
}

function addAssistant() {
  state.value.assistants.push(new Assistant())
}

function removeAssistant(id: number) {
  state.value.assistants = state.value.assistants.filter((x, index) => {
    return index !== id
  })
}

function handleAssistantImage(id: number, file: File | null) {
  state.value.assistants[id].avatar = file
}

function addAdministrator() {
  state.value.administrators.push(new Administrator())
}

function removeAdministrator(id: number) {
  state.value.administrators = state.value.administrators.filter((x, index) => {
    return index !== id
  })
}
</script>

<template>
  <div>
    <el-row :class="$style.root" :gutter="24">
      <el-col :class="$style.assistants" :sm="12" :span="24">
        <div :class="['heading', 'font-18']">Мастера</div>
        <div v-for="(assistant, id) in state.assistants" :key="id">
          <el-divider v-if="id !== 0"></el-divider>
          <el-form :class="$style.inputs" label-position="top" @submit.prevent>
            <el-form-item>
              <div class="d-flex justify-space-between align-start w-full">
                <UploadInputImage
                  :acceptable-extensions="'image/png'"
                  :closable="true"
                  @change="handleAssistantImage(id, $event)"
                />

                <button v-if="state.assistants.length > 1" @click="removeAssistant(id)">
                  <el-icon>
                    <Close />
                  </el-icon>
                </button>
              </div>
            </el-form-item>
            <el-form-item label="Имя*">
              <el-input v-model="assistant.firstName" size="large" />
            </el-form-item>
            <el-form-item label="Email*">
              <el-input v-model="assistant.email" size="large" />
            </el-form-item>
            <el-form-item label="Характеристика">
              <el-input v-model="assistant.characteristic" size="large" />
            </el-form-item>
            <el-form-item label="Описание">
              <el-input v-model="assistant.description" size="large" />
            </el-form-item>
          </el-form>
        </div>
        <el-button :class="$style.primary" text @click="addAssistant()">
          <el-icon size="10">
            <Plus></Plus>
          </el-icon>
          Добавить мастера
        </el-button>
      </el-col>
      <el-col :sm="12" :span="24">
        <div :class="['heading', 'font-18']">Администраторы</div>
        <el-form label-position="top">
          <div
            v-for="(administrator, id) in state.administrators"
            :key="id"
            class="d-flex align-center"
          >
            <el-form-item label="Email" style="width: 100%">
              <el-input v-model="administrator.email" size="large" />
            </el-form-item>
            <button v-if="state.administrators.length > 1" @click="removeAdministrator(id)">
              <el-icon>
                <Close />
              </el-icon>
            </button>
          </div>
        </el-form>
        <el-button :class="$style.primary" text @click="addAdministrator()">
          <el-icon size="10">
            <Plus></Plus>
          </el-icon>
          Добавить админстратора
        </el-button>
      </el-col>
    </el-row>
    <button :class="[$style.submit, $style.button]" @click="submit()">Далее</button>
    <button :class="[$style.outlined, $style.button]" @click="goToPreviousPage()">Назад</button>
    <button :class="[$style.outlined, $style.button]" @click="goToNextPage()">Заполню позже</button>
  </div>
</template>

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
