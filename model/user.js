import Sequelize from "sequelize";
import bcrypt from "bcryptjs";
import { defineModel } from "../core/customSequelize.js";

const User = defineModel("users", {
  id: {
    type: Sequelize.BIGINT(20),
    primaryKey: true,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING(255),
    unique: true,
    allowNull: false,
  }, // 名字
  password: {
    type: Sequelize.STRING(255),
    allowNull: false,
    set(value) {
      if (value) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      }
    },
  },
});

// 添加密码验证方法
User.prototype.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
