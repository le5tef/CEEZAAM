import type {
  IBooking,
  IBookingCreate,
  IBookingCreateData,
  IBookingData,
  IBookingUpdate,
  IBookingUpdateData,
} from '@/entities/booking/booking/booking.types'
import type {
  BookingSchema,
  BookingSourceEnum,
  BookingTypeEnum,
  CreateBookingSchema,
  UpdateBookingSchema,
} from '@/client'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export class BookingCreate implements IBookingCreate {
  source: BookingSourceEnum
  type: BookingTypeEnum
  comment: string
  room: string
  master_ids: Array<string>
  service_ids: Array<string>
  client_id: string
  office_id: string
  dates: Date[]

  constructor(data: IBookingCreateData) {
    Object.assign(this, data)
  }

  toSchema(): CreateBookingSchema {
    return {
      ...this,
      dates: this.dates.map((x) => dayjs(x).tz('utc', true).toISOString()),
    }
  }
}

export class BookingUpdate implements IBookingUpdate {
  id: string
  source: BookingSourceEnum
  type: BookingTypeEnum
  comment: string
  room: string
  master_ids: Array<string>
  service_ids: Array<string>
  client_id: string
  office_id: string
  date: Date

  constructor(data: IBookingUpdateData) {
    Object.assign(this, data)
  }

  toSchema(): UpdateBookingSchema {
    return {
      ...this,
      date: dayjs(this.date).tz('utc', true).toISOString(),
    }
  }
}

export class Booking implements IBooking {
  source: BookingSourceEnum
  type: BookingTypeEnum
  comment: string
  room: string
  master_ids: Array<string>
  service_ids: Array<string>
  client_id: string
  office_id: string
  start_at: string
  end_at: string
  id: string

  constructor(data: IBookingData) {
    Object.assign(this, data)
  }

  static fromSchema(schema: BookingSchema) {
    return new Booking(schema)
  }
}
