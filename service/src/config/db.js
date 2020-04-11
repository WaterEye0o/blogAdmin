const Sequelize = require('sequelize');
const { db } = require('./index');

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
  // timezone: '+8:00', // 由于orm用的UTC时间，这里必须加上东八区，否则取出来的时间相差8小时
  dialectOptions: {  // 让读取date类型数据时返回字符串而不是UTC时间
    dateStrings: true,
    typeCast(field, next) {
      if (field.type === "DATETIME") {
          return field.string();
      }
      return next();
    }
  }
});

exports.sequelize = sequelize;

exports.defineModel = function(name, attributes) {
  var attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        // allowNull: false
      };
    }
  }
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: true
  };
  attrs.createUser = {
    type: Sequelize.STRING,
    allowNull: true,
  };
  attrs.updateUser = {
    type: Sequelize.STRING,
    allowNull: true,
  };
  return sequelize.define(name, attrs, {
    tableName: name,
    timestamps: true,
    paranoid: true,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    hooks: {
      beforeBulkCreate: function(obj) {
        obj.version = 0;
      },
      beforeValidate: function(obj) {
        if (obj.isNewRecord) {
          console.log('first');
          obj.version = 0;
        } else {
          console.log('not first');
          obj.version = obj.version + 1;
        }
      },
    },
  });
};
