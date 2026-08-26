import CustomService from "../core/customService.js";
import GoodsModel from "../model/goods.js";
import { CustomError } from "../core/customError.js";
import ErrorCode from "../config/errorCodes.js";
import { Op } from "sequelize";

class GoodsService extends CustomService {
  constructor(model) {
    super();
    this.model = model;
  }

  async getGoods(data) {
    const { pageNum, pageSize, id, name, currency, status, createdAtStart, createdAtEnd, orders } = data;

    const queryOptions = [];
    id && queryOptions.push({ id: id });
    name && queryOptions.push({ name: { [Op.substring]: `%${name}` } });
    currency && queryOptions.push({ currency: currency });
    (status || status === 0) && queryOptions.push({ status: status });
    createdAtStart && queryOptions.push({ createdAt: { [Op.gte]: new Date(createdAtStart) } })
    createdAtEnd && queryOptions.push({ createdAt: { [Op.lte]: new Date(createdAtEnd) } })

    const orderOptions = []
    if (orders && orders.length) {
      orders.forEach((item) => {
        orderOptions.push([item.column, item.asc ? 'ASC' : 'DESC'])
      })
    }

    return await this.offsetPaginate({
      pageNum,
      pageSize,
      where: {
        [Op.and]: queryOptions,
      },
      order: orderOptions
    });
  }

  async getGoodsById(id) {
    const res = await GoodsModel.findByPk(id);
    if (!res) {
      throw new CustomError(ErrorCode[13001]);
    }
    return res;
  }

  async createGoods(data) {
    const res = await GoodsModel.create(data);
  }

  async updateGoods(data) {
    const res = await GoodsModel.findByPk(data.id);
    if (!res) {
      throw new CustomError(ErrorCode[13001]);
    } else {
      res.update(data);
      res.save();
    }
  }

  async deleteGoods(id) {
    const res = await GoodsModel.destroy({ where: { id: id } });
    if (!res) {
      throw new CustomError(ErrorCode[13001]);
    }
  }
}

export default new GoodsService(GoodsModel);
