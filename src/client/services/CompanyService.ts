/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_company__create } from '../models/Body_company__create';
import type { Body_company__update } from '../models/Body_company__update';
import type { ResponseWrapper_CompanySchema_ } from '../models/ResponseWrapper_CompanySchema_';
import type { ResponseWrapper_list_app_api_http_schemas_company_company_CompanySchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_company_company_CompanySchema__';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompanyService {

    /**
     * Company  List
     * @returns ResponseWrapper_list_app_api_http_schemas_company_company_CompanySchema__ Successful Response
     * @throws ApiError
     */
    public static companyList(): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_company_company_CompanySchema__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/company/',
        });
    }

    /**
     * Company  Create
     * @param formData 
     * @returns ResponseWrapper_CompanySchema_ Successful Response
     * @throws ApiError
     */
    public static companyCreate(
formData: Body_company__create,
): CancelablePromise<ResponseWrapper_CompanySchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Update
     * @param companyId 
     * @param formData 
     * @returns ResponseWrapper_CompanySchema_ Successful Response
     * @throws ApiError
     */
    public static companyUpdate(
companyId: string,
formData: Body_company__update,
): CancelablePromise<ResponseWrapper_CompanySchema_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/company/{company_id}',
            path: {
                'company_id': companyId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
