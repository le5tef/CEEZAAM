/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyEmployeeRoleEnum } from './CompanyEmployeeRoleEnum';
import type { RegistrationEntity } from './RegistrationEntity';

export type CreateCompanyEmployeeSchema = {
    role: CompanyEmployeeRoleEnum;
    attached_office_id?: string;
    characteristic: string;
    description: string;
    user: RegistrationEntity;
};
