/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OfficeLinkTypeEnum } from './OfficeLinkTypeEnum';

export type OfficeLink = {
    link: string;
    type: OfficeLinkTypeEnum;
    public?: boolean;
};
