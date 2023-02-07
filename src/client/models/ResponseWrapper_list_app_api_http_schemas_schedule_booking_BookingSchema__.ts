/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingSchema } from './BookingSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_list_app_api_http_schemas_schedule_booking_BookingSchema__ = {
    /**
     * Response data
     */
    data?: Array<BookingSchema>;
    /**
     * Success flag
     */
    is_success?: boolean;
    /**
     * Pagination object (if available)
     */
    pagination?: ResponsePagingByPage;
    /**
     * Error details (if request not successes)
     */
    error?: ErrorWrapper;
};
