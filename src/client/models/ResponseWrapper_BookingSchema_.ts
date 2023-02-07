/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BookingSchema } from './BookingSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_BookingSchema_ = {
    /**
     * Response data
     */
    data?: BookingSchema;
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
