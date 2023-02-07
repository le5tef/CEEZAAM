/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OfficeEmail } from './OfficeEmail';
import type { OfficeFeature } from './OfficeFeature';
import type { OfficeLink } from './OfficeLink';
import type { OfficePhone } from './OfficePhone';

export type UpdateCompanyOfficeSchema = {
    workplaces_count: number;
    address?: string;
    address_note?: string;
    phones?: Array<OfficePhone>;
    emails?: Array<OfficeEmail>;
    links?: Array<OfficeLink>;
    features?: Array<OfficeFeature>;
};
