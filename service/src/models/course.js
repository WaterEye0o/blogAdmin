const Sequelize = require('sequelize');
const db = require('../config/db.js');

const Course = db.defineModel('Course', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  brief: {
    type: Sequelize.STRING,
  },
  dateTime: {
    type: Sequelize.STRING
  },
  createTime: {
    type: Sequelize.STRING
  }
});

module.exports = Course;
