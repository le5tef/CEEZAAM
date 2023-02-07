/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCompanyOfficeSchema } from '../models/CreateCompanyOfficeSchema';
import type { ResponseWrapper_CompanyOfficeSchema_ } from '../models/ResponseWrapper_CompanyOfficeSchema_';
import type { ResponseWrapper_list_app_api_http_schemas_company_office_CompanyOfficeSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_company_office_CompanyOfficeSchema__';
import type { UpdateCompanyOfficeSchema } from '../models/UpdateCompanyOfficeSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompanyOfficeService {

    /**
     * Company  Offices List
     * @param companyId 
     * @returns ResponseWrapper_list_app_api_http_schemas_company_office_CompanyOfficeSchema__ Successful Response
     * @throws ApiError
     */
    public static companyOfficesList(
companyId: string,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_company_office_CompanyOfficeSchema__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/company/offices/',
            query: {
                'company_id': companyId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Office By Id
     * @param officeId 
     * @returns ResponseWrapper_CompanyOfficeSchema_ Successful Response
     * @throws ApiError
     */
    public static companyOfficeById(
officeId: string,
): CancelablePromise<ResponseWrapper_CompanyOfficeSchema_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/company/offices/{office_id}',
            path: {
                'office_id': officeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Office Add
     * @param requestBody 
     * @returns ResponseWrapper_CompanyOfficeSchema_ Successful Response
     * @throws ApiError
     */
    public static companyOfficeAdd(
requestBody: CreateCompanyOfficeSchema,
): CancelablePromise<ResponseWrapper_CompanyOfficeSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/offices/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Office Update
     * @param officeId 
     * @param requestBody 
     * @returns ResponseWrapper_CompanyOfficeSchema_ Successful Response
     * @throws ApiError
     */
    public static companyOfficeUpdate(
officeId: string,
requestBody: UpdateCompanyOfficeSchema,
): CancelablePromise<ResponseWrapper_CompanyOfficeSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/offices/{office_id}/update',
            path: {
                'office_id': officeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
