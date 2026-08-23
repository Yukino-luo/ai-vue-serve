import Router from "@koa/router";
import CommonController from "../controllers/common.js";
import validate from "../middlewares/validator.js";
import commonSchema from "../validators/common.validator.js";

const router = new Router({ prefix: "/common" });

router.post("/upload", (ctx) =>
  CommonController.upload(ctx)
);

export default router;
