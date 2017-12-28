var express = require('express');
var template = require('art-template');
var sql = require('./db');

module.exports = function(app){
	var viewPath = app.get('views');

	app.get('',function(req,res){
		res.type('text/plain');
		res.send('Meadowlark Travel');
	});

	app.get('/about',function(req,res,next){
		var html = template(viewPath + '/about.html',{});
		res.send(html);
	});

	app.get('/data',(req,res,next) =>{
		var sqltext = 'Insert into ErrorLog(OperatorID,[_Date],[Event]) values(@OperatorID,@Date,@Event)';
		var params = {
			OperatorID:{
				sqlType:sql.sqlserver.Int,
				inputValue:1
			},
			Date:{
				sqlType:sql.sqlserver.DateTime,
				inputValue:new Date()
			},
			Event:{
				sqlType:sql.sqlserver.NVarChar,
				inputValue:'嘻嘻哈哈'
			}
		}
		sql.execTransaction(sqltext,params,function(err){
			if(err){
				console.log(err);
				res.send('error');
			}else{
				res.send('hello world');
			}
		})
	});
};