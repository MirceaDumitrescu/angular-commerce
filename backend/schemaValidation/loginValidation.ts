import Joi from 'joi';

export const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(3).required().email({
      minDomainSegments: 2,
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')),
  });
  return schema.validate(data);
};
