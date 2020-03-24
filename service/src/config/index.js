const environment = process.env.NODE_ENV;
const isDevMode = Object.is(environment, 'development');
const isProdMode = Object.is(environment, 'production');

module.exports = {
  port: isDevMode ? 3000 : 3030,

  db: {
    // 主机名称，一般是本机
    host: 'localhost',
    // 数据库的端口号，如果不设置，默认是3306
    port: '3306',
    // 创建数据库时设置用户名
    user: 'root',
    // 创建数据库时设置的密码
    password: '123456',
    // 创建的数据库
    database: 'myblog',
  },
};
