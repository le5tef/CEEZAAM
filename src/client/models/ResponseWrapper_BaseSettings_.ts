/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaseSettings } from './BaseSettings';
import type { ErrorWrapper } from './ErrorWrapper';
import type { ResponsePagingByPage } from './ResponsePagingByPage';

/**
 * Global response scheme
 */
export type ResponseWrapper_BaseSettings_ = {
    /**
     * Response data
     */
    data?: BaseSettings;
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
