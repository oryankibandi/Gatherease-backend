import getEnv from './base.config';

export const devConfig = {
  database: {
    DATABASE_URL: getEnv('DATABASE_URL'),
  },
  app: {
    PORT: getEnv('PORT'),
  },
};
