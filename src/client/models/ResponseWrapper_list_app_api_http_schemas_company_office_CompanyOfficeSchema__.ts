/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyOfficeSchema } from './CompanyOfficeSchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_list_app_api_http_schemas_company_office_CompanyOfficeSchema__ = {
    /**
     * Response data
     */
    data?: Array<CompanyOfficeSchema>;
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
