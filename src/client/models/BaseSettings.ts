/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ENVEnum } from './ENVEnum';

/**
 * Base project settings
 */
export type BaseSettings = {
    ENV?: ENVEnum;
    DEBUG?: boolean;
    SERVICE_NAME?: string;
    VERSION?: string;
    LOGGING_LEVEL?: string;
    LOGGING_SERIALIZE?: boolean;
    SENTRY_URL?: string;
    CORS_ORIGINS?: Array<string>;
    FRONTEND_USER_ACTIVATION_URL?: string;
    FRONTEND_USER_RESET_PWD_URL?: string;
    POSTGRES_HOST?: string;
    POSTGRES_PORT?: number;
    POSTGRES_DB?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_POOL_SIZE?: number;
    POSTGRES_POOL_MAX_OVERFLOW?: number;
    REDIS_HOST?: string;
    REDIS_PORT?: number;
    REDIS_USER?: string;
    REDIS_PASSWORD: string;
    REDIS_DB?: number;
    REDIS_ROOT_KEY_PREFIX?: string;
    REDIS_POOL_MAX_CONNECTIONS?: number;
    PASSLIB_SCHEME?: string;
    PASSWORD_SALT: string;
    JWT_ALGORITHM?: string;
    JWT_AUTH_SECRET: string;
    JWT_ACCESS_TOKEN_TTL?: number;
    JWT_REFRESH_TOKEN_TTL?: number;
    MEDIA_DIR?: string;
    USER_ACTIVATION_TOKEN_TTL?: number;
    USER_RECOVERY_TOKEN_TTL?: number;
    JWT_TOKENS_SECRET: string;
    SMTP_HOST?: string;
    SMTP_PORT?: number;
    SMTP_LOGIN: string;
    SMTP_PASSWORD: string;
    SMTP_SENDER_EMAIL?: string;
};
