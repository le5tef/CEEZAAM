/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyOfficeSchema } from './CompanyOfficeSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_CompanyOfficeSchema_ = {
    /**
     * Response data
     */
    data?: CompanyOfficeSchema;
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
