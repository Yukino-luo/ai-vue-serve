import Sequelize from "sequelize";
import { defineModel } from "../core/customSequelize.js";
import User from "./user.js";

const Role = defineModel("roles", {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
  },
  status: {
    type: Sequelize.INTEGER(),
    allowNull: false,
    defaultValue: 1,
  },
});

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

export default Role;
