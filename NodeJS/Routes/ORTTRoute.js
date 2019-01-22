var express=require('express');
var router = express.Router();
var sql=require('mssql');
var config=require('../CommonModules/Config.js');
var logger = require('../CommonModules/Log.js').logger('ORTTRoute');
 
 // middleware that is specific to this router
router.use(function(req, res, next) {
	logger.info('Run ORTTRoute');
    next(); // make sure we go to the next routes and don't stop here
});

 router.get('/', function (req, res, next) {
	 res.render('index');
 });
 
 router.get('/Query', function (req, res, next) {
	if(req.query.BaseDate){  
		sql.connect(config.DBCon, function (err) {
			if (err){
			   sql.close();
			   logger.error(err);
			   res.send({success:false, message:"系統發生錯誤，請連絡網站管理人員"});
			}else{
				var request = new sql.Request();
				request.input('BaseDate', sql.Date, req.query.BaseDate)
				request.query("SELECT * FROM [@DL_ORTT] T0 WHERE T0.U_RateDate >= DATEADD(Day,-30, @BaseDate) AND T0.U_RateDate <= DATEADD(Day, 30, @BaseDate)", function (err, result) {
					sql.close();
					if (err) {
						logger.error(err);
						res.send({success:false, message:"系統發生錯誤，請連絡網站管理人員"});
					}else{
						// var rowsCount = result.rowsAffected;
						if(result.rowsAffected > 0 ){
							res.send({success:true, data: result.recordset});  
						}else{
							res.send({success:false, message:"查詢無資料"}); 
						}
					}
				}); // request.query
			}
		}); // sql.conn
	}
    else{
	   logger.info("請輸入日期")
	   res.send({success:false, message:"請輸入日期"});
    }
}); // get /

module.exports=router;