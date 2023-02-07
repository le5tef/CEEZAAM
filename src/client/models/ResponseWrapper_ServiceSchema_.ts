/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';
import type { ServiceSchema } from './ServiceSchema';

/**
 * Global response scheme
 */
export type ResponseWrapper_ServiceSchema_ = {
    /**
     * Response data
     */
    data?: ServiceSchema;
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
