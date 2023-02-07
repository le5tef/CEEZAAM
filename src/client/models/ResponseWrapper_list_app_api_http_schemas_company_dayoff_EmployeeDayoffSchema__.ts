/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmployeeDayoffSchema } from './EmployeeDayoffSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_list_app_api_http_schemas_company_dayoff_EmployeeDayoffSchema__ = {
    /**
     * Response data
     */
    data?: Array<EmployeeDayoffSchema>;
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
