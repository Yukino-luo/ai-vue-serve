import Sequelize from "sequelize";
import moment from "moment";

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: (sql) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(sql);
    }
  },
});

export const defineModel = (name, attributes) => {
  var attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === "object" && value["type"]) {
      value.allowNull = value.allowNull ?? true;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: true,
      };
    }
  }
  attrs.createdBy = {
    type: Sequelize.STRING,
    allowNull: true,
  };
  attrs.updatedBy = {
    type: Sequelize.STRING,
    allowNull: true,
  };
  attrs.deletedBy = {
    type: Sequelize.STRING,
    allowNull: true,
  };
  ((attrs.createdAt = {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue("createdAt")).format(
        "YYYY-MM-DD HH:mm:ss",
      );
    },
  }),
    (attrs.updatedAt = {
      type: Sequelize.DATE,
      get() {
        return moment(this.getDataValue("updatedAt")).format(
          "YYYY-MM-DD HH:mm:ss",
        );
      },
    }));
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
    paranoid: true,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    hooks: {
      beforeCreate: (record, options) => {
        //
      },
      beforeUpdate: (record, options) => {
        //
      },
      beforeDestroy: (record, options) => {
        //
      },
    },
    defaultScope: {
      attributes: { exclude: ["deletedBy", "deletedAt"] },
    },
  });
};
