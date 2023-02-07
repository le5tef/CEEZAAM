<script lang="ts" setup>
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { bookingTypesReadable } from '@/services/booking'
import { BookingTypesEnum } from '@/enums'
import { useBookingStore } from '@/store/booking/booking'
import { useUiStore } from '@/store'
import { computed, watch } from 'vue'
import dayjs from 'dayjs'
import BookingSchedule from '@/ui/components/booking/BookingSchedule.vue'
import BookingEditVisitSidebar from '@/ui/components/booking/BookingEditVisitSidebar.vue'

const bookingStore = useBookingStore()
const uiStore = useUiStore()
const dateFormat = 'DD.MM.YYYY'
const weekPlaceholder = computed(
  () =>
    dayjs(bookingStore.dateRange[0]).format(dateFormat) +
    ' - ' +
    dayjs(bookingStore.dateRange[1]).format(dateFormat)
)

const createVisit = () => {
  bookingStore.clearTempVisit()
  bookingStore.sidebarActive = true
}

watch(
  () => bookingStore.dateRange[0],
  () => {
    if (bookingStore.bookingType === BookingTypesEnum.WEEK) bookingStore.updateWeek()
    if (bookingStore.bookingType === BookingTypesEnum.DAY) bookingStore.setDayRange()
    bookingStore.fetchBookings()
  }
)
watch(
  () => bookingStore.bookingType,
  () => {
    if (bookingStore.bookingType === BookingTypesEnum.WEEK) bookingStore.setStartOfWeek()
    if (bookingStore.bookingType === BookingTypesEnum.DAY) bookingStore.setDayRange()
  }
)
</script>

<template>
  <div>
    <div :class="['heading', 'font-26']">Букинг</div>
    <div :class="['mt-12', $style.wrapper]">
      <div :class="uiStore.mdAndDown ? 'flex-column' : ''" class="d-flex mb-4">
        <div :class="uiStore.smAndDown ? 'flex-column' : ''" class="d-flex">
          <div :class="uiStore.isXs ? 'flex-column' : ''" class="d-flex">
            <div class="mb-1">
              <el-radio-group
                v-model="bookingStore.bookingType"
                class="mr-2"
                size="large"
                style="min-width: 170px"
              >
                <el-radio-button :label="BookingTypesEnum.DAY"
                  >{{ bookingTypesReadable(BookingTypesEnum.DAY) }}
                </el-radio-button>
                <el-radio-button :label="BookingTypesEnum.WEEK"
                  >{{ bookingTypesReadable(BookingTypesEnum.WEEK) }}
                </el-radio-button>
              </el-radio-group>
            </div>

            <div class="mr-4">
              <el-date-picker
                v-if="bookingStore.bookingType === BookingTypesEnum.DAY"
                v-model="bookingStore.dateRange[0]"
                :class="uiStore.isXs ? 'w-full' : ''"
                :clearable="false"
                :format="dateFormat"
                class="mb-1"
                placeholder="Выберите дату"
                size="large"
                type="date"
              ></el-date-picker>
              <el-date-picker
                v-else
                v-model="bookingStore.dateRange[0]"
                :class="uiStore.isXs ? 'w-full' : ''"
                :format="weekPlaceholder"
                class="mb-1"
                placeholder="Выберите неделю"
                size="large"
                type="week"
              />
            </div>
          </div>

          <div class="d-flex mb-1">
            <div class="mr-2">
              <el-button
                :class="[$style.button, $style.outlined]"
                size="large"
                @click="bookingStore.resetDateRange()"
              >
                {{ bookingStore.bookingType === BookingTypesEnum.DAY ? 'Сегодня' : 'Текущая' }}
              </el-button>
            </div>
            <div class="mr-2">
              <el-button
                :class="[$style.button, $style.outlined]"
                size="large"
                @click="bookingStore.previous()"
              >
                <el-icon>
                  <ArrowLeftBold />
                </el-icon>
              </el-button>
            </div>
            <div class="mr-2">
              <el-button
                :class="[$style.button, $style.outlined]"
                size="large"
                @click="bookingStore.next()"
              >
                <el-icon>
                  <ArrowRightBold />
                </el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <div v-if="!uiStore.mdAndDown" class="spacer" />
        <div class="d-flex">
          <el-button :class="[$style.button, $style.outlined, 'mr-4']" size="large"
            >Распечатать
          </el-button>
          <el-button
            :class="[$style.button, $style.submit, 'mr-4']"
            size="large"
            @click="createVisit()"
            >Создать визит
          </el-button>
        </div>
      </div>
      <BookingSchedule v-loading="bookingStore.bookingsLoading" />
      <BookingEditVisitSidebar />
    </div>
  </div>
</template>

<style lang="stylus" scoped>
:deep(.el-form-item__label)
  color: $cTextMuted
  font-weight 400 !important
  font-size 12px !important
  line-height 16px !important

:deep(.el-checkbox__label)
  word-wrap break-word
  width 100%

:deep(.el-button + .el-button)
  margin-left 0

:deep(.el-input__wrapper)
  width 100%

:deep(.el-tabs__item)
  color: $cTextMuted
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
</style>

<style lang="stylus" module>
.wrapper
  padding 24px
  margin-top 24px
  overflow-x hidden
  background white
  width 100%
  box-shadow 0 0 8 0 rgba(26, 14, 62, 0.25)
  border-radius 8px

.button
  cursor pointer
  padding 10px
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
  background: white !important

.submit
  border none !important
  color white !important
  background: $cPrimary !important
</style>
