/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmployeeDayoffTypeEnum } from './EmployeeDayoffTypeEnum';

export type EmployeeDayoffFilterSchema = {
    employee_ids: Array<string>;
    types: Array<EmployeeDayoffTypeEnum>;
    date_from?: string;
    date_to?: string;
};
