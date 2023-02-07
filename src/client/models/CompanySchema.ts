/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyTypeEnum } from './CompanyTypeEnum';

export type CompanySchema = {
    title: string;
    type: CompanyTypeEnum;
    primary_color: string;
    accent_color: string;
    id: string;
    logo: string;
};
