/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';
import type { ScheduleSchema } from './ScheduleSchema';

/**
 * Global response scheme
 */
export type ResponseWrapper_ScheduleSchema_ = {
    /**
     * Response data
     */
    data?: ScheduleSchema;
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
