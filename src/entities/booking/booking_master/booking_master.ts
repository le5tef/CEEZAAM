import type {
  IBookingMaster,
  IBookingMasterData,
} from '@/entities/booking/booking_master/booking_master.types'

export class BookingMaster implements IBookingMaster {
  id: string
  first_name?: string
  last_name?: string
  avatar?: string

  constructor(data: IBookingMasterData) {
    Object.assign(this, data)
  }
}
