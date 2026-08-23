import Joi from 'joi'

const userSchema = {
  createUser: {
    body: Joi.object({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .required(),
    }),
  },

  listUsers: {
    body: Joi.object({
      data: {
        pageNum: Joi.number().integer().min(1).default(1),
        pageSize: Joi.number().integer().min(1).max(100).default(10),
      }
    }),
  },
};

export default userSchema;
