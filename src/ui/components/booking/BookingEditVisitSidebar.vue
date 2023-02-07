<script lang="ts" setup>
import { Client } from '@/entities/clients'
import { ArrowUp, Close, Minus, Plus } from '@element-plus/icons-vue'
import { useCompanyStore, useUiStore } from '@/store'
import { useServicesStore } from '@/store/services'
import { useBookingStore } from '@/store/booking/booking'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useClientsStore } from '@/store/clients'
import { getApiRuleValidator } from '@/utils'
import {
  communicationWaysOptions,
  distanceFiltersOptions,
  favoriteMasterFiltersOptions,
  howDidYYouKnowFiltersOptions,
  sexFiltersOptions,
  useClientsService,
} from '@/services/clients'
import { sourceOptions, typeOptions } from '@/store/booking'
import type { FormInstance, FormRules } from 'element-plus'
import { ApiError } from '@/client'

const servicesStore = useServicesStore()
const uiStore = useUiStore()
const clientsStore = useClientsStore()
const clientsService = useClientsService()
const bookingStore = useBookingStore()
onMounted(() => {
  window.addEventListener('keydown', closeOnEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', closeOnEscape)
})

const closeOnEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') bookingStore.sidebarActive = false
}

const mode = computed<'edit' | 'create'>(() => (bookingStore.temp_visit.id ? 'edit' : 'create'))
const title = computed(
  () =>
    ({
      edit: 'Редактирование визита',
      create: 'Создание визита',
    }[mode.value])
)
const visitRef = ref<FormInstance>()
const clientRef = ref<FormInstance>()
const newClientRef = ref<FormInstance>()
const extendedMode = ref(false)
const newUser = ref(1)

const searchUserLoading = ref<boolean>(false)
const searchUserOptions = ref<
  {
    label: string
    value: string
  }[]
>([])

async function searchUser(query: string) {
  if (!query) return
  const companyStore = useCompanyStore()
  if (!companyStore.currentCompanyId) {
    throw Error('Company not selected')
  }

  searchUserLoading.value = true
  const clients = await clientsService.getClients({
    search: query,
    company_ids: [companyStore.currentCompanyId],
  })
  searchUserOptions.value = clients.map((x) => ({
    label: `${x.general.firstName} ${x.general.lastName}`,
    value: x.id as string,
  }))
  searchUserLoading.value = false
}

const toggleSidebar = () => (bookingStore.sidebarActive = false)

const durationText = computed(() => {
  const totalDuration = servicesStore.services
    .filter((x) => bookingStore.temp_visit.services.includes(x.id as string))
    .reduce(
      (acc, curr) => acc + (curr.duration + curr.requiredTimeBefore + curr.requiredTimeAfter),
      0
    )
  const hours = Math.floor(totalDuration / 60)
  const minutes = Math.floor(totalDuration % 60)

  let str = 'Длительность '
  if (hours > 0) {
    str += `${hours} ч. `
  }
  if (minutes > 0) {
    str += `${minutes} м.`
  }
  return str
})

const errors = ref<Record<string, string>>({})

const submitBtnText = computed(() => {
  return {
    create: 'Создать',
    edit: 'Сохранить',
  }[mode.value]
})

const newClientRules = ref<FormRules>({
  first_name: [
    {
      required: true,
      message: 'Введите имя',
      trigger: ['blur', 'change'],
    },
  ],
  last_name: [
    {
      required: true,
      message: 'Введите фамилию',
      trigger: ['blur', 'change'],
    },
  ],
  phone: [
    {
      required: true,
      message: 'Введите телефон',
      trigger: ['blur', 'change'],
    },
    {
      message: 'Некорректный телефон',
      trigger: ['blur', 'change'],
      validator: (rule, v) => {
        const phoneRegExp = new RegExp(/^\+7\d{3}\d{7,10}$/)
        return phoneRegExp.test(v)
      },
    },
  ],
})

const clientRules = ref<FormRules>({
  client_id: [
    {
      required: true,
      message: 'Выберите клиента',
      trigger: ['blur', 'change'],
    },
  ],
})

watch(
  () => bookingStore.temp_visit,
  () => {
    errors.value = {}
  },
  { deep: true }
)

const visitRules = ref<FormRules>({
  visit_type: [
    {
      required: true,
      message: 'Введите тип визита',
      trigger: ['blur', 'change'],
    },
  ],
  visit_origin: [
    {
      required: true,
      message: 'Введите источник визита',
      trigger: ['blur', 'change'],
    },
  ],
  masters: [
    {
      required: true,
      message: 'Выберите мастера',
      trigger: ['blur', 'change'],
    },
    {
      trigger: ['blur', 'change'],
      validator: getApiRuleValidator('masters', errors),
    },
  ],
  services: [
    {
      required: true,
      message: 'Выберите услугу',
      trigger: ['blur', 'change'],
    },
    {
      trigger: ['blur', 'change'],
      validator: getApiRuleValidator('services', errors),
    },
  ],
  visit_time: [
    {
      required: true,
      message: 'Выберите время',
      trigger: ['blur', 'change'],
    },
  ],
})

watch(
  () => bookingStore.sidebarActive,
  () => {
    newClientRef.value?.resetFields()
    clientRef.value?.resetFields()
    visitRef.value?.resetFields()
  }
)

const loading = ref(false)

async function submit() {
  const clientStore = useClientsStore()
  const companyStore = useCompanyStore()
  errors.value = {}
  const promises = []
  if (visitRef.value) promises.push(visitRef.value.validate())
  if (newClientRef.value) promises.push(newClientRef.value.validate())
  if (clientRef.value) promises.push(clientRef.value.validate())
  const [form_valid, clientValid] = (await Promise.allSettled(promises)).map(
    (x) => x.status === 'fulfilled'
  )
  console.log(form_valid, clientValid)
  if (!visitRef.value || !clientValid) return
  if (form_valid && visitRef.value && clientValid) {
    await visitRef.value.validate(async (valid) => {
      if (!valid) return
      if (newUser.value === 0) {
        const client = Client.empty()
        if (!companyStore.currentCompany) throw Error('Current company is empty')
        client.companyId = companyStore.currentCompany.id
        client.general.firstName = bookingStore.temp_visit.first_name || ''
        client.general.lastName = bookingStore.temp_visit.last_name || ''
        client.general.patronymic = bookingStore.temp_visit.patronymic || ''
        client.general.sex = bookingStore.temp_visit.sex.value || undefined
        client.general.birthDate = bookingStore.temp_visit.birthDate || undefined
        client.general.categories = bookingStore.temp_visit.categories || []
        // client.general.favoriteMaster = bookingStore.temp_visit.favoriteMaster || []
        // client.general.distanceFromSaloon = bookingStore.temp_visit.distanceFromSaloon || ''
        client.contacts.phone = bookingStore.temp_visit.phone || ''
        client.contacts.email = bookingStore.temp_visit.email || ''
        client.contacts.allowCommunicationWays =
          bookingStore.temp_visit.allowCommunicationWays?.map((x) => ({
            channel: x.value,
          })) || []
        client.additional.interests = bookingStore.temp_visit.interests || ''
        client.additional.howDidYouKnow = bookingStore.temp_visit.howDidYouKnow.value || ''
        client.additional.contraindications = bookingStore.temp_visit.contraindications || ''
        client.additional.description = bookingStore.temp_visit.description || ''

        try {
          loading.value = true
          const savedClient = await clientStore.saveTempClient(client)
          bookingStore.temp_visit.client_id = savedClient.id as string
        } catch (e) {
          loading.value = false
          if (e instanceof ApiError) {
            for (const error of e.body.data.fields) {
              errors.value[error.loc[0]] = error.ctx.unique_code
            }
          }
          throw e
        }
      }
      try {
        await bookingStore.saveTempVisit()
      } catch (e) {
        loading.value = false
        if (e instanceof ApiError) {
          for (const error of e.body.fields) {
            console.log('aaa', error.ctx.unique_code)
            errors.value[error.loc[0]] = error.ctx.unique_code
          }
          if (visitRef.value) promises.push(visitRef.value.validate())
        }
        throw e
      }

      await bookingStore.fetchBookings()
      toggleSidebar()
      newClientRef.value?.resetFields()
      clientRef.value?.resetFields()
      visitRef.value?.resetFields()
      loading.value = false
    })
  }
}
</script>

<template>
  <div :class="[$style.wrapper, bookingStore.sidebarActive ? $style.active : '']">
    <div
      v-loading="loading"
      :class="[$style.sidebar, bookingStore.sidebarActive ? $style.active : '']"
    >
      <div v-if="uiStore.mdAndDown" :class="$style.close">
        <el-button text @click="bookingStore.sidebarActive = false">
          <el-icon class="primary-color" size="20">
            <Close />
          </el-icon>
        </el-button>
      </div>
      <div class="heading font-18">{{ title }}</div>
      <el-radio-group
        v-if="mode === 'create'"
        v-model="newUser"
        :size="uiStore.mdAndDown ? 'small' : 'large'"
      >
        <el-radio-button :label="1">Клиент уже есть в системе</el-radio-button>
        <el-radio-button :label="0">Новый клиент</el-radio-button>
      </el-radio-group>
      <el-form
        v-if="newUser === 1 || mode === 'edit'"
        ref="clientRef"
        :model="bookingStore.temp_visit"
        :rules="clientRules"
        class="mt-4"
        label-position="top"
        @submit.prevent
      >
        <el-row :gutter="16">
          <el-col :md="12" :xs="24">
            <el-form-item label="Клиент*" prop="client_id">
              <el-select-v2
                v-model="bookingStore.temp_visit.client_id"
                :loading="searchUserLoading"
                :options="searchUserOptions"
                :remote-method="searchUser"
                clearable
                filterable
                remote
                size="large"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form
        v-else
        ref="newClientRef"
        :model="bookingStore.temp_visit"
        :rules="newClientRules"
        class="mt-4"
        label-position="top"
        @submit.prevent
      >
        <el-row :gutter="16">
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="Имя клиента*" prop="first_name">
              <el-input v-model="bookingStore.temp_visit.first_name" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="Фамилия" prop="last_name">
              <el-input v-model="bookingStore.temp_visit.last_name" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="Отчество">
              <el-input v-model="bookingStore.temp_visit.patronymic" />
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="Телефон*" prop="phone">
              <el-input v-model="bookingStore.temp_visit.phone" />
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Email">
              <el-input v-model="bookingStore.temp_visit.email" />
            </el-form-item>
          </el-col>

          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Способы коммуникации">
              <el-select-v2
                v-model="bookingStore.temp_visit.allowCommunicationWays"
                :options="communicationWaysOptions"
                clearable
                collapse-tags
                collapse-tags-tooltip
                filterable
                multiple
                size="large"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Пол">
              <el-select v-model="bookingStore.temp_visit.sex" size="large">
                <el-option
                  v-for="option in sexFiltersOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Дата рождения">
              <el-date-picker v-model="bookingStore.temp_visit.birthDate" size="large" />
            </el-form-item>
          </el-col>

          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Доступность салона">
              <el-select
                v-model="bookingStore.temp_visit.distanceFromSaloon"
                size="large"
                value-key="id"
              >
                <el-option
                  v-for="option in distanceFiltersOptions"
                  :key="option.label"
                  :label="option.label"
                  :value="option"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Откуда узнали">
              <el-select v-model="bookingStore.temp_visit.howDidYouKnow" size="large">
                <el-option
                  v-for="option in howDidYYouKnowFiltersOptions"
                  :key="option.label"
                  :label="option.label"
                  :value="option"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Категория клиента">
              <el-select-v2
                v-model="bookingStore.temp_visit.categories"
                :options="clientsStore.categoriesOptions"
                clearable
                collapse-tags
                collapse-tags-tooltip
                filterable
                multiple
                size="large"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Любимый мастер">
              <el-select-v2
                v-model="bookingStore.temp_visit.favoriteMaster"
                :options="favoriteMasterFiltersOptions"
                clearable
                collapse-tags
                collapse-tags-tooltip
                filterable
                multiple
                size="large"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Противопоказания">
              <el-input v-model="bookingStore.temp_visit.contraindications" />
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Интересы">
              <el-input v-model="bookingStore.temp_visit.interests" />
            </el-form-item>
          </el-col>
          <el-col v-if="extendedMode" :md="8" :sm="12" :xs="24">
            <el-form-item label="Комментарий">
              <el-input v-model="bookingStore.temp_visit.comment" />
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-button
              v-if="!extendedMode"
              :class="['d-flex', 'primary-color']"
              text
              @click="extendedMode = true"
            >
              <el-icon>
                <plus />
              </el-icon>
              <div class="font-weight-700 ml-1 ws-normal">
                Добавить дополнительную информацию о клиенте
              </div>
            </el-button>
            <el-button
              v-if="extendedMode"
              :class="['d-flex', 'text-muted']"
              text
              @click="extendedMode = false"
            >
              <el-icon>
                <ArrowUp />
              </el-icon>
              <div class="font-weight-700 ml-1 ws-normal">Свернуть до краткой формы</div>
            </el-button>
          </el-col>
        </el-row>
      </el-form>

      <el-divider />
      <el-form
        ref="visitRef"
        :model="bookingStore.temp_visit"
        :rules="visitRules"
        class="mt-4"
        label-position="top"
        @submit.prevent
      >
        <el-row :gutter="16">
          <el-col :md="12" :xs="24">
            <el-form-item label="Источник визита*" prop="visit_origin">
              <el-select v-model="bookingStore.temp_visit.visit_origin" size="large">
                <el-option
                  v-for="option in sourceOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24">
            <el-form-item label="Тип визита*" prop="visit_type">
              <el-select v-model="bookingStore.temp_visit.visit_type" size="large">
                <el-option
                  v-for="option in typeOptions"
                  :key="option"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-row
          v-for="(time, id) in bookingStore.temp_visit.visit_time"
          :key="id"
          :class="id > 0 ? 'mt-2' : ''"
          :gutter="16"
        >
          <el-col :md="12" :xs="24">
            <el-form-item label="Дата и время*" prop="visit_time">
              <el-date-picker
                v-model="bookingStore.temp_visit.visit_time[id]"
                size="large"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col v-if="mode === 'create'" :md="2" :xs="4" class="d-flex align-center">
            <el-button
              :class="['w-full', $style.outlined, uiStore.smAndDown ? '' : 'mt-1']"
              size="large"
              @click="bookingStore.temp_visit.visit_time.push(new Date())"
            >
              <el-icon>
                <Plus />
              </el-icon>
            </el-button>
          </el-col>
          <el-col
            v-if="bookingStore.temp_visit.visit_time.length > 1"
            :md="2"
            :xs="4"
            class="d-flex align-center"
          >
            <el-button
              :class="['w-full', $style.outlined, uiStore.smAndDown ? '' : 'mt-1']"
              size="large"
              @click="bookingStore.removeVisitDate(id)"
            >
              <el-icon>
                <Minus />
              </el-icon>
            </el-button>
          </el-col>
          <el-col
            v-if="bookingStore.temp_visit.services.length > 0"
            :md="8"
            :xs="16"
            class="d-flex align-center"
          >
            <el-alert :closable="false" :title="durationText" show-icon type="info" />
          </el-col>
        </el-row>
        <el-row :gutter="16">
          <el-col :xs="24">
            <el-form-item label="Услуга*" prop="services">
              <el-select-v2
                v-model="bookingStore.temp_visit.services"
                :options="servicesStore.servicesOptions"
                clearable
                collapse-tags-tooltip
                filterable
                multiple
                size="large"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24">
            <el-form-item label="Комната">
              <el-input v-model="bookingStore.temp_visit.room" size="large"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12" :xs="24">
            <el-form-item label="Описание">
              <el-input
                v-model="bookingStore.temp_visit.description"
                disabled
                size="large"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-form-item label="Мастер*" prop="masters">
              <el-select-v2
                v-model="bookingStore.temp_visit.masters"
                :options="bookingStore.masterOptions"
                clearable
                collapse-tags-tooltip
                filterable
                multiple
                size="large"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-form-item label="Комментарий к визиту">
          <el-input v-model="bookingStore.temp_visit.comment" :rows="5" type="textarea" />
        </el-form-item>
      </el-form>
      <div class="d-flex">
        <el-button :class="[$style.button, $style.submit, 'mr-2']" size="large" @click="submit"
          >{{ submitBtnText }}
        </el-button>
        <el-button :class="[$style.button, $style.outlined]" size="large" @click="toggleSidebar"
          >Отмена
        </el-button>
      </div>
    </div>
    <div v-if="bookingStore.sidebarActive" :class="$style.overlay" @click="toggleSidebar"></div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-select)
  width 100% !important
  height 40px

:deep(.el-input)
  width 100% !important
  height 40px

:deep(.el-select-v2__wrapper)
  width 100% !important
  min-height 40px
</style>

<style lang="stylus" module>
.wrapper
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  overflow hidden
  z-index -1
  width 100vw

.sidebar
  position absolute
  top 0
  right -100%
  bottom 0
  background white
  padding 24px
  width 816px
  overflow-y scroll
  overflow-x hidden
  transition 500ms
  @media (max-width $tabletHorWidth)
    width 100%

.overlay
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  z-index 1
  background hsla(112, 0%, 11%, 0.35)

.active
  right 0
  z-index 5

.close
  position absolute
  top 20px
  right 20px

.button
  cursor pointer
  display flex
  align-items center
  justify-content center
  word-break keep-all
  word-wrap break-word
  font-family 'Verdana'
  font-style normal
  font-weight 700 !important
  font-size 14px !important
  line-height 24px !important
  border-radius: 8px !important
  flex: none
  color $cPrimary !important
  order: 0
  flex-grow: 0

.outlined
  border 1px solid $cPrimary !important
  color $cPrimary !important
  background white !important

.submit
  border none !important
  color white !important
  background: $cPrimary !important
</style>
