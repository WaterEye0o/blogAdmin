const user = require('./users');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });
  app.get('/user', user.userGet)
};
