/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingListSchema } from './BookingListSchema';
import type { BookingMasterSchema } from './BookingMasterSchema';

export type ListBookingSchema = {
    masters: Array<BookingMasterSchema>;
    bookings: Array<BookingListSchema>;
};
