import { sequelize } from "./customSequelize.js";
import Role from "../model/role.js";
import User from "../model/user.js";
import Goods from "../model/goods.js"

const initTable = async () => {
  try {
    const role = await Role.findOrCreate({
      where: { name: "admin" },
    });
    const user = await User.findOrCreate({
      where: { username: "admin" },
      defaults: {
        password: '123456',
        roleId: role[0].id
      },
    }); // 创建用户实例并保存到数据库
  } catch (error) {
    console.error("Error creating user or post:", error);
  }
};

const syncDatabase = async () => {
  await sequelize.authenticate();
  console.log("Database connection established");
  if (process.env.NODE_ENV === "development") {
    // 比对模型与现有表结构，自动增删改列
    // await sequelize.sync({ alter: true });

    // 先删除再重建表‌，导致数据丢失
    // await sequelize.sync({ force: true });

    // 若表不存在则创建，存在则不操作
    // await sequelize.sync({ force: false });
    await initTable();
    console.log("Development database synced");
  } else if (process.env.NODE_ENV === "test") {
    // await sequelize.sync({ force: true });
    console.log("Test database synced");
  } else {
    // 生产环境建议使用迁移，这里只确保连接
    console.log("Production database connected");
  }
};

export default syncDatabase;
