import Koa from "koa";
import http from "http";
import json from "koa-json";
import cors from "@koa/cors";
import logger from "koa-logger";
import env from "dotenv/config";
import loadRoutes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import responseTime from "./middlewares/responseTime.js";
import syncDatabase from "./core/syncDatabase.js";
import { koaBody } from "koa-body";

const app = new Koa();

// middlewares
app.use(errorHandler);
app.use(responseTime);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024,
    },
    jsonLimit: "10mb",
    formLimit: "10mb",
    textLimit: "10mb",
  }),
);
app.use(cors());
app.use(json());
app.use(logger());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
loadRoutes(app);

const server = http.createServer(app.callback());
server.listen(3000);

server.on("listening", async () => {
  await syncDatabase();
});

export default app.callback()
