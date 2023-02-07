<script lang="ts" setup>
import Modal from '@/ui/components/ModalBase.vue'
import { computed, ref } from 'vue'
import { useDialogStore } from '@/store/dialog'
import {
  communicationWaysFiltersOptions,
  daysOfWeekFiltersOptions,
  depositFiltersOptions,
  distanceFiltersOptions,
  emailFiltersOptions,
  favoriteMasterFiltersOptions,
  favoriteSaloonFiltersOptions,
  howDidYYouKnowFiltersOptions,
  lastVisitOptions,
  sexFiltersOptions,
  spentMoneyFiltersOptions,
  subscriptionFiltersOptions,
  useClientsFiltersStore,
  useClientsStore,
  visitAmountFiltersOptions,
  visitHoursFiltersOptions,
} from '@/store/clients'
import type { lastVisitOptionSchema } from '@/store/clients'
import { useUiStore } from '@/store'

const filtersStore = useClientsFiltersStore()
const dialogStore = useDialogStore()
const uiStore = useUiStore()
const clientsStore = useClientsStore()

const stateDefault = Object.freeze({})

const state = ref<typeof stateDefault>({ ...stateDefault })
const dialogName = 'ClientsFilter'

const closeDialog = () => {
  state.value = { ...stateDefault }
  dialogStore.closeDialog(dialogName)
}

const allowVisitPeriod = computed(() => selectedVisitPeriodOption.value.isEditable)

const selectedVisitPeriodOptionId = ref<string>(lastVisitOptions[0].id)
const selectedVisitPeriodOption = computed<lastVisitOptionSchema>(() => {
  const opt = lastVisitOptions.find((x) => x.id === selectedVisitPeriodOptionId.value)
  if (!opt) throw Error()
  return opt
})

const visitPeriod = computed({
  get(): [Date, Date] | null {
    if (!allowVisitPeriod.value) return null

    if (
      filtersStore.filters.general.lastVisitPeriod.value.from !== null &&
      filtersStore.filters.general.lastVisitPeriod.value.to !== null
    ) {
      return [
        filtersStore.filters.general.lastVisitPeriod.value.from,
        filtersStore.filters.general.lastVisitPeriod.value.to,
      ]
    } else {
      return null
    }
  },
  set(val: [Date, Date] | null) {
    if (val === null) {
      filtersStore.filters.general.lastVisitPeriod.value.from = null
      filtersStore.filters.general.lastVisitPeriod.value.to = null
    } else {
      filtersStore.filters.general.lastVisitPeriod.value.from = val[0]
      filtersStore.filters.general.lastVisitPeriod.value.to = val[1]
    }
  },
})

const visitHours = computed({
  get: () => filtersStore.filters.additional.visitHours,
  set(val) {
    filtersStore.filters.additional.visitHours = val
  },
})

async function submit() {
  closeDialog()
}
</script>


<template>
  <Modal :fullscreen="!!uiStore.isMobileWidth" :name="dialogName" :width="960">
    <template #title>
      <div :class="$style.heading">Фильтрация</div>
    </template>
    <template #content>
      <div>
        <el-form label-position="top" @submit.prevent>
          <el-row :gutter="16">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Пол">
                <el-select v-model="filtersStore.filters.general.sex">
                  <el-option
                    v-for="option in sexFiltersOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Категория клиента">
                <el-select-v2
                  v-model="filtersStore.filters.general.categories"
                  :options="clientsStore.categoriesOptions"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  multiple
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Последний визит">
                <el-select
                  v-model="filtersStore.filters.general.lastVisitPeriod"
                  value-key="id"
                  @change="selectedVisitPeriodOptionId = $event.id"
                >
                  <el-option
                    v-for="option in lastVisitOptions"
                    :key="option.id"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Период последнего визита">
                <el-date-picker
                  v-model="visitPeriod"
                  :default-value="[new Date(), new Date()]"
                  :disabled="!allowVisitPeriod"
                  type="daterange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider />
          <div :class="[$style.title, 'mb-4']">Коммуникация</div>
          <el-row :gutter="16">
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Email">
                <el-select v-model="filtersStore.filters.contacts.hasEmail">
                  <el-option
                    v-for="option in emailFiltersOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Способы коммуникации">
                <el-select-v2
                  v-model="filtersStore.filters.contacts.allowCommunicationWays"
                  :options="communicationWaysFiltersOptions"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  multiple
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Откуда узнали">
                <el-select v-model="filtersStore.filters.contacts.howDidYouKnow">
                  <el-option
                    v-for="option in howDidYYouKnowFiltersOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="Доступность салона">
                <el-select
                  v-model="filtersStore.filters.contacts.distanceFromSaloon"
                  disabled
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
          </el-row>
          <el-divider />

          <div :class="[$style.title, 'mb-4']">Деньги и визиты</div>
          <el-row :gutter="16">
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Основной салон посещения">
                <el-select v-model="filtersStore.filters.additional.favoriteMaster" disabled>
                  <el-option
                    v-for="option in favoriteSaloonFiltersOptions"
                    :key="option.value"
                    :label="option.label"
                    :value="option"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Любимый мастер">
                <el-select-v2
                  v-model="filtersStore.filters.additional.favoriteMaster"
                  :options="favoriteMasterFiltersOptions"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  multiple
                  disabled
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Дни посещения">
                <el-select-v2
                  v-model="filtersStore.filters.additional.visitDays"
                  :options="daysOfWeekFiltersOptions"
                  collapse-tags
                  collapse-tags-tooltip
                  clearable
                  filterable
                  multiple
                  disabled
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Часы посещения">
                <el-select v-model="visitHours" disabled :teleported="false" value-key="id">
                  <el-option
                    v-for="option in visitHoursFiltersOptions"
                    :id="option.id"
                    :key="option.id"
                    :label="option.label"
                    :value="option"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Абонемент">
                <el-select v-model="filtersStore.filters.additional.subscription" disabled>
                  <el-option
                    v-for="option in subscriptionFiltersOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Депозит">
                <el-select v-model="filtersStore.filters.additional.deposit" disabled>
                  <el-option
                    v-for="option in depositFiltersOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Визитов у клиента">
                <el-select v-model="filtersStore.filters.additional.visitsAmount" disabled>
                  <el-option
                    v-for="option in visitAmountFiltersOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24" class="px-2">
              <el-form-item label="Потраченных денег">
                <el-select v-model="filtersStore.filters.additional.spentMoney" disabled>
                  <el-option
                    v-for="option in spentMoneyFiltersOptions"
                    :key="option.label"
                    :label="option.label"
                    :value="option"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <div :class="$style.actions">
            <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
            <button
              :class="[$style.button, $style.outlined]"
              @click="filtersStore.discardFilters()"
            >
              Сбросить изменения
            </button>
            <button :class="[$style.button, $style.submit]" type="submit" @click="submit">
              Сохранить
            </button>
          </div>
        </el-form>
      </div>
    </template>
  </Modal>
</template>

<style lang="stylus" scoped>
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
.heading
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 18px
  line-height 24px

.title
  font-weight 700
  font-size 14px
  line-height 24px

.space
  margin: 0 4px

.shift
  display flex
  align-items center
  margin-bottom 16px

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