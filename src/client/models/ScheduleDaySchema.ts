/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScheduleDayEmployeeSchema } from './ScheduleDayEmployeeSchema';

export type ScheduleDaySchema = {
    day: string;
    employees: Array<ScheduleDayEmployeeSchema>;
};
