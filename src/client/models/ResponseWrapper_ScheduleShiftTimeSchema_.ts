/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';
import type { ScheduleShiftTimeSchema } from './ScheduleShiftTimeSchema';

/**
 * Global response scheme
 */
export type ResponseWrapper_ScheduleShiftTimeSchema_ = {
    /**
     * Response data
     */
    data?: ScheduleShiftTimeSchema;
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
