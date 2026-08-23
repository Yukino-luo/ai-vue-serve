import jwt from 'jsonwebtoken'
import UserService from '../services/user.js'
import CustomController from '../core/customController.js'

class UserController extends CustomController {
  constructor(service) {
    super();
    this.service = service;
  }

  async list(ctx) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.body.data;
    const result = await UserService.getUsers({ page: pageNum, pageSize: pageSize });
    ctx.body = {
      code: 200,
      data: result,
      message: "ok",
    };
  }

  async create(ctx) {
    const { username, password } = ctx.request.body;
    await UserService.createUser({ username, password });
    ctx.body = {
      code: 200,
      data: {},
      message: "ok",
    };
  }

  async delete(ctx) {
    const { id } = ctx.query;
    await UserService.deleteUser(id);
    ctx.body = {
      code: 200,
      data: {},
      message: "ok",
    };
  }

  async login(ctx) {
    const { username, password } = ctx.request.body;
    const user = await UserService.validateUser({ username, password });
    // 生成 JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    ctx.body = {
      code: 200,
      data: { user, token },
      message: "ok",
    };
  }
}

export default new UserController(UserService);
