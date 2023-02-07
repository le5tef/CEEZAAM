/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorCode } from './ErrorCode';
import type { ErrorType } from './ErrorType';

export type ErrorWrapper = {
    type?: ErrorType;
    code?: ErrorCode;
    msg?: string;
    fields?: Array<any>;
};
