/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyEmployeeRoleEnum } from './CompanyEmployeeRoleEnum';

export type ScheduleFilterSchema = {
    employees_ids?: Array<string>;
    roles?: Array<CompanyEmployeeRoleEnum>;
    office_id: string;
    shift_time_id?: string;
    date_from: string;
    date_to: string;
};
