const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Collect = db.defineModel('Collect', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  apiUrl: {
    type: Sequelize.STRING,
  },
  method: {
    type: Sequelize.STRING,
  },
  params: {
    type: Sequelize.STRING,
  },
  createTime: {
    type: Sequelize.STRING,
  },
});

module.exports = Collect;
