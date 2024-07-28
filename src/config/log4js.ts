
import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../logs');//日志要写入哪个目录

const log4jsConfig1 = {
  appenders: {
    console: {
      type: 'console',//打印到控制台
    },
    access: {
      type: 'dataFile',//会写入文件，并且按照日期分类
      filename: `${baseLogPath}/access/access.log`,//日志文件名，会命名为：access.当前时间.log
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd',//时间格式
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExt: true,//是否保留文件后缀
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',

      },
      //日志文件按日期切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',
      },
      //日志文件按日期切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'DEBUG',
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' },
  },
  pm2: true,//使用pm2来管理项目时打开
  pm2InstanceVar: 'INSTANCE_ID',// 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
}

const log4jsConfig = {
  appenders: {
    // file: {
    //   type: 'file',
    //   filename: path.join(baseLogPath, 'app.log'), // 指定日志文件
    //   maxLogSize: 10 * 1024 * 1024, // 最大日志文件大小 (10 MB)
    //   backups: 5,  // 仅保留最新的五个日志文件
    //   // pattern: ".yyyy-MM-dd", // 用于确定何时滚动日志的模式
    //   compress: true    //  超过maxLogSize,压缩代码
    // },
    console: {
      type: 'console',
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}',

      },
      //日志文件按日期切割
      pattern: 'yyyyMMdd',
      daysToKeep: 60,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
    // just-errors: {
    //   type: 'logLevelFilter',
    //   appender: 'emergencies',
    //   level: 'error'
    // },
  },
  // categories定义了日志输出类别，在何种类别下使用哪些appender，它拥有两个属性，appenders和level。appenders支持传入一个或多个appender，level决定过滤的允许输出的日志级别
  // log4js默认的日志级别：ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
  // 当指定level为INFO时，只允许输出INFO级别以上的日志，WARN、ERROR都会被记录，但是TRACE和DEBUG不会。这也就是为什么，手动输出的三条日志，只打印两条的原因
  // log4js.getLogger([category]) 允许接收一个字符串，表示使用category类型，如果不传参，或者找不到对应的category，将会使用默认配置即defaul
  categories: {
    default: {
      // Appenders
      // log4js支持多种输出形式，打印到控制台、输出到文件，传输到服务器，也可以以邮件形式发送日志。
      // 直接支持的形式：categoryFilter、console、dateFile、file、fileSync、logLevelFilter、multiFile、multiprocess、recording、stderr、stdout、tcp、tcp-server
      // 支持但需要额外插件的形式：gelf、hipchat、logFaces-HTTP、logFaces-UDP、loggly、logstashHTTP、logstashUDP、mailgun、rabbitmq、redis、slack、smtp
      appenders: ['app', 'errors'],
      level: 'debug', // 指定日志级别
      info: { appenders: ['app', 'errors'], level: 'info' },
      access: { appenders: ['app', 'errors'], level: 'info' },
      http: { appenders: ['access'], level: 'DEBUG' },
    },
  },
  pm2: true,//使用pm2来管理项目时打开
  pm2InstanceVar: 'INSTANCE_ID',// 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
}

export default log4jsConfig;

