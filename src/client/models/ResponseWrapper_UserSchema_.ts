/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';
import type { UserSchema } from './UserSchema';

/**
 * Global response scheme
 */
export type ResponseWrapper_UserSchema_ = {
    /**
     * Response data
     */
    data?: UserSchema;
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
