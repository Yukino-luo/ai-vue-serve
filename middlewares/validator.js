// middleware/validator.js
import Joi from "joi";
import { ValidationError } from "../core/customError.js";

const validate = (schema) => {
  return async (ctx, next) => {
    const defaultSchema = {
      params: Joi.object({}),
      query: Joi.object({}),
      body: Joi.object({}),
    };

    const finalSchema = Object.assign({}, defaultSchema, schema);
    const errors = [];

    // 校验所有部分
    ["query", "params", "body"].forEach((key) => {
      if (finalSchema[key]) {
        const { error } = finalSchema[key].validate(ctx.request[key], {
          allowUnknown: true,
        });
        if (error) {
          errors.push({
            source: key,
            details: error.details.map((detail) => ({
              message: detail.message,
              type: detail.type,
            })),
          });
        }
      }
    });

    if (errors.length > 0) {
      throw new ValidationError(errors);
    }

    await next();
  };
};

export default validate;
