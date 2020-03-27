const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Message = db.defineModel('Message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: Sequelize.STRING,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  content: {
    type: Sequelize.STRING,
  },
  createTime: {
    type: Sequelize.STRING,
  },
});

module.exports = Message;
