/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScheduleDaySchema } from './ScheduleDaySchema';

export type ScheduleSchema = {
    date_from: string;
    date_to: string;
    days: Record<string, ScheduleDaySchema>;
};
