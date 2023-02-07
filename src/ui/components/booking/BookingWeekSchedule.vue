<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps, onMounted, ref, useCssModule } from 'vue'
import { DayOfWeekEnum, dayOfWeekShortReadable } from '@/enums'
import { useBookingStore } from '@/store/booking/booking'
import dayjs from 'dayjs'
import BookingWeekVisits from '@/ui/components/booking/BookingWeekVisits.vue'
import type { BookingCell, BookingMasterData } from '@/entities/booking'

const bookingStore = useBookingStore()
const cellSize = {
  width: 46,
  height: 24,
}

// const timeCellSize = {
//   width: 46,
//   height: 24,
// }

const headerCellSize = {
  height: 68,
}

const $style = useCssModule()

const cssVariables = computed(() => ({
  '--booking-cell-width': `${cellSize.width}px`,
  '--booking-cell-height': `${cellSize.height}px`,
}))

const props = defineProps({
  masters: { type: Array as PropType<BookingMasterData[]>, required: true },
  schedule: { type: Array as PropType<BookingCell[]>, required: true },
})

const addVisit = (slot: BookingCell, master: BookingMasterData, day: dayjs.Dayjs) => {
  bookingStore.createVisit({ slot, master, day })
  bookingStore.sidebarActive = true
}

const timeLineStyles = computed(() => {
  const startAtMinute = Math.floor(dayjs().add(3, 'hours').unix() % 86400) / 60
  const topOffset = (startAtMinute * cellSize.height) / 15 - Math.floor(startAtMinute / 15)
  return {
    top: `${topOffset + headerCellSize.height}px`,
  }
})

const mastersShifts = computed(() => {
  return props.masters.map((master, masterIdx) => {
    return {
      master,
      masterDisplayName: master.name.length > 12 ? master.name.slice(0, 18) + '...' : master.name,
      days: bookingStore.days.map((day) => {
        return {
          date: day.date.format('DD.MM'),
          dayjsDate: day.date,
          dayReadable: dayOfWeekShortReadable(day.dayOfWeek),
          dayOfWeek: day.dayOfWeek,
          headerClasses:
            day.dayOfWeek === DayOfWeekEnum.MONDAY
              ? $style.bl
              : day.dayOfWeek === DayOfWeekEnum.SUNDAY || masterIdx === props.masters.length - 1
              ? $style.br
              : '',
          shifts: master.shifts.filter((shift) => dayjs(shift.startAt).date() === day.date.date()),
        }
      }),
    }
  })
})

const timeLineRef = ref()

onMounted(() => {
  timeLineRef.value.scrollIntoView(true)
})
</script>

<template>
  <div :style="cssVariables" class="d-flex position-relative">
    <div ref="timeLineRef" class="time-line" :style="timeLineStyles"></div>
    <div :class="['d-flex', 'flex-column', $style.column]">
      <div
        :class="[$style.slot]"
        :style="`min-height: ${headerCellSize.height}px; background: #f8f9fa`"
      ></div>
      <div v-for="slot in schedule" :key="slot.id" :class="[$style.slot, 'd-flex', 'flex-column']">
        <div :class="[$style.cell]">{{ slot.label }}</div>
        <div :class="[$style.cell]"></div>
      </div>
    </div>

    <div v-for="master in mastersShifts" :key="master.master.id" :class="['d-flex', 'flex-column']">
      <div :class="[$style.header, $style.header__master]">
        {{ master.masterDisplayName }}
      </div>
      <div class="d-flex">
        <div
          v-for="(day, id) in master.days"
          :key="id"
          :class="[$style.column, 'd-flex', 'flex-column']"
        >
          <div :class="[$style.header, $style.header__day, day.headerClasses]">
            <div class="font-weight-700">
              {{ day.dayReadable }}
            </div>
            <div>{{ day.date }}</div>
          </div>
          <div :class="['d-flex', 'flex-column', 'position-relative']">
            <BookingWeekVisits
              :cell-size="cellSize"
              :master="master.master"
              :schedule="schedule"
              :shifts="day.shifts"
            />
            <div
              v-for="slot in schedule"
              :key="slot.id"
              :class="[
                $style.slot,
                'd-flex',
                'flex-column',
                'pointer',
                day.dayOfWeek === DayOfWeekEnum.MONDAY ? $style.filled : '',
              ]"
              @click="addVisit(slot, master.master, day.dayjsDate)"
            >
              <div :class="[$style.cell]"></div>
              <div :class="[$style.cell]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" module>

.cell
  width var(--booking-cell-width) !important
  height var(--booking-cell-height) !important
  border 1px #D4C7DB solid
  font-size 12px
  text-align center
  color $cTextMuted

  &__day
    width 170px

.bl
  border-left 1px #D4C7DB solid

.br
  border-right 1px #D4C7DB solid

.header
  background #F8F9FA
  font-size 12px

  &__master
    padding 4px 0 4px 4px
    font-weight 700
    font-size 14px
    line-height 24px
    min-height 32px
    border-left 1px #D4C7DB solid
    border-right 1px #D4C7DB solid
    margin 0 -1px 0 0

  &__day
    min-height 36px
    display flex
    flex-direction column
    color $cTextMuted
    align-items center

.filled
  background #F1EEF2 !important

.cell + .cell
  margin -1px 0


.column
  margin-right -1px
</style>
