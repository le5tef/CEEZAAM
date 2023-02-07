/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Weekdays } from './Weekdays';

export type SchedulePeriodUpdateSchema = {
    office_id: string;
    shift_time_id: string;
    after: string;
    before?: string;
    weekdays: Array<Weekdays>;
    employees: Array<string>;
};
