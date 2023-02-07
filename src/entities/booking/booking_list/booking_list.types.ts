import type { BookingSourceEnum, BookingTypeEnum } from '@/client'

export interface IBookingListData {
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
}

export type IBookingList = IBookingListData
