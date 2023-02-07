/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthCredentialsSchema } from '../models/AuthCredentialsSchema';
import type { Body_auth__logout } from '../models/Body_auth__logout';
import type { Body_auth__update_tokens } from '../models/Body_auth__update_tokens';
import type { Body_users__activate } from '../models/Body_users__activate';
import type { Body_users__resend_activation_email } from '../models/Body_users__resend_activation_email';
import type { Registration } from '../models/Registration';
import type { ResponseWrapper } from '../models/ResponseWrapper';
import type { ResponseWrapper_AuthSchema_ } from '../models/ResponseWrapper_AuthSchema_';
import type { ResponseWrapper_JWTTokensPairSchema_ } from '../models/ResponseWrapper_JWTTokensPairSchema_';
import type { ResponseWrapper_NoneType_ } from '../models/ResponseWrapper_NoneType_';
import type { ResponseWrapper_UserSchema_ } from '../models/ResponseWrapper_UserSchema_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Users  Sign Up
     * Create new user
     * @param requestBody 
     * @returns ResponseWrapper_UserSchema_ Successful Response
     * @throws ApiError
     */
    public static usersSignUp(
requestBody: Registration,
): CancelablePromise<ResponseWrapper_UserSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/registration/sign_up',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Users  Resend Activation Email
     * Resend user activation link
     * @param requestBody 
     * @returns ResponseWrapper_NoneType_ Successful Response
     * @throws ApiError
     */
    public static usersResendActivationEmail(
requestBody: Body_users__resend_activation_email,
): CancelablePromise<ResponseWrapper_NoneType_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/registration/resend_activation_email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Users  Activate
     * Activate user by activation token
     * @param requestBody 
     * @returns ResponseWrapper_UserSchema_ Successful Response
     * @throws ApiError
     */
    public static usersActivate(
requestBody: Body_users__activate,
): CancelablePromise<ResponseWrapper_UserSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/registration/activate_user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Auth  Sign In
     * Sign in user by credentials
     * @param requestBody 
     * @returns ResponseWrapper_AuthSchema_ Successful Response
     * @throws ApiError
     */
    public static authSignIn(
requestBody: AuthCredentialsSchema,
): CancelablePromise<ResponseWrapper_AuthSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/sign_in',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Auth  Update Tokens
     * Update user auth tokens by refresh token
     * @param requestBody 
     * @returns ResponseWrapper_JWTTokensPairSchema_ Successful Response
     * @throws ApiError
     */
    public static authUpdateTokens(
requestBody: Body_auth__update_tokens,
): CancelablePromise<ResponseWrapper_JWTTokensPairSchema_> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/update_tokens',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Auth  Logout
     * Revoke passed user auth tokens
     * @param requestBody 
     * @returns ResponseWrapper Successful Response
     * @throws ApiError
     */
    public static authLogout(
requestBody: Body_auth__logout,
): CancelablePromise<ResponseWrapper> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
