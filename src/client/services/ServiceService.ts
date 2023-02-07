/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateServiceSchema } from '../models/CreateServiceSchema';
import type { ResponseWrapper } from '../models/ResponseWrapper';
import type { ResponseWrapper_list_app_api_http_schemas_service_service_ServiceSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_service_service_ServiceSchema__';
import type { ResponseWrapper_ServiceSchema_ } from '../models/ResponseWrapper_ServiceSchema_';
import type { UpdateServiceSchema } from '../models/UpdateServiceSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceService {

    /**
     * Service  List
     * @param companyId 
     * @returns ResponseWrapper_list_app_api_http_schemas_service_service_ServiceSchema__ Successful Response
     * @throws ApiError
     */
    public static serviceList(
companyId: string,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_service_service_ServiceSchema__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/services/list',
            query: {
                'company_id': companyId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Service  Create
     * @param requestBody 
     * @returns ResponseWrapper_ServiceSchema_ Successful Response
     * @throws ApiError
     */
    public static serviceCreate(
requestBody: CreateServiceSchema,
): CancelablePromise<ResponseWrapper_ServiceSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/services/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Service  Update
     * @param serviceId 
     * @param requestBody 
     * @returns ResponseWrapper_ServiceSchema_ Successful Response
     * @throws ApiError
     */
    public static serviceUpdate(
serviceId: string,
requestBody: UpdateServiceSchema,
): CancelablePromise<ResponseWrapper_ServiceSchema_> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/services/{service_id}/update',
            path: {
                'service_id': serviceId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Service  Delete
     * @param serviceId 
     * @returns ResponseWrapper Successful Response
     * @throws ApiError
     */
    public static serviceDelete(
serviceId: string,
): CancelablePromise<ResponseWrapper> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/services/{service_id}/delete',
            path: {
                'service_id': serviceId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
