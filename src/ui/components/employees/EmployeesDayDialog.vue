<script setup lang="ts">
import Modal from '@/ui/components/ModalBase.vue'
import { dateFormat, useScheduleStore } from '@/store/schedule'
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import { capitalizeFirstLetter } from '@/utils'
import { useEmployeesStore } from '@/store/employees'
import { useDialogStore } from '@/store/dialog'
import { useCompanyStore } from '@/store/company'

const scheduleStore = useScheduleStore()
const dialogStore = useDialogStore()
const companyStore = useCompanyStore()
const employeesStore = useEmployeesStore()
const dialogName = 'EmployeesDay'

const title = computed(() => {
  const day = dayjs(scheduleStore.selectedDate)

  const dayStr = day.format('D')
  const monthStr = capitalizeFirstLetter(day.format('MMMM'))
  const weekdayStr = day.format('dd').toUpperCase()
  const shiftStr = scheduleStore.selectedShift
    ? scheduleStore.prettyShiftTime(scheduleStore.selectedShift)
    : ''
  return `${dayStr} ${monthStr} (${weekdayStr}) ${shiftStr}`
})

const dayEmployees = ref([] as string[])
const employeesOptions = computed(() => {
  return employeesStore.employees.map((x) => ({
    value: x.id,
    label: `${x.user.first_name || ''} ${x.user.last_name || ''}`,
  }))
})

watch(
  () => scheduleStore.selectedDate,
  () => {
    if (scheduleStore.schedule) {
      const day = dayjs(scheduleStore.selectedDate)
      dayEmployees.value = scheduleStore.schedule.days[day.format(dateFormat)].employees.map(
        (x) => x.id
      )
    }
  }
)

function closeDialog() {
  dialogStore.closeDialog(dialogName)
}

const editable = computed(
  () => companyStore.currentCompanyOffice?.id && scheduleStore.selectedShiftTimeId
)

function getWeekday(day: dayjs.Dayjs) {
  let wd = day.day() - 1
  if (wd < 0) wd = 6
  return wd
}

async function saveThisDay() {
  if (!companyStore.currentCompanyOffice?.id || !scheduleStore.selectedShiftTimeId) {
    throw Error()
  }

  const day = dayjs(scheduleStore.selectedDate)
  await scheduleStore.updateSchedulePeriod({
    employees: dayEmployees.value,
    office_id: companyStore.currentCompanyOffice.id,
    shift_time_id: scheduleStore.selectedShiftTimeId,
    after: day.format(dateFormat),
    before: day.format(dateFormat),
    weekdays: [getWeekday(day)],
  })
  closeDialog()
}

async function saveThisWeekday() {
  if (!companyStore.currentCompanyOffice?.id || !scheduleStore.selectedShiftTimeId) {
    throw Error()
  }

  const day = dayjs(scheduleStore.selectedDate)
  await scheduleStore.updateSchedulePeriod({
    employees: dayEmployees.value,
    office_id: companyStore.currentCompanyOffice.id,
    shift_time_id: scheduleStore.selectedShiftTimeId,
    after: scheduleStore.dateFrom.format(dateFormat),
    before: scheduleStore.dateTo.format(dateFormat),
    weekdays: [getWeekday(day)],
  })
  closeDialog()
}
</script>

<template>
  <Modal :width="612" :name="dialogName">
    <template #title>
      <div :class="$style.heading">
        {{ title }}
      </div>
    </template>
    <template #content>
      <div>
        <el-select-v2
          v-model="dayEmployees"
          collapse-tags
          collapse-tags-tooltip
          class="w-full"
          :options="employeesOptions"
          placeholder="Сотрудники"
          filterable
          multiple
          clearable
        />
        <div v-if="editable" :class="[$style.actions]">
          <button :class="[$style.button, $style.outlined]" @click="closeDialog">Отмена</button>
          <button :class="[$style.button, $style.submit]" @click="saveThisDay()">
            Сохранить {{ dayjs(scheduleStore.selectedDate).format('D MMMM') }}
          </button>
          <button :class="[$style.button, $style.submit]" @click="saveThisWeekday()">
            Сохранить на все
            {{ dayjs(scheduleStore.selectedDate).format('dd') }}
          </button>
        </div>
        <el-alert
          v-else
          style="margin-top: 10px"
          title="Вы не можете сохранить график не выбрав смену"
          type="error"
          :closable="false"
        />
      </div>
    </template>
  </Modal>
</template>

<style module lang="stylus">
.heading
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 18px
  line-height 24px

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
  margin-top 22px
  display flex
  flex-direction row
  justify-content right
  @media (max-width $tabletVerWidth)
    flex-direction column
</style>
