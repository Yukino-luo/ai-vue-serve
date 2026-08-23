import Router from "@koa/router";
import UserController from "../controllers/user.js";
import authMiddleware from "../middlewares/auth.js";
import validate from "../middlewares/validator.js";
import userSchema from "../validators/user.validator.js";

const router = new Router({ prefix: "/users" });

router.post("/create", validate(userSchema.createUser), (ctx) =>
  UserController.create(ctx)
);

router.post("/login", (ctx) => UserController.login(ctx));

router.post("/list", validate(userSchema.listUsers), (ctx) =>
  UserController.list(ctx)
);

router.delete("/delete", authMiddleware, (ctx) => UserController.delete(ctx));

export default router;
