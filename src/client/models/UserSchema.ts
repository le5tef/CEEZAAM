/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserSchema = {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    is_active: boolean;
    created_at: string;
    is_onboarding_finished: boolean;
};
