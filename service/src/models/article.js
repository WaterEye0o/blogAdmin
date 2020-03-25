const Sequelize = require('sequelize');
const db = require('../db/index.js');

const Article = db.defineModel('Article', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING
  },
  brief: {
    type: Sequelize.Text
  },
  content: {
    type: Sequelize.Text
  },
  createTime: {
    type: Sequelize.STRING
  },
  visits: {
    type: Sequelize.INTEGER
  },
  comments: {
    type: Sequelize.INTEGER
  },
  likes: {
    type: Sequelize.INTEGER
  },
  source: {
    type: Sequelize.STRING
  },
  pic: {
    type: Sequelize.STRING
  }
});

module.exports = Article;