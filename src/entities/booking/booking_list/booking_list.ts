import type {
  IBookingList,
  IBookingListData,
} from '@/entities/booking/booking_list/booking_list.types'
import type { BookingSourceEnum, BookingTypeEnum } from '@/client'

export class BookingList implements IBookingList {
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

  constructor(data: IBookingListData) {
    Object.assign(this, data)
  }
}
