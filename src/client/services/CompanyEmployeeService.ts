/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_company__employee_dayoff_list } from '../models/Body_company__employee_dayoff_list';
import type { Body_company__employee_list } from '../models/Body_company__employee_list';
import type { Body_company__set_employee_avatar } from '../models/Body_company__set_employee_avatar';
import type { Body_company__set_employee_dayoff } from '../models/Body_company__set_employee_dayoff';
import type { CreateCompanyEmployeeSchema } from '../models/CreateCompanyEmployeeSchema';
import type { ResponseWrapper_CompanyEmployeeSchema_ } from '../models/ResponseWrapper_CompanyEmployeeSchema_';
import type { ResponseWrapper_CompanyEmployeeWithUserSchema_ } from '../models/ResponseWrapper_CompanyEmployeeWithUserSchema_';
import type { ResponseWrapper_EmployeeDayoffSchema_ } from '../models/ResponseWrapper_EmployeeDayoffSchema_';
import type { ResponseWrapper_list_app_api_http_schemas_company_dayoff_EmployeeDayoffSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_company_dayoff_EmployeeDayoffSchema__';
import type { ResponseWrapper_list_app_api_http_schemas_company_employee_CompanyEmployeeWithUserSchema__ } from '../models/ResponseWrapper_list_app_api_http_schemas_company_employee_CompanyEmployeeWithUserSchema__';
import type { UpdateCompanyEmployeeSchema } from '../models/UpdateCompanyEmployeeSchema';
import type { UpdateEmployeeDayoffSchema } from '../models/UpdateEmployeeDayoffSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompanyEmployeeService {

    /**
     * Company  Employee List
     * @param companyId 
     * @param officeId 
     * @param name 
     * @param withDismissed 
     * @param inDayoff 
     * @param requestBody 
     * @returns ResponseWrapper_list_app_api_http_schemas_company_employee_CompanyEmployeeWithUserSchema__ Successful Response
     * @throws ApiError
     */
    public static companyEmployeeList(
companyId: string,
officeId?: string,
name?: string,
withDismissed?: boolean,
inDayoff?: boolean,
requestBody?: Body_company__employee_list,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_company_employee_CompanyEmployeeWithUserSchema__> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/company/employees/',
            query: {
                'company_id': companyId,
                'office_id': officeId,
                'name': name,
                'with_dismissed': withDismissed,
                'in_dayoff': inDayoff,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Employee Add
     * @param companyId 
     * @param requestBody 
     * @returns ResponseWrapper_CompanyEmployeeWithUserSchema_ Successful Response
     * @throws ApiError
     */
    public static companyEmployeeAdd(
companyId: string,
requestBody: CreateCompanyEmployeeSchema,
): CancelablePromise<ResponseWrapper_CompanyEmployeeWithUserSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/employees/',
            query: {
                'company_id': companyId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Employee Update
     * @param employeeId 
     * @param requestBody 
     * @returns ResponseWrapper_CompanyEmployeeWithUserSchema_ Successful Response
     * @throws ApiError
     */
    public static companyEmployeeUpdate(
employeeId: string,
requestBody: UpdateCompanyEmployeeSchema,
): CancelablePromise<ResponseWrapper_CompanyEmployeeWithUserSchema_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/company/employees/{employee_id}',
            path: {
                'employee_id': employeeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Employee Dismiss
     * @param employeeId 
     * @returns ResponseWrapper_CompanyEmployeeSchema_ Successful Response
     * @throws ApiError
     */
    public static companyEmployeeDismiss(
employeeId: string,
): CancelablePromise<ResponseWrapper_CompanyEmployeeSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/employees/{employee_id}/dismiss',
            path: {
                'employee_id': employeeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Employee Undismiss
     * @param employeeId 
     * @returns ResponseWrapper_CompanyEmployeeSchema_ Successful Response
     * @throws ApiError
     */
    public static companyEmployeeUndismiss(
employeeId: string,
): CancelablePromise<ResponseWrapper_CompanyEmployeeSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/employees/{employee_id}/undismiss',
            path: {
                'employee_id': employeeId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Set Employee Avatar
     * @param employeeId 
     * @param formData 
     * @returns ResponseWrapper_CompanyEmployeeWithUserSchema_ Successful Response
     * @throws ApiError
     */
    public static companySetEmployeeAvatar(
employeeId: string,
formData: Body_company__set_employee_avatar,
): CancelablePromise<ResponseWrapper_CompanyEmployeeWithUserSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/employees/{employee_id}/set_avatar',
            path: {
                'employee_id': employeeId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Set Employee Dayoff
     * @param employeeId 
     * @param requestBody 
     * @returns ResponseWrapper_EmployeeDayoffSchema_ Successful Response
     * @throws ApiError
     */
    public static companySetEmployeeDayoff(
employeeId: string,
requestBody: Body_company__set_employee_dayoff,
): CancelablePromise<ResponseWrapper_EmployeeDayoffSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/employees/{employee_id}/dayoffs',
            path: {
                'employee_id': employeeId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Update Employee Dayoff
     * @param dayoffId 
     * @param requestBody 
     * @returns ResponseWrapper_EmployeeDayoffSchema_ Successful Response
     * @throws ApiError
     */
    public static companyUpdateEmployeeDayoff(
dayoffId: string,
requestBody: UpdateEmployeeDayoffSchema,
): CancelablePromise<ResponseWrapper_EmployeeDayoffSchema_> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/company/employees/dayoffs/{dayoff_id}/update',
            path: {
                'dayoff_id': dayoffId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Delete Employee Dayoff
     * @param dayoffId 
     * @returns ResponseWrapper_EmployeeDayoffSchema_ Successful Response
     * @throws ApiError
     */
    public static companyDeleteEmployeeDayoff(
dayoffId: string,
): CancelablePromise<ResponseWrapper_EmployeeDayoffSchema_> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/company/employees/dayoffs/{dayoff_id}',
            path: {
                'dayoff_id': dayoffId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Company  Employee Dayoff List
     * @param requestBody 
     * @returns ResponseWrapper_list_app_api_http_schemas_company_dayoff_EmployeeDayoffSchema__ Successful Response
     * @throws ApiError
     */
    public static companyEmployeeDayoffList(
requestBody: Body_company__employee_dayoff_list,
): CancelablePromise<ResponseWrapper_list_app_api_http_schemas_company_dayoff_EmployeeDayoffSchema__> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/company/employees/dayoffs',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
