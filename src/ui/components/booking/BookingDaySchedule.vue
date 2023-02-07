<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps, onMounted, ref } from 'vue'
import BookingDayVisits from '@/ui/components/booking/BookingDayVisits.vue'
import { useBookingStore } from '@/store/booking'
import type { BookingCell, BookingMasterData } from '@/entities/booking'
import dayjs from 'dayjs'

defineProps({
  masters: { type: Array as PropType<BookingMasterData[]>, required: true },
  schedule: { type: Array as PropType<BookingCell[]>, required: true },
})

const bookingStore = useBookingStore()

const cellSize = {
  width: 170,
  height: 24,
}

const headerCellSize = {
  height: 48,
}

// const timeCellSize = {
//   width: 52,
//   height: 24,
// }

const cssVariables = computed(() => ({
  '--booking-cell-width': `${cellSize.width}px`,
  '--booking-cell-height': `${cellSize.height}px`,
}))

const timeLineStyles = computed(() => {
  const startAtMinute = Math.floor(dayjs().add(3, 'hours').unix() % 86400) / 60
  const topOffset = (startAtMinute * cellSize.height) / 15 - Math.floor(startAtMinute / 15)
  return {
    top: `${topOffset + headerCellSize.height}px`,
  }
})

const formatData = computed(() => (master: { name: string }) => ({
  name: master.name.length > 12 ? master.name.slice(0, 12) + '...' : master.name,
}))

const addVisit = (slot: BookingCell, master: BookingMasterData) => {
  bookingStore.createVisit({ slot, master })
  bookingStore.sidebarActive = true
}

const timeLineRef = ref()

onMounted(() => {
  timeLineRef.value.scrollIntoView({ behavior: 'smooth' })
})
</script>

<template>
  <div :style="cssVariables" class="d-flex position-relative">
    <div ref="timeLineRef" :style="timeLineStyles" class="time-line"></div>
    <div :class="['d-flex', 'flex-column', $style.column]">
      <div
        :class="[$style.slot]"
        :style="`min-height: ${headerCellSize.height}px; background: #f8f9fa`"
      ></div>
      <div v-for="slot in schedule" :key="slot.id" :class="[$style.slot, 'd-flex', 'flex-column']">
        <div :class="[$style.cell]" style="width: 52px !important">{{ slot.label }}</div>
        <div :class="[$style.cell]" style="width: 52px !important"></div>
      </div>
    </div>

    <div v-for="master in masters" :key="master.id" :class="['d-flex', 'flex-column']">
      <div :class="['d-flex', 'flex-column']">
        <div :class="[$style.header, $style.header__master]">{{ formatData(master).name }}</div>
        <div :class="[$style.header, $style.header__description]">{{ master.description }}</div>
      </div>

      <div :class="['d-flex', 'flex-column', $style.column, 'position-relative']">
        <div
          v-for="slot in schedule"
          :key="slot.id"
          :class="[$style.slot, 'd-flex', 'flex-column', 'pointer']"
          @click="addVisit(slot, master)"
        >
          <div :class="[$style.cell]"></div>
          <div :class="[$style.cell]"></div>
        </div>
        <BookingDayVisits :cell-size="cellSize" :master="master" :schedule="schedule" />
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
  overflow hidden

  &__day
    width 170px

.bl
  border-left 1px #D4C7DB solid

.br
  border-right 1px #D4C7DB solid

.header
  background #F8F9FA
  font-size 12px
  padding 4px 0 4px 4px
  border-left 1px #D4C7DB solid
  border-right 1px #D4C7DB solid
  margin 0 -1px 0 0

  &__master
    font-weight 700
    font-size 14px
    line-height 24px
    height 24px

  &__description
    font-family 'Verdana'
    font-style normal
    font-weight 400
    font-size 12px
    line-height 16px
    height 24px

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
