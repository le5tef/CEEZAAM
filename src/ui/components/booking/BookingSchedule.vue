<script lang="ts" setup>
import { computed } from 'vue'
import { BookingTypesEnum } from '@/enums'
import { useBookingStore } from '@/store/booking/booking'
import BookingWeekSchedule from '@/ui/components/booking/BookingWeekSchedule.vue'
import BookingDaySchedule from '@/ui/components/booking/BookingDaySchedule.vue'
import { useServicesStore } from '@/store'
import type { BookingMasterData, BookingMasterShifts } from '@/entities/booking'

const bookingStore = useBookingStore()
const servicesStore = useServicesStore()

const masters = computed<BookingMasterData[]>(() => {
  if (!bookingStore.listBookings) return []
  const masters: BookingMasterData[] = []

  for (const master of bookingStore.listBookings.masters) {
    const _masterBookings = bookingStore.listBookings.bookings.filter((x) =>
      x.master_ids.includes(master.id)
    )
    const masterBookings: BookingMasterShifts[] = []

    for (const booking of _masterBookings) {
      const name = servicesStore.services
        .filter((x) => booking.service_ids.includes(x.id as string))
        .map((x) => x.name)
        .join(', ')
      masterBookings.push({
        id: booking.id,
        name: name,
        paid: false,
        startAt: new Date(booking.start_at),
        endAt: new Date(booking.end_at),
      })
    }

    masters.push({
      id: master.id,
      name: `${master.first_name} ${master.last_name}`,
      description: '',
      shifts: masterBookings,
    })
  }
  return masters
})

const getFullTimeById = (id: number) => {
  const hours = Math.floor((id * 30) / 60)
  const minutes = (id * 30) % 60
  return {
    hours,
    prettyHours: ('0' + hours).slice(-2),
    minutes,
    prettyMinutes: ('0' + minutes).slice(-2),
  }
}

const schedule = computed(() => {
  const arr = []
  let start = 0
  const end = 48
  for (start; start < end; start++) {
    arr.push({
      id: start,
      label: getFullTimeById(start).prettyHours + ':' + getFullTimeById(start).prettyMinutes,
      minutes: getFullTimeById(start).minutes,
      hours: getFullTimeById(start).hours,
      prettyHours: getFullTimeById(start).prettyHours,
      prettyMinutes: getFullTimeById(start).prettyMinutes,
    })
  }
  return arr
})

const scheduleComponent = computed(() =>
  bookingStore.bookingType === BookingTypesEnum.WEEK ? BookingWeekSchedule : BookingDaySchedule
)
</script>

<template>
  <div :class="$style.wrapper">
    <component :is="scheduleComponent" :masters="masters" :schedule="schedule" />
  </div>
</template>

<style lang="stylus" module>
.wrapper
  max-height 600px
  overflow scroll
  display flex
</style>
