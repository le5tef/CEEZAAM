/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ResetPasswordSchema = {
    reset_token: string;
    password: string;
    password_replay: string;
};
