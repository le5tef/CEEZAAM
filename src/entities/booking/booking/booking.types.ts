import type { BookingSourceEnum, BookingTypeEnum } from '@/client'
import type { CreateBookingSchema, UpdateBookingSchema } from '@/client'

export interface IAbstractBookingData {
  source: BookingSourceEnum
  type: BookingTypeEnum
  comment: string
  room: string
  master_ids: Array<string>
  service_ids: Array<string>
  client_id: string
  office_id: string
}

export type IBookingCreateData = IAbstractBookingData & {
  dates: Date[]
}

export type IBookingCreate = IBookingCreateData & {
  toSchema(): CreateBookingSchema
}

export type IBookingUpdateData = IAbstractBookingData & {
  id: string
  date: Date
}

export type IBookingUpdate = IBookingUpdateData & {
  toSchema(): UpdateBookingSchema
}

export type IBookingData = IAbstractBookingData & {
  id: string
  start_at: string
  end_at: string
}

export type BookingMasterShifts = {
  id: string
  name: string
  paid: boolean
  startAt: Date
  endAt: Date
}

export type BookingMasterData = {
  id: string
  name: string
  description: string
  shifts: BookingMasterShifts[]
}

export type BookingCell = {
  id: number
  label: string
  prettyHours: string
  prettyMinutes: string
  hours: number
  minutes: number
}

export type IBooking = IBookingData
