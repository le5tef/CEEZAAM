/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyEmployeeWithUserSchema } from './CompanyEmployeeWithUserSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_CompanyEmployeeWithUserSchema_ = {
    /**
     * Response data
     */
    data?: CompanyEmployeeWithUserSchema;
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
