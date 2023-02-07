/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateClientCategorySchema } from '../models/CreateClientCategorySchema';
import type { ResponseWrapper_ClientCategorySchema_ } from '../models/ResponseWrapper_ClientCategorySchema_';
import type { ResponseWrapper_list_app_api_http_schemas_clients_category_ClientCategorySchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_clients_category_ClientCategorySchema__';
import type { ResponseWrapper_NoneType_ } from '../models/ResponseWrapper_NoneType_';
import type { UpdateClientCategorySchema } from '../models/UpdateClientCategorySchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientsCategoriesService {

    /**
     * Clients  Category  List
     * @param companyId 
     * @returns ResponseWrapper_list_app_api_http_schemas_clients_category_ClientCategorySchema__ Successful Response
     * @throws ApiError
     */
    public static clientsCategoryList(
companyId: string,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_clients_category_ClientCategorySchema__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/clients/categories/{company_id}',
            path: {
                'company_id': companyId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clients  Category  Create
     * @param requestBody 
     * @returns ResponseWrapper_ClientCategorySchema_ Successful Response
     * @throws ApiError
     */
    public static clientsCategoryCreate(
requestBody: CreateClientCategorySchema,
): CancelablePromise<ResponseWrapper_ClientCategorySchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/clients/categories/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clients  Category  Update
     * @param categoryId 
     * @param requestBody 
     * @returns ResponseWrapper_ClientCategorySchema_ Successful Response
     * @throws ApiError
     */
    public static clientsCategoryUpdate(
categoryId: string,
requestBody: UpdateClientCategorySchema,
): CancelablePromise<ResponseWrapper_ClientCategorySchema_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/clients/categories/{category_id}/update',
            path: {
                'category_id': categoryId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clients  Category  Delete
     * @param categoryId 
     * @returns ResponseWrapper_NoneType_ Successful Response
     * @throws ApiError
     */
    public static clientsCategoryDelete(
categoryId: string,
): CancelablePromise<ResponseWrapper_NoneType_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/clients/categories/{category_id}/delete',
            path: {
                'category_id': categoryId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
