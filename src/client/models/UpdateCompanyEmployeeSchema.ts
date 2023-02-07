/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyEmployeeRoleEnum } from './CompanyEmployeeRoleEnum';
import type { UpdateUserEntity } from './UpdateUserEntity';

export type UpdateCompanyEmployeeSchema = {
    role: CompanyEmployeeRoleEnum;
    attached_office_id?: string;
    characteristic: string;
    description: string;
    user: UpdateUserEntity;
};
