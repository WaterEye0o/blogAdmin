const { Article, Course, Message, Share, Tags, User, Collect, Comment } = require('../controller')

module.exports = [
  // 用户管理
  { method: 'get', url: '/user', handler: User.gets },
  { method: 'post', url: '/user/login', handler: User.login },
  { method: 'post', url: '/user/register', handler: User.register },
  { method: 'post', url: '/user/update', handler: User.update },
  // 文章管理
  { method: 'get', url: '/article', handler: Article.gets },
  { method: 'get', url: '/article/detail', handler: Article.get },
  { method: 'post', url: '/article/add', handler: Article.add },
  { method: 'post', url: '/article/del', handler: Article.del },
  { method: 'post', url: '/article/update', handler: Article.update },
  { method: 'post', url: '/article/likes', handler: Article.likes },
  // 标签管理
  { method: 'get', url: '/tags', handler: Tags.gets },
  { method: 'post', url: '/tags/add', handler: Tags.add },
  { method: 'post', url: '/tags/del', handler: Tags.del },
  { method: 'post', url: '/tags/update', handler: Tags.update },
  // 成长历程
  { method: 'get', url: '/course', handler: Course.gets },
  { method: 'post', url: '/course/add', handler: Course.add },
  { method: 'post', url: '/course/del', handler: Course.del },
  { method: 'post', url: '/course/update', handler: Course.update },
  // 留言管理
  { method: 'get', url: '/message', handler: Message.gets },
  { method: 'post', url: '/message/add', handler: Message.add },
  { method: 'post', url: '/message/del', handler: Message.del },
  // 生活分享
  { method: 'get', url: '/share', handler: Share.get },
  { method: 'post', url: '/share/addOrUpdate', handler: Share.addOrUpdate },
]
