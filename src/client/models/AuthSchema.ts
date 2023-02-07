/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JWTTokenPair } from './JWTTokenPair';
import type { UserSchema } from './UserSchema';

export type AuthSchema = {
    tokens: JWTTokenPair;
    user: UserSchema;
};
