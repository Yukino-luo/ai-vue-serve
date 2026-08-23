import jwt from "jsonwebtoken";
import GoodsService from "../services/goods.js";
import CustomController from "../core/customController.js";

class GoodsController extends CustomController {
  constructor(service) {
    super();
    this.service = service;
  }

  async list(ctx) {
    const result = await GoodsService.getGoods(ctx.request.body.data);
    ctx.body = {
      code: 200,
      data: result,
      message: "ok",
    };
  }

  async getById(ctx) {
    const result = await GoodsService.getGoodsById(ctx.request.body.id);
    ctx.body = {
      code: 200,
      data: result,
      message: "ok",
    };
  }

  async create(ctx) {
    await GoodsService.createGoods(ctx.request.body.data);
    ctx.body = {
      code: 200,
      data: {},
      message: "ok",
    };
  }

  async update(ctx) {
    await GoodsService.updateGoods(ctx.request.body.data);
    ctx.body = {
      code: 200,
      data: {},
      message: "ok",
    };
  }

  async delete(ctx) {
    await GoodsService.deleteGoods(ctx.request.body.id);
    ctx.body = {
      code: 200,
      data: {},
      message: "ok",
    };
  }
}

export default new GoodsController(GoodsService);
