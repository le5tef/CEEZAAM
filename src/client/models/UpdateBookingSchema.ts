/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingSourceEnum } from './BookingSourceEnum';
import type { BookingTypeEnum } from './BookingTypeEnum';

export type UpdateBookingSchema = {
    source: BookingSourceEnum;
    type: BookingTypeEnum;
    comment: string;
    room: string;
    master_ids: Array<string>;
    service_ids: Array<string>;
    date: string;
};
