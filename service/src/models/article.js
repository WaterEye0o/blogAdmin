const Sequelize = require('sequelize');
const db = require('../config/db.js');

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
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
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
  },
  tagId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

module.exports = Article;