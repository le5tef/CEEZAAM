<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps } from 'vue'
import dayjs from 'dayjs'
import type { BookingMasterData, BookingMasterShifts } from '@/entities/booking'
import { useBookingStore } from '@/store/booking'

const props = defineProps({
  schedule: { type: Array, required: true },
  master: { type: Object as PropType<BookingMasterData>, required: true },
  cellSize: { type: Object, required: true },
  shifts: { type: Array as PropType<BookingMasterShifts[]>, required: true },
})

const bookingStore = useBookingStore()

const style = (visit: { name: string; paid: boolean; startAt: Date; endAt: Date }) => {
  const startAt = dayjs(visit.startAt)
  const startAtMinute = Math.floor(startAt.unix() % 86400) / 60
  const endAt = dayjs(visit.endAt)
  const endAtMinute = Math.floor(endAt.unix() % 86400) / 60

  let topOffset = (props.cellSize.height / 15) * startAtMinute
  topOffset = topOffset - Math.floor(startAtMinute / 15)

  let heightOffset = ((endAtMinute - startAtMinute) / 15) * props.cellSize.height
  heightOffset = heightOffset - Math.floor((endAtMinute - startAtMinute) / 15)

  return {
    top: `${topOffset}px`,
    height: `${heightOffset}px`,
    minHeight: `${heightOffset}px`,
  }
}

const shifts = computed(() => {
  return props.shifts.map((x) => ({
    ...x,
    styles: style(x),
    timeRange: `${dayjs(x.startAt).format('HH:mm')} - ${dayjs(x.endAt).format('HH:mm')}`,
  }))
})

async function openBooking(id: string) {
  await bookingStore.editBooking(id)
}
</script>

<template>
  <div>
    <div
      v-for="(visit, id) in shifts"
      :key="id"
      :class="[
        $style.visit,
        'd-flex',
        'flex-column',
        'pointer',
        visit.paid ? 'access-background' : 'accent-background',
      ]"
      :style="visit.styles"
      @click="openBooking(visit.id)"
    ></div>
  </div>
</template>

<style lang="stylus" module>
.visit
  position absolute
  z-index 3
  right 3px
  left 3px
  border-radius 4px
  padding 4px
  color white
  font-weight 400
  font-size 12px
  line-height 16px
</style>
