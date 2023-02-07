/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorWrapper } from './ErrorWrapper';
import type { ListBookingSchema } from './ListBookingSchema';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_ListBookingSchema_ = {
    /**
     * Response data
     */
    data?: ListBookingSchema;
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
