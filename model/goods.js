import Sequelize from "sequelize";
import { defineModel } from "../core/customSequelize.js";

const Goods = defineModel("goods", {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  image: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  banners: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
    defaultValue: []
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  originalPrice: {
    type: Sequelize.DOUBLE(),
    allowNull: false,
    defaultValue: 0,
  },
  currentPrice: {
    type: Sequelize.DOUBLE(),
    allowNull: false,
    defaultValue: 0,
  },
  currency: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  totalInventory: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 0,
  },
  currentInventory: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 0,
  },
  monthSales: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 1,
  },
});

export default Goods;
