import { defineAutoInitStore } from '../utils'
import dayjs from 'dayjs'
import {
  allWeekDays,
  BookingTypesEnum,
  CommunicationWaysEnum,
  DayOfWeekEnum,
  SexEnum,
} from '@/enums'
import { useBookingService } from '@/services/booking'
import type { BookingCell, BookingMasterData } from '@/entities/booking'
import { BookingCreate, BookingFilter, BookingUpdate, ListBooking } from '@/entities/booking'
import { useCompanyStore } from '@/store'
import type { BookingSourceEnum, BookingTypeEnum } from '@/client'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('utc')

const bookingService = useBookingService()

const stateDefault = Object.freeze({
  dateRange: [dayjs().toDate(), dayjs().toDate()],
})

const visitForm = {
  id: null as string | null,
  client_id: null as string | null,
  visit_time: [new Date()] as Date[],
  visit_type: null as BookingTypeEnum | null,
  visit_origin: null as BookingSourceEnum | null,
  services: [] as string[],
  masters: [] as string[],
  room: '' as string,
  description: null as string | null,
  comment: '' as string,

  first_name: null as string | null,
  last_name: null as string | null,
  patronymic: null as string | null,
  phone: null as string | null,
  birthDate: null as Date | null,
  sex: {
    label: null as string | null,
    value: null as SexEnum | null,
  },
  categories: [] as string[],
  email: null as string | null,
  allowCommunicationWays: [] as { value: CommunicationWaysEnum; id: string }[] | null,
  howDidYouKnow: {
    label: null as string | null,
    value: null as string | null,
  },
  distanceFromSaloon: {
    id: 0,
    label: null as string | null,
    value: {
      from: null as number | null,
      to: null as number | null,
    },
  },
  favoriteMaster: [] as string[],
  interests: null as string | null,
  contraindications: null as string | null,
}

