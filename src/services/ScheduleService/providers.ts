import type {
  CreateScheduleShiftTimeSchema,
  ScheduleFilterSchema,
  SchedulePeriodUpdateSchema,
  ScheduleShiftTimeFilterSchema,
} from '@/client'
import { ScheduleService, ScheduleShiftService } from '@/client'
import { Logger } from '@/utils'

const logger = new Logger({ prefix: 'ScheduleService/providers' })

export async function getSchedule(filter: ScheduleFilterSchema) {
  const response = await ScheduleService.schedule(filter)
  logger.info('getSchedule()', response)
  return response
}

export async function getShifts(filter: ScheduleShiftTimeFilterSchema) {
  const response = await ScheduleShiftService.shiftTimeList(filter)
  logger.info('getShifts()', response)
  return response
}

export async function updateSchedule(update: SchedulePeriodUpdateSchema) {
  const response = await ScheduleService.scheduleUpdate(update)
  logger.info('updateSchedule()', response)
  return response
}

export async function createShift(data: CreateScheduleShiftTimeSchema) {
  const response = await ScheduleShiftService.shiftTimeCreate(data)
  logger.info(`createShift(${data})`, response)
  return response
}

export async function deleteShift(id: string) {
  const response = await ScheduleShiftService.shiftTimeDelete(id)
  logger.info(`deleteShift(${id})`, response)
  return response
}
