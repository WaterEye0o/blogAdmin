const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Tags = db.defineModel('Tags', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  createTime: {
    type: Sequelize.STRING,
  },
});

module.exports = Tags;