export const useBookingStore = defineAutoInitStore('booking', {
  state: () => ({
    isInitInProgress: false,
    ready: false,
    dateRange: [...stateDefault.dateRange] as Date[],
    bookingType: BookingTypesEnum.DAY as BookingTypesEnum,
    sidebarActive: false as boolean,
    temp_visit: structuredClone(visitForm) as typeof visitForm,
    bookingsLoading: false,
    // currentVisit: {},
  }),
  getters: {
    days(): { date: dayjs.Dayjs; dayOfWeek: DayOfWeekEnum }[] {
      const dates = []
      const currentDate = this.dateRange[0]
      const endDate = this.dateRange[1]
      for (let i = 0; i < dayjs(endDate).diff(currentDate, 'days'); i++) {
        dates.push({
          date: dayjs(currentDate).add(i, 'days'),
          dayOfWeek: allWeekDays[i],
        })
      }
      return dates
    },
    listBookings(): ListBooking | null {
      return bookingService.list_booking.value
    },
    masterOptions(): { label: string; value: string }[] {
      if (!this.listBookings) return []
      return this.listBookings.masters.map((x) => ({
        label: `${x.first_name} ${x.last_name}`,
        value: x.id,
      }))
    },
  },
  actions: {
    async init() {
      this.isInitInProgress = true
      await this.fetchBookings()
      this.ready = true
      this.isInitInProgress = false
    },
    async fetchBookings() {
      const _dateFormat = 'YYYY-MM-DD'
      const companyStore = useCompanyStore()
      if (!companyStore.currentOfficeId) {
        throw Error('Office must be selected')
      }

      const filter = new BookingFilter({
        date_gte: dayjs(this.dateRange[0]).format(_dateFormat),
        date_lte: dayjs(this.dateRange[1]).format(_dateFormat),
        office_id: companyStore.currentOfficeId,
      })
      this.bookingsLoading = true
      await bookingService.fetchBookings(filter)
      this.bookingsLoading = false
    },
    resetDateRange() {
      this.dateRange = [...stateDefault.dateRange]
    },
    clearTempVisit() {
      this.temp_visit = structuredClone(visitForm)
    },
    removeVisitDate(dateId: number) {
      this.temp_visit.visit_time = this.temp_visit.visit_time.filter((x, id) => id !== dateId)
    },
    async updateWeek() {
      this.dateRange = [this.dateRange[0], dayjs(this.dateRange[0]).add(7, 'days').toDate()]
    },
    setStartOfWeek() {
      this.dateRange = [
        dayjs(this.dateRange[0]).startOf('week').toDate(),
        dayjs(this.dateRange[0]).add(7, 'days').startOf('week').toDate(),
      ]
    },
    setDayRange() {
      this.dateRange = [this.dateRange[0], dayjs(this.dateRange[0]).toDate()]
    },
    next() {
      this.dateRange = [
        dayjs(this.dateRange[0])
          .add(this.bookingType === BookingTypesEnum.WEEK ? 7 : 1, 'days')
          .toDate(),
        dayjs(this.dateRange[1])
          .add(this.bookingType === BookingTypesEnum.WEEK ? 7 : 1, 'days')
          .toDate(),
      ]
    },
    previous() {
      this.dateRange = [
        dayjs(this.dateRange[0])
          .subtract(this.bookingType === BookingTypesEnum.WEEK ? 7 : 1, 'days')
          .toDate(),
        dayjs(this.dateRange[1])
          .subtract(this.bookingType === BookingTypesEnum.WEEK ? 7 : 1, 'days')
          .toDate(),
      ]
    },
    createVisit(data: { slot: BookingCell; master: BookingMasterData; day?: dayjs.Dayjs }) {
      const day = data.day ? data.day : this.dateRange[0]
      this.temp_visit = structuredClone(visitForm)
      this.temp_visit.masters = [data.master.id]
      this.temp_visit.visit_time[0] = dayjs(day)
        .set('hour', data.slot.hours)
        .set('minute', data.slot.minutes)
        .toDate()
      console.log(data.master.id)
    },
    async saveTempVisit(): Promise<void> {
      if (
        !this.temp_visit.visit_origin ||
        !this.temp_visit.visit_type ||
        !this.temp_visit.client_id ||
        (this.temp_visit.id && this.temp_visit.visit_time.length === 0)
      ) {
        throw Error("Can't save temp booking")
      }

      const companyStore = useCompanyStore()
      if (!companyStore.currentOfficeId) {
        throw Error('Company must be selected first')
      }

      if (!this.temp_visit.id) {
        const entity = new BookingCreate({
          source: this.temp_visit.visit_origin,
          type: this.temp_visit.visit_type,
          comment: this.temp_visit.comment,
          room: this.temp_visit.room,
          master_ids: this.temp_visit.masters,
          service_ids: this.temp_visit.services,
          client_id: this.temp_visit.client_id,
          office_id: companyStore.currentOfficeId,
          dates: this.temp_visit.visit_time,
        })
        await bookingService.createBooking(entity)
      } else {
        const entity = new BookingUpdate({
          source: this.temp_visit.visit_origin,
          type: this.temp_visit.visit_type,
          comment: this.temp_visit.comment,
          room: this.temp_visit.room,
          master_ids: this.temp_visit.masters,
          service_ids: this.temp_visit.services,
          client_id: this.temp_visit.client_id,
          office_id: companyStore.currentOfficeId,
          date: this.temp_visit.visit_time[0],
          id: this.temp_visit.id,
        })
        await bookingService.updateBooking(entity)
      }
    },
    async editBooking(id: string): Promise<void> {
      if (!this.listBookings) {
        throw Error('ListBookings not loaded')
      }
      const booking = this.listBookings.bookings.find((x) => x.id === id)
      if (!booking) {
        throw Error('Booking not found')
      }
      this.sidebarActive = true
      const startAt = dayjs(booking.start_at.split('+')[0])
      this.temp_visit = {
        ...structuredClone(visitForm),
        id: booking.id,
        client_id: booking.client_id,
        visit_time: [startAt.toDate()],
        visit_type: booking.type,
        visit_origin: booking.source,
        services: booking.service_ids,
        masters: booking.master_ids,
        room: booking.room,
        description: '',
        comment: booking.comment,
      }
    },
  },
})
