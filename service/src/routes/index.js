const Upload = require('../controller/upload');
const version = require('../config').version;

const routes = require(`./v${Number.parseInt(version)}`)

// console.log(routes)

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
  });
  // 上传文件
  app.post('/api/upload', Upload);
  // 用户信息
  app.get('/api/currentUser', (req, res) => {
    res.json({
      code: 1,
      data: {
        currentUser: 'admin',
        name: '奥利给',
      }
    })
  })
  // 通知信息
  app.get('/api/notices', (req, res) => {
    res.json({
      code: 1,
      data: []
    })
  })

  routes.forEach(item => app[item.method](`/api/v${Number.parseInt(version)}/${item.url.slice(1)}`, item.handler))
};
