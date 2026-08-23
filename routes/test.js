import Router from "@koa/router";

const router = new Router();

router.get("/", (ctx) =>
  ctx.body = {
    code: 200,
    data: {},
    message: "ok",
  }
);

export default router;
