/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyEmployeeRoleEnum } from './CompanyEmployeeRoleEnum';
import type { EmployeeDayoffSchema } from './EmployeeDayoffSchema';

export type CompanyEmployeeSchema = {
    role: CompanyEmployeeRoleEnum;
    attached_office_id?: string;
    characteristic: string;
    description: string;
    id: string;
    avatar?: string;
    company_id: string;
    user_id: string;
    active_dayoff?: EmployeeDayoffSchema;
    is_dismiss?: boolean;
    dismissed_at?: string;
};
