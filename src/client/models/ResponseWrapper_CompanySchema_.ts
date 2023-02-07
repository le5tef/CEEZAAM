/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanySchema } from './CompanySchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_CompanySchema_ = {
    /**
     * Response data
     */
    data?: CompanySchema;
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
