const Upload = require('../controller/upload');
const User = require('../controller/users');
const Article = require('../controller/article');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });

  app.post('/upload', Upload);
  
  app.get('/user', User.gets);
  app.post('/user/login', User.login);
  app.post('/user/register', User.register);
  app.post('/user/update', User.update);
  
  app.get('/article', Article.gets);
  app.get('/article/detail', Article.get);
  app.post('/article/add', Article.add);
  app.post('/article/del', Article.del);
  app.post('/article/update', Article.update);

};
