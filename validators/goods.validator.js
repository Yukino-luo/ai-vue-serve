import Joi from "joi";

const goodsSchema = {
  goods: {
    create: Joi.object({
      data: {
        name: Joi.string().min(1).max(100).required(),
        image: Joi.string().min(1).max(255).required(),
        banners: Joi.array().items(Joi.string()).max(10).required(),
        originalPrice: Joi.number().required(),
        currentPrice: Joi.number().required(),
        currency: Joi.string().min(1).max(10).required(),
        totalInventory: Joi.number().required(),
        currentInventory: Joi.number().required(),
        monthSales: Joi.number().required(),
        status: Joi.number().integer().min(0).max(1),
      },
    }),
  },

  update: {
    body: Joi.object({
      data: {
        id: [Joi.string().required(), Joi.number().required()],
        name: Joi.string().min(1).max(100),
        image: Joi.string().min(1).max(255),
        banners: Joi.array().items(Joi.string()).max(10),
        originalPrice: Joi.number(),
        currentPrice: Joi.number(),
        currency: Joi.string().min(1).max(10),
        totalInventory: Joi.number(),
        currentInventory: Joi.number(),
        monthSales: Joi.number(),
        status: Joi.number().integer().min(0).max(1),
      },
    }),
  },

  byId: {
    body: Joi.object({
      id: [Joi.string().required(), Joi.number().required()],
    }),
  },

  list: {
    body: Joi.object({
      data: {
        pageNum: Joi.number().integer().min(1).default(1),
        pageSize: Joi.number().integer().min(1).max(100).default(10),
        id: [Joi.string().empty(""), Joi.number()],
        name: Joi.string().max(100).empty(""),
        currency: Joi.string().max(10).empty(""),
        status: [Joi.string().empty(""), Joi.number().integer().min(0).max(1)],
        createdAtStart: Joi.string().max(100).empty(""),
        createdAtEnd: Joi.string().max(100).empty(""),
        orders: Joi.array().items(
          Joi.object({
            column: Joi.string(),
            asc: Joi.boolean(),
          }),
        ),
      },
    }),
  },
};

export default goodsSchema;
