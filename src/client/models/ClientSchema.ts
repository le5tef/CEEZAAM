/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientCommunicationWaySchema } from './ClientCommunicationWaySchema';
import type { ClientRelationshipDetailedSchema } from './ClientRelationshipDetailedSchema';
import type { SexEnum } from './SexEnum';

export type ClientSchema = {
    first_name: string;
    middle_name?: string;
    last_name?: string;
    sex?: SexEnum;
    birthday?: string;
    phone?: string;
    email?: string;
    comment_note?: string;
    know_about_us_from?: string;
    categories?: Array<string>;
    hate_note?: string;
    like_note?: string;
    communication_ways?: Array<ClientCommunicationWaySchema>;
    relationships?: Array<ClientRelationshipDetailedSchema>;
    company_id: string;
    id: string;
};
