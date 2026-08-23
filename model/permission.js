import Sequelize from "sequelize";
import { defineModel } from "../core/customSequelize.js";

const Permission = defineModel("permissions", {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  permissionKey: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
  },
  permissionName: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
  },
  resourceType: {
    type: Sequelize.INTEGER(255),
    unique: true,
    allowNull: false,
  },
  resourceId: {
    type: Sequelize.BIGINT(20),
    unique: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 1,
  },
});

export default Permission;
