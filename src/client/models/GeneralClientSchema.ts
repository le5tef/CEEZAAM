/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCommunicationWayEntity } from './ClientCommunicationWayEntity';
import type { SexEnum } from './SexEnum';

export type GeneralClientSchema = {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    sex?: SexEnum;
    birthday?: string;
    phone?: string;
    email?: string;
    comment_note?: string;
    know_about_us_from?: string;
    id: string;
    company_id: string;
    categories?: Array<string>;
    communication_ways?: Array<ClientCommunicationWayEntity>;
};
