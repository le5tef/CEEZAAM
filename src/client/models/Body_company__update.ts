/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompanyTypeEnum } from './CompanyTypeEnum';

export type Body_company__update = {
    logo?: Blob;
    title: string;
    type: CompanyTypeEnum;
    primary_color: string;
    accent_color: string;
};
