import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port().default(3000),

  POSTGRES_HOST: Joi.string().hostname().default('localhost'),
  POSTGRES_PORT: Joi.number().port().default(5432),
  POSTGRES_USER: Joi.string().default('postgres'),
  POSTGRES_PASSWORD: Joi.string().default('postgres'),
  POSTGRES_DB: Joi.string().default('test-boilerplate'),

  MONGO_URI: Joi.string().uri().default('mongodb://localhost:27017/test-boilerplate'),
});

export const validationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};
