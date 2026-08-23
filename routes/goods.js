import Router from "@koa/router";
import GoodsController from "../controllers/goods.js";
import validate from "../middlewares/validator.js";
import goodsSchema from "../validators/goods.validator.js";

const goods = new Router({ prefix: "/goods" });

goods.post("/create", validate(goodsSchema.create), (ctx) =>
  GoodsController.create(ctx),
);

goods.post("/info", validate(goodsSchema.byId), (ctx) =>
  GoodsController.getById(ctx),
);

goods.post("/list", validate(goodsSchema.list), (ctx) =>
  GoodsController.list(ctx),
);

goods.post("/update", validate(goodsSchema.update), (ctx) =>
  GoodsController.update(ctx),
);

goods.post("/delete", validate(goodsSchema.byId), (ctx) =>
  GoodsController.delete(ctx),
);

export default goods;
