const log4js = require('log4js');
log4js.configure({
  appenders: {
    ruleConsole: {type: 'console'},
	ruleFile:{
		type: 'dateFile',
		filename: 'logs/', 
		pattern: 'yyyyMMdd.log',
		alwaysIncludePattern: true
    },
	filterWARN: { type: 'logLevelFilter', appender: 'ruleFile', level: 'WARN' }
  },
  categories: {
        default: {appenders: ['ruleConsole','filterWARN'], level: 'INFO'}
    }
});

const logger = log4js.getLogger('console'); // any category will work
logger.level ='ALL';
console.log = logger.info.bind(logger);
console.debug = logger.debug.bind(logger);

module.exports = {
	logger:function(pName){
	  var logger = log4js.getLogger(pName);
	  return logger;
	},
    use:function (pApp) {
		pApp.use(log4js.connectLogger(log4js.getLogger('AutoLog'), {
			format: ':method :url :status'
		}));
	}
}

