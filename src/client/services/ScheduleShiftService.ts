/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateScheduleShiftTimeSchema } from '../models/CreateScheduleShiftTimeSchema';
import type { ResponseWrapper } from '../models/ResponseWrapper';
import type { ResponseWrapper_list_app_api_http_schemas_schedule_shift_time_ScheduleShiftTimeSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_schedule_shift_time_ScheduleShiftTimeSchema__';
import type { ResponseWrapper_ScheduleShiftTimeSchema_ } from '../models/ResponseWrapper_ScheduleShiftTimeSchema_';
import type { ScheduleShiftTimeFilterSchema } from '../models/ScheduleShiftTimeFilterSchema';
import type { UpdateScheduleShiftTimeSchema } from '../models/UpdateScheduleShiftTimeSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ScheduleShiftService {

    /**
     * Shift Time  List
     * @param requestBody 
     * @returns ResponseWrapper_list_app_api_http_schemas_schedule_shift_time_ScheduleShiftTimeSchema__ Successful Response
     * @throws ApiError
     */
    public static shiftTimeList(
requestBody: ScheduleShiftTimeFilterSchema,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_schedule_shift_time_ScheduleShiftTimeSchema__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/shift_time',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Shift Time  Create
     * @param requestBody 
     * @returns ResponseWrapper_ScheduleShiftTimeSchema_ Successful Response
     * @throws ApiError
     */
    public static shiftTimeCreate(
requestBody: CreateScheduleShiftTimeSchema,
): CancelablePromise<ResponseWrapper_ScheduleShiftTimeSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/shift_time/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Shift Time  Update
     * @param shiftTimeId 
     * @param requestBody 
     * @returns ResponseWrapper_ScheduleShiftTimeSchema_ Successful Response
     * @throws ApiError
     */
    public static shiftTimeUpdate(
shiftTimeId: string,
requestBody: UpdateScheduleShiftTimeSchema,
): CancelablePromise<ResponseWrapper_ScheduleShiftTimeSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/shift_time/{shift_time_id}/update',
            path: {
                'shift_time_id': shiftTimeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Shift Time  Delete
     * @param shiftTimeId 
     * @returns ResponseWrapper Successful Response
     * @throws ApiError
     */
    public static shiftTimeDelete(
shiftTimeId: string,
): CancelablePromise<ResponseWrapper> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/schedule/shift_time/{shift_time_id}/delete',
            path: {
                'shift_time_id': shiftTimeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
