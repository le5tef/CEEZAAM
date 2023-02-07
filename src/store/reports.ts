import { defineAutoInitStore } from '@/store/utils'
import dayjs from 'dayjs'

const stateDefault = Object.freeze({
  dateRange: [dayjs().startOf('week').toDate(), dayjs().endOf('week').toDate()],
})

export const useReportsStore = defineAutoInitStore('reports', {
  state: () => ({
    dateRange: [...stateDefault.dateRange] as Date[],
  }),
  getters: {},
  actions: {},
})
