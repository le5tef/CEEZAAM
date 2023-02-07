/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponseWrapper } from '../models/ResponseWrapper';
import type { ResponseWrapper_BaseSettings_ } from '../models/ResponseWrapper_BaseSettings_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HealthcheckService {

    /**
     * Ping
     * @returns ResponseWrapper Successful Response
     * @throws ApiError
     */
    public static ping(): CancelablePromise<ResponseWrapper> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/healthcheck/ping',
        });
    }

    /**
     * Get Settings
     * @returns ResponseWrapper_BaseSettings_ Successful Response
     * @throws ApiError
     */
    public static settings(): CancelablePromise<ResponseWrapper_BaseSettings_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/healthcheck/settings',
        });
    }

}
