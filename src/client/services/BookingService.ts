/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookingFilterSchema } from '../models/BookingFilterSchema';
import type { CreateBookingSchema } from '../models/CreateBookingSchema';
import type { DeleteBookingSchema } from '../models/DeleteBookingSchema';
import type { ResponseWrapper } from '../models/ResponseWrapper';
import type { ResponseWrapper_BookingSchema_ } from '../models/ResponseWrapper_BookingSchema_';
import type { ResponseWrapper_list_app_api_http_schemas_schedule_booking_BookingSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_schedule_booking_BookingSchema__';
import type { ResponseWrapper_ListBookingSchema_ } from '../models/ResponseWrapper_ListBookingSchema_';
import type { UpdateBookingSchema } from '../models/UpdateBookingSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BookingService {

    /**
     * Booking  List
     * @param requestBody 
     * @returns ResponseWrapper_ListBookingSchema_ Successful Response
     * @throws ApiError
     */
    public static bookingList(
requestBody: BookingFilterSchema,
): CancelablePromise<ResponseWrapper_ListBookingSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/booking/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Booking  New
     * @param requestBody 
     * @returns ResponseWrapper_list_app_api_http_schemas_schedule_booking_BookingSchema__ Successful Response
     * @throws ApiError
     */
    public static bookingNew(
requestBody: CreateBookingSchema,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_schedule_booking_BookingSchema__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/schedule/booking/new',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Booking  Update
     * @param bookingId 
     * @param requestBody 
     * @returns ResponseWrapper_BookingSchema_ Successful Response
     * @throws ApiError
     */
    public static bookingUpdate(
bookingId: string,
requestBody: UpdateBookingSchema,
): CancelablePromise<ResponseWrapper_BookingSchema_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/schedule/booking/{booking_id}/update',
            path: {
                'booking_id': bookingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Booking  Delete
     * @param bookingId 
     * @param requestBody 
     * @returns ResponseWrapper Successful Response
     * @throws ApiError
     */
    public static bookingDelete(
bookingId: string,
requestBody: DeleteBookingSchema,
): CancelablePromise<ResponseWrapper> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/schedule/booking/{booking_id}/delete',
            path: {
                'booking_id': bookingId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
