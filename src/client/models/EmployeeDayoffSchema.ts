/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmployeeDayoffTypeEnum } from './EmployeeDayoffTypeEnum';

export type EmployeeDayoffSchema = {
    type: EmployeeDayoffTypeEnum;
    date_from: string;
    date_to?: string;
    reason?: string;
    id: string;
    employee_id: string;
    actor_id: string;
};
