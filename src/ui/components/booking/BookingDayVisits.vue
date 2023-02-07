<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed, defineProps } from 'vue'
import TelegramPrimaryLogoSvg from '@/ui/components/Icons/TelegramPrimaryLogoSvg.vue'
import WhatsAppPrimaryLogoSvg from '@/ui/components/Icons/WhatsAppPrimaryLogoSvg.vue'
import { ChatDotSquare, Phone } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { useBookingStore } from '@/store/booking'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import type { BookingMasterData } from '@/entities/booking'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('utc')

const props = defineProps({
  schedule: { type: Array, required: true },
  master: { type: Object as PropType<BookingMasterData>, required: true },
  cellSize: { type: Object, required: true },
})

const bookingStore = useBookingStore()

const getBookingStyles = (visit: { name: string; paid: boolean; startAt: Date; endAt: Date }) => {
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
  return props.master.shifts.map((x) => {
    const startAt = dayjs(x.startAt).tz('utc').format('HH:mm')
    const endAt = dayjs(x.endAt).tz('utc').format('HH:mm')
    return {
      ...x,
      styles: getBookingStyles(x),
      timeRange: `${startAt} - ${endAt}`,
    }
  })
})

function stopPropagation(event: Event) {
  event.stopPropagation()
}

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
        $style['visit-hover'],
        'd-flex',
        'flex-column',
        'pointer',
        visit.paid ? 'access-background' : 'accent-background',
      ]"
      :style="visit.styles"
      @click="openBooking(visit.id)"
    >
      <div class="font-weight-700">
        {{ visit.timeRange }}
      </div>
      <div>{{ master.name }}</div>
      <div class="mt-1">{{ visit.name }}</div>
      <div class="d-flex justify-space-between mt-1">
        <button :class="[$style.button, $style.outlined]" @click="stopPropagation">
          <el-icon :size="14">
            <Phone />
          </el-icon>
        </button>
        <button :class="[$style.button, $style.outlined]" @click="stopPropagation">
          <el-icon :size="14">
            <ChatDotSquare />
          </el-icon>
        </button>
        <button :class="[$style.button, $style.outlined]" @click="stopPropagation">
          <WhatsAppPrimaryLogoSvg class="size-18" />
        </button>
        <button :class="[$style.button, $style.outlined]" @click="stopPropagation">
          <TelegramPrimaryLogoSvg class="size-18" />
        </button>
      </div>
    </div>
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
  overflow hidden

.visit-hover:hover
  height fit-content !important

.button
  cursor pointer
  padding 0
  height 32px
  width 32px
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
</style>
