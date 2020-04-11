const Upload = require('../controller/upload');
const User = require('../controller/user');
const Article = require('../controller/article');
const Tags = require('../controller/tags');
const Course = require('../controller/course');
const Message = require('../controller/message');
const Share = require('../controller/share');

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });
  app.get('/api/currentUser', (req, res) => {
    res.json({
      code: 1,
      data: {
        currentUser: 'admin',
        name: '奥利给',
      }
    })
  })
  app.get('/api/notices', (req, res) => {
    res.json({
      code: 1,
      data: []
    })
  })
  // 上传文件
  app.post('/api/upload', Upload);

  // 用户管理
  app.get('/api/user', User.gets);
  app.post('/api/user/login', User.login);
  app.post('/api/user/register', User.register);
  app.post('/api/user/update', User.update);

  // 文章管理
  app.get('/api/article', Article.gets);
  app.get('/api/article/detail', Article.get);
  app.post('/api/article/add', Article.add);
  app.post('/api/article/del', Article.del);
  app.post('/api/article/update', Article.update);
  app.post('/api/article/likes', Article.likes);

  // 标签管理
  app.get('/api/tags', Tags.gets);
  app.post('/api/tags/add', Tags.add);
  app.post('/api/tags/del', Tags.del);
  app.post('/api/tags/update', Tags.update);
  
  // 成长历程
  app.get('/api/course', Course.gets);
  app.post('/api/course/add', Course.add);
  app.post('/api/course/del', Course.del);
  app.post('/api/course/update', Course.update);

  // 留言管理
  app.get('/api/message', Message.gets);
  app.post('/api/message/add', Message.add);
  app.post('/api/message/del', Message.del);

  // 生活分享
  app.get('/api/share', Share.get);
  app.post('/api/share/addOrUpdate', Share.addOrUpdate);

};
