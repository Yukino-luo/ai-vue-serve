import CustomService from '../core/customService.js'
import UserModel from '../model/user.js'
import RoleModel from '../model/role.js'
import { CustomError } from '../core/customError.js'
import ErrorCode from '../config/errorCodes.js'

class UserService extends CustomService {
  constructor(model) {
    super();
    this.model = model;
  }

  async getUsers({ page, pageSize }) {
    return await this.offsetPaginate({
      page,
      pageSize,
      attributes: {
        exclude: ["password"],
      },
    });
  }

  async getUserById(id) {
    return await UserModel.findByPk(id);
  }

  async createUser({ username, password }) {
    const res = await UserModel.create({ username, password });
  }

  async deleteUser(id) {
    const res = await UserModel.destroy({ where: { id: id } });
    if (!res) {
      throw new CustomError(ErrorCode[12001]);
    }
  }

  // 验证用户登录
  async validateUser({ username, password }) {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      throw new CustomError(ErrorCode[12001]);
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      throw new CustomError(ErrorCode[12002]);
    }
    return user;
  }
}

export default new UserService(UserModel);
