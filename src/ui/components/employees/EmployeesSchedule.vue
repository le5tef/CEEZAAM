<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useUiStore } from '@/store'
import { useDialogStore } from '@/store/dialog'
import { dayjs } from 'element-plus'
import { useEmployeesStore } from '@/store/employees'
import { CompanyEmployeeRoleEnum } from '@/client'
import { useScheduleStore } from '@/store/schedule'
import EmployeeScheduleCell from '@/ui/components/employees/EmployeesScheduleCell.vue'

const uiStore = useUiStore()
const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()
const scheduleStore = useScheduleStore()

const employeeType = ref(CompanyEmployeeRoleEnum.MASTER)
const range = computed(() => [scheduleStore.dateFrom.toDate(), scheduleStore.dateTo.toDate()])

watch(
  () => employeeType.value,
  (newValue: string) => {
    if (newValue === CompanyEmployeeRoleEnum.MASTER) employeesStore.setShowMasters(true)
    else employeesStore.setShowMasters(false)

    updateSchedule()
  }
)

const months = ref([
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
])

const calendarDefault = Object.freeze({
  selectedMonth: new Date().getMonth(),
})

const calendar = ref()
const calendarState = ref<typeof calendarDefault>({ ...calendarDefault })

watch(
  () => calendarState.value.selectedMonth,
  (newValue: number) => {
    calendar.value.pickDay(dayjs().month(newValue))
  }
)

watch(() => scheduleStore.selectedShiftTimeId, updateSchedule)

async function updateSchedule() {
  await scheduleStore.fetchSchedule()
}

const shifts = computed(() => [{ pretty: 'Все смены', id: '' }, ...scheduleStore.prettyShifts])
</script>

<template>
  <div>
    <el-radio-group v-model="employeeType" style="margin-bottom: 18px">
      <el-radio-button :label="CompanyEmployeeRoleEnum.MASTER">Мастера</el-radio-button>
      <el-radio-button :label="CompanyEmployeeRoleEnum.ADMINISTRATOR"
        >Администраторы
      </el-radio-button>
    </el-radio-group>
    <el-calendar
      ref="calendar"
      v-model="scheduleStore.selectedDate"
      :range="range"
      :class="$style.calendar"
    >
      <template #header>
        <div class="w-full">
          <div
            class="d-flex align-center w-full"
            :class="
              uiStore.isMobileWidth ||
              uiStore.isMobileWidth ||
              (!uiStore.isMobileWidth && !uiStore.isDesktopWidth)
                ? 'flex-column'
                : 'mb-4'
            "
          >
            <div :class="[$style.header, 'w-full']">
              <el-select
                v-model="calendarState.selectedMonth"
                :class="[$style.select, 'w-full']"
                size="large"
              >
                <el-option v-for="(month, id) in months" :key="id" :label="month" :value="id" />
              </el-select>
              <el-select
                v-if="employeesStore.showMasters"
                v-model="scheduleStore.selectedShiftTimeId"
                placeholder="Выберите смену"
                :class="[$style.select, 'ml-1', 'w-full']"
                size="large"
              >
                <el-option
                  v-for="(shift, id) in shifts"
                  :key="id"
                  :label="shift.pretty"
                  :value="shift.id"
                />
              </el-select>
            </div>
            <button :class="[$style.button]" @click="dialogStore.openDialog('EmployeesAddShift')">
              + Добавить смену
            </button>
            <div class="spacer"></div>
            <button :class="[$style.outlined, $style.button]">Выгрузить в excel</button>
            <button
              :class="[$style.submit, $style.button]"
              @click="
                dialogStore.openDialog(
                  employeesStore.showMasters ? 'EmployeesAddMaster' : 'EmployeesAddAdministrator'
                )
              "
            >
              Добавить
              {{ employeesStore.showMasters ? ' мастера' : ' администратора' }}
            </button>
          </div>
        </div>
      </template>
      <template #date-cell="{ data }">
        <EmployeeScheduleCell :date="data.date" />
      </template>
    </el-calendar>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-tooltip__trigger)
  width 100%

:deep(.el-calendar-table .el-calendar-day)
  padding 0
</style>

<style lang="stylus" module>
.calendar
  box-shadow 0 0 8px rgba(26, 14, 62, 0.25)
  border-radius 8px

.button
  cursor pointer
  margin-left 24px
  height 32px
  word-break keep-all
  word-wrap break-word
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 14px
  line-height 24px
  border-radius: 8px
  flex: none
  color $cPrimary
  order: 0
  flex-grow: 0
  @media (max-width: $tabletHorWidth)
    width 100%
    margin 0 0 16px 0

.select
  @media (max-width: $tabletVerWidth)
    width 100%

.header
  display flex
  @media (max-width: $tabletHorWidth)
    margin-bottom 16px

.outlined
  border 1px solid $cPrimary
  color $cPrimary
  background: white

.submit
  border none
  color white
  background: $cPrimary
</style>
