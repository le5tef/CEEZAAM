/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCategorySchema } from './ClientCategorySchema';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_ClientCategorySchema_ = {
    /**
     * Response data
     */
    data?: ClientCategorySchema;
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
