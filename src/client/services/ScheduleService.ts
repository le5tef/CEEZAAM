/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResponseWrapper } from '../models/ResponseWrapper';
import type { ResponseWrapper_ScheduleSchema_ } from '../models/ResponseWrapper_ScheduleSchema_';
import type { ScheduleFilterSchema } from '../models/ScheduleFilterSchema';
import type { SchedulePeriodUpdateSchema } from '../models/SchedulePeriodUpdateSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScheduleService {

    /**
     * Schedule
     * @param requestBody 
     * @returns ResponseWrapper_ScheduleSchema_ Successful Response
     * @throws ApiError
     */
    public static schedule(
requestBody: ScheduleFilterSchema,
): CancelablePromise<ResponseWrapper_ScheduleSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/get',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Schedule  Update
     * @param requestBody 
     * @returns ResponseWrapper Successful Response
     * @throws ApiError
     */
    public static scheduleUpdate(
requestBody: SchedulePeriodUpdateSchema,
): CancelablePromise<ResponseWrapper> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
