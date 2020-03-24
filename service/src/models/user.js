const Sequelize = require('sequelize');
// const Model = Sequelize.Model;
const db = require('../db/index.js');

// class User extends Model {}
// User.init({
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   mobile: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING
//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   isEmail: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false
//   }
// }, { Sequelize, modelName: 'User' })

const User = db.defineModel('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  isEmail: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
