/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientFilterSchema } from '../models/ClientFilterSchema';
import type { CreateClientSchema } from '../models/CreateClientSchema';
import type { ResponseWrapper_ClientSchema_ } from '../models/ResponseWrapper_ClientSchema_';
import type { ResponseWrapper_list_app_api_http_schemas_clients_client_GeneralClientSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_clients_client_GeneralClientSchema__';
import type { UpdateClientSchema } from '../models/UpdateClientSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientsService {

    /**
     * Clients  List
     * @param requestBody 
     * @returns ResponseWrapper_list_app_api_http_schemas_clients_client_GeneralClientSchema__ Successful Response
     * @throws ApiError
     */
    public static clientsList(
requestBody: ClientFilterSchema,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_clients_client_GeneralClientSchema__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/clients/list',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clients  Get
     * @param clientId 
     * @returns ResponseWrapper_ClientSchema_ Successful Response
     * @throws ApiError
     */
    public static clientsGet(
clientId: string,
): CancelablePromise<ResponseWrapper_ClientSchema_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/clients/{client_id}',
            path: {
                'client_id': clientId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clients  Create
     * @param requestBody 
     * @returns ResponseWrapper_ClientSchema_ Successful Response
     * @throws ApiError
     */
    public static clientsCreate(
requestBody: CreateClientSchema,
): CancelablePromise<ResponseWrapper_ClientSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/clients/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Clients  Update
     * @param clientId 
     * @param requestBody 
     * @returns ResponseWrapper_ClientSchema_ Successful Response
     * @throws ApiError
     */
    public static clientsUpdate(
clientId: string,
requestBody: UpdateClientSchema,
): CancelablePromise<ResponseWrapper_ClientSchema_> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/clients/{client_id}/update',
            path: {
                'client_id': clientId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
