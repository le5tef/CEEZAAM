/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';
import type { ServiceSchema } from './ServiceSchema';

/**
 * Global response scheme
 */
export type ResponseWrapper_list_app_api_http_schemas_service_service_ServiceSchema__ = {
    /**
     * Response data
     */
    data?: Array<ServiceSchema>;
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
