import type {
  CreateScheduleShiftTimeSchema,
  SchedulePeriodUpdateSchema,
  ScheduleSchema,
  ScheduleShiftTimeSchema,
  Weekdays,
} from '@/client'
import { CompanyEmployeeRoleEnum } from '@/client'
import { ScheduleService } from '@/services'
import { useCompanyStore } from '@/store/company'
import dayjs from 'dayjs'
import { Logger } from '@/utils'
import { useEmployeesStore } from '@/store/employees'
import { defineAutoInitStore } from '@/store/utils'

const logger = new Logger({ prefix: 'ScheduleStore' })

const dateFrom = dayjs().startOf('month')
const dateTo = dayjs().endOf('month')

export const dateFormat = 'YYYY-MM-DD'

export const useScheduleStore = defineAutoInitStore('schedule', {
  state: () => ({
    isInitInProgress: false as boolean,
    ready: false as boolean,
    selectedShiftTimeId: null as string | null,
    shifts: null as ScheduleShiftTimeSchema[] | null,
    schedule: null as ScheduleSchema | null,
    dateFrom: dateFrom as dayjs.Dayjs,
    dateTo: dateTo as dayjs.Dayjs,
    selectedDate: new Date() as Date,
  }),
  getters: {
    prettyShiftTime(): (shift: ScheduleShiftTimeSchema) => string {
      return (shift: ScheduleShiftTimeSchema) => {
        return shift.time_from.slice(0, -3) + ' - ' + shift.time_to.slice(0, -3)
      }
    },
    prettyShifts(): { pretty: string; id: string }[] {
      if (this.shifts === null) return []
      return this.shifts.map((x) => {
        return {
          id: x.id,
          pretty: this.prettyShiftTime(x),
        }
      })
    },
    selectedShift(): ScheduleShiftTimeSchema | null {
      if (this.shifts === null || this.selectedShiftTimeId === null) return null
      const selected = this.shifts.find((x) => x.id === this.selectedShiftTimeId)
      if (!selected) return null
      return selected
    },
  },
  actions: {
    async init() {
      if (this.ready) throw Error('Ready now')
      if (this.isInitInProgress) throw Error('Init already in progress')
      this.isInitInProgress = true
      try {
        await Promise.all([this.fetchShifts(), this.fetchSchedule()])
      } catch (e) {
        logger.error('Cannot initialize store', e)
      }
      this.ready = true
      this.isInitInProgress = false
    },
    async fetchShifts() {
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompanyOffice || !companyStore.currentCompany) {
        throw Error('Unexpected call, company and office doesnt initialized')
      }

      let response
      try {
        response = await ScheduleService.getShifts({
          office_ids: [companyStore.currentCompanyOffice.id],
        })
      } catch (e) {
        logger.error('fetchShifts()', e)
        throw e
      }

      if (response.is_success && response.data) {
        this.shifts = response.data
      }
    },
    async fetchSchedule() {
      const companyStore = useCompanyStore()
      const employeesStore = useEmployeesStore()
      if (!companyStore.currentCompanyOffice || !companyStore.currentCompany) {
        const err = Error('Unexpected call, company and office doesnt initialized')
        logger.error('fetchSchedule()', err)
        throw err
      }

      const roles = [CompanyEmployeeRoleEnum.ADMINISTRATOR]
      if (employeesStore.showMasters) {
        roles.push(CompanyEmployeeRoleEnum.MASTER)
      }

      let response
      try {
        response = await ScheduleService.getSchedule({
          roles,
          office_id: companyStore.currentCompanyOffice.id,
          shift_time_id: this.selectedShiftTimeId !== null ? this.selectedShiftTimeId : undefined,
          date_from: this.dateFrom.format(dateFormat),
          date_to: this.dateTo.format(dateFormat),
        })
      } catch (e) {
        logger.error('fetchSchedule()', e)
        throw e
      }

      if (response.is_success && response.data) {
        this.schedule = response.data
      }
    },
    async addMasterSchedule(record: {
      employeeId: string
      shiftId: string
      weekdays: Array<Weekdays>
      after: dayjs.Dayjs
      before: dayjs.Dayjs | null
    }) {
      const companyStore = useCompanyStore()
      if (!companyStore.currentCompanyOffice?.id) {
        const err = Error('Office not selected')
        logger.error('addMasterSchedule()', record, err)
        throw err
      }

      await ScheduleService.updateSchedule({
        employees: [record.employeeId],
        office_id: companyStore.currentCompanyOffice.id,
        shift_time_id: record.shiftId,
        weekdays: record.weekdays,
        after: record.after.format(dateFormat),
        before: record.before?.format(dateFormat),
      })
    },
    async updateSchedulePeriod(update: SchedulePeriodUpdateSchema) {
      const response = await ScheduleService.updateSchedule(update)
      await this.fetchSchedule()
      return response
    },
    async deleteShift(shiftId: string) {
      return await ScheduleService.deleteShift(shiftId)
    },
    async createShift(shift: CreateScheduleShiftTimeSchema) {
      return await ScheduleService.createShift(shift)
    },
  },
})
