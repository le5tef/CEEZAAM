/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientFilterLastVisitSchema } from './ClientFilterLastVisitSchema';
import type { ClientFilterSexEnum } from './ClientFilterSexEnum';
import type { CommunicationWayEnum } from './CommunicationWayEnum';

export type ClientFilterSchema = {
    /**
     * Search by name or phone
     */
    search?: string;
    page?: number;
    limit?: ClientFilterSchema.limit;
    /**
     * If bool, then will be filtered by presenting
     */
    email?: (boolean | string);
    company_ids?: Array<string>;
    sex?: ClientFilterSexEnum;
    categories?: Array<string>;
    last_visit?: ClientFilterLastVisitSchema;
    know_about_us_from?: Array<string>;
    communication_ways?: Array<CommunicationWayEnum>;
};

export namespace ClientFilterSchema {

    export enum limit {
        '_5' = 5,
        '_10' = 10,
        '_15' = 15,
        '_20' = 20,
    }


}
