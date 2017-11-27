var qs = require('querystring');
var express = require("express");
var app = express();
var bodyParser = require( 'body-parser' );
var config=require('./CommonModules/Config.js');
var orttroute=require('./Routes/ORTTRoute');
const log4js = require('./CommonModules/Log.js');
const logger = log4js.logger('WebServer');

//set view engine
app.set("view engine","jade")
//set view directory
app.set("views",__dirname+"/Views")
log4js.use(app);
// configure app to use bodyParser()
// this will let us get the data from Request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/BankORTT', orttroute);
app.use('/Public',express.static(__dirname+'/Public'));

app.listen(config.WebSet.Port || "80", config.WebSet.Host);
logger.info('Start WebServer');