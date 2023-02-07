/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GeneralClientSchema } from './GeneralClientSchema';

export type ClientRelationshipDetailedSchema = {
    id: string;
    to_client_id: string;
    to_client: GeneralClientSchema;
    grade_note?: string;
};
