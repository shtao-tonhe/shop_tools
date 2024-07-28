export default () => ({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'root', //用户名
  password: process.env.DATABASE_PASSWORD || 'root', //数据库密码
  database: process.env.DATABASE_DBNAME || 'th_sass_sales_tool', //数据库名
  connectionLimit: process.env.DATABASE_LIMIT || 10, //链接限制
  synchronize: true,
});
