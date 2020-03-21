const express = require('express');
const router = express.Router();

const user = require('./users');


module.exports = app => {
  app.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
  });
  app.get('/user', user.userGet)
};
