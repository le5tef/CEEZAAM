/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyEmployeeWithUserSchema } from './CompanyEmployeeWithUserSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_list_app_api_http_schemas_company_employee_CompanyEmployeeWithUserSchema__ = {
    /**
     * Response data
     */
    data?: Array<CompanyEmployeeWithUserSchema>;
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
