/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CommunicationWayEnum } from './CommunicationWayEnum';

export type ClientCommunicationWaySchema = {
    way: CommunicationWayEnum;
    phone_number?: string;
    whatsapp_number?: string;
    telegram_number?: string;
    telegram_username?: string;
};
