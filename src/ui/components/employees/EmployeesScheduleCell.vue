<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useEmployeesStore } from '@/store/employees'
import { useUiStore } from '@/store'
import { buildMediaUrl } from '@/utils/mediaUrl'
import { useScheduleStore } from '@/store/schedule'
import dayjs from 'dayjs'
import { useDialogStore } from '@/store/dialog'
import { ElDropdown } from 'element-plus'

const props = defineProps({
  date: { type: Date as PropType<Date>, required: true },
})

const uiStore = useUiStore()
const dialogStore = useDialogStore()
const employeesStore = useEmployeesStore()
const scheduleStore = useScheduleStore()

const getRedundantEmployees = computed(() => {
  if (employeesStore.displayedEmployees) {
    if (maxEmployeesAvatarsQuantity.value < 10) return '+...'
    else if (maxEmployeesAvatarsQuantity.value <= 10)
      return '+' + (employeesStore.displayedEmployees.length - maxEmployeesAvatarsQuantity.value)
  }
  return '+'
})

const maxEmployeesAvatarsQuantity = computed(() => {
  if (uiStore.isMobileWidth) return 2
  if (uiStore.isDesktopWidth)
    if (uiStore.documentWidth > uiStore.xlDesktopBreakpoint) return 12
    else return 8
  if (!uiStore.isMobileWidth && !uiStore.isDesktopWidth) return 4
  return 2
})

const scheduleDay = computed(() => {
  if (scheduleStore.schedule === null) return null
  const dateString = dayjs(props.date).format('YYYY-MM-DD')
  return scheduleStore.schedule.days[dateString] || null
})

const rootTag = computed(() => {
  if (scheduleDay.value?.employees?.length) {
    return ElDropdown
  } else {
    return 'div'
  }
})
</script>

<template>
  <component :is="rootTag" v-if="scheduleDay" placement="top" class="w-full h-full">
    <div class="w-full h-full pa-2" @click="dialogStore.openDialog('EmployeesDay')">
      <p :class="['d-flex', 'justify-end', $style.day]">
        {{ date.getDate() }}
      </p>
      <el-row>
        <div v-for="(master, idx) in scheduleDay.employees" :key="master.id">
          <el-col v-if="maxEmployeesAvatarsQuantity > idx">
            <img
              v-if="maxEmployeesAvatarsQuantity - 1 !== idx && master.avatar"
              :class="$style.avatar"
              alt=""
              height="22"
              :src="buildMediaUrl(master.avatar)"
              width="22"
            />
            <div
              v-if="maxEmployeesAvatarsQuantity - 1 > idx && !master.avatar"
              :class="$style.avatar__default"
            >
              {{ master.first_name?.slice(0, 1) }}
            </div>
            <div v-if="maxEmployeesAvatarsQuantity - 1 === idx" :class="$style.avatar__default">
              {{ getRedundantEmployees }}
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <template #dropdown>
      <el-dropdown-menu v-if="!uiStore.isMobileWidth && scheduleDay">
        <el-dropdown-item v-for="master in scheduleDay.employees" :key="master.id">
          {{ master.first_name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </component>
</template>

<style lang="stylus" scoped>
:deep(.el-tooltip__trigger)
  width 100%

:deep(.el-calendar-table .el-calendar-day)
  padding 0
</style>

<style lang="stylus" module>
.day
  font-family 'Verdana'
  font-style normal
  font-weight 700
  font-size 14px
  line-height 24px
  color: $cTextMuted

.avatar
  border-radius 50%
  margin 1px
  object-fit cover

  &__default
    border-radius 50%
    display flex
    align-items center
    justify-content center
    background $cPrimary
    height 22px
    width 22px
    font-size 10px
    color white
</style>
