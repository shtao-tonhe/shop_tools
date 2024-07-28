
// 数据库配置
// const productConfig={
//   type: 'mysql',
//   host: process.env.DATABASE_HOST || 'localhost',
//   port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
//   username: process.env.DATABASE_USER || 'root',//用户名
//   password: process.env.DATABASE_PASSWORD || 'root',//数据库密码
//   database: process.env.DATABASE_DBNAME || 'village_website',//数据库名
//   connectionLimit: process.env.DATABASE_LIMIT || 10, //链接限制
//   synchronize: true,
// }

// const localConfig={
//   mysql:{
//       port:'3306',//数据库端口
//       host:'localhost',//数据库地址
//       user:'root',//用户名
//       password:'lh1314520',//数据库密码
//       database:'demo',//数据库名
//       connectionLimit:10//链接限制
//   }
// }

// const config = process.env.NODE_ENV?productConfig:localConfig;
// export default config;

export default {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  username: process.env.DATABASE_USER || 'root',//用户名
  password: process.env.DATABASE_PASSWORD || 'root',//数据库密码
  database: process.env.DATABASE_DBNAME || 'village_website',//数据库名
  connectionLimit: process.env.DATABASE_LIMIT || 10, //链接限制
  synchronize: true,
};

