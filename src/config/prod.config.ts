import getEnv from './base.config';

export const prodConfig = {
  database: {
    DATABASE_URL: getEnv('DATABASE_URL'),
  },
  app: {
    PORT: getEnv('PORT'),
  },
};
