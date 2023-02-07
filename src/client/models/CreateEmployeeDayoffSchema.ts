/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmployeeDayoffTypeEnum } from './EmployeeDayoffTypeEnum';

export type CreateEmployeeDayoffSchema = {
    type: EmployeeDayoffTypeEnum;
    date_from: string;
    date_to?: string;
    reason?: string;
};
