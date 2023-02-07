/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_users__request_password_recovery } from '../models/Body_users__request_password_recovery';
import type { ResetPasswordSchema } from '../models/ResetPasswordSchema';
import type { ResponseWrapper_NoneType_ } from '../models/ResponseWrapper_NoneType_';
import type { ResponseWrapper_UserSchema_ } from '../models/ResponseWrapper_UserSchema_';
import type { UpdateUserEntity } from '../models/UpdateUserEntity';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * Users  Profile
     * Returns authenticated user
     * @returns ResponseWrapper_UserSchema_ Successful Response
     * @throws ApiError
     */
    public static usersProfile(): CancelablePromise<ResponseWrapper_UserSchema_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/profile',
        });
    }

    /**
     * Users  Profile Update
     * Update profile
     * @param requestBody 
     * @returns ResponseWrapper_UserSchema_ Successful Response
     * @throws ApiError
     */
    public static usersProfileUpdate(
requestBody: UpdateUserEntity,
): CancelablePromise<ResponseWrapper_UserSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/profile/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Users  Request Password Recovery
     * Request reset password by email
     * @param requestBody 
     * @returns ResponseWrapper_NoneType_ Successful Response
     * @throws ApiError
     */
    public static usersRequestPasswordRecovery(
requestBody: Body_users__request_password_recovery,
): CancelablePromise<ResponseWrapper_NoneType_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/request_password_recovery',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Users  Reset Password
     * Update password by reset token from email
     * @param requestBody 
     * @returns ResponseWrapper_NoneType_ Successful Response
     * @throws ApiError
     */
    public static usersResetPassword(
requestBody: ResetPasswordSchema,
): CancelablePromise<ResponseWrapper_NoneType_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/reset_password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
