var formidable = require("formidable");
var Form = require("../models/Form.js");
var querystring = require("querystring");
var url = require("url");

exports.showindex = function(req,res,next){
	if(req.session.login){
		next();
	}else{
		res.redirect("/login");
	}
}

exports.showlogin = function(req,res){
	res.render("login");
}

exports.showregist = function(req,res){
	res.render("regist");
}


//创建表单
exports.docreate = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var f = new Form({
			formdata : fields.formdata , 
			owner : req.session.email
		});

		f.save(function(err){
			if(err){
				res.json({"result" : -1});
			}else{
				res.json({"result" : 1});
			}
		});
	});
}

//拉取所有表单
exports.getall = function(req,res){
	Form.find({"owner" : req.session.email},function(err,docs){
		res.json({"results" : docs});
	});
}

//修改表单
exports.update = function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var _id = fields._id;
		var formdata = fields.formdata;

		console.log(formdata);

		Form.find({"_id" : _id} , function(err,docs){
			docs[0].formdata = formdata;
			docs[0].save(function(){
				res.json({"result" : 1});
			});
		})
	});
}


//显示表单
exports.showform = function(req,res){
	var id = req.params.id;
	Form.find({"_id" : id} , function(err,docs){
		 if(err || docs.length == 0){
		 	res.send("没有这个表单！");
		 	return;

		 }
		res.render("form",{
			id : id , 
			formdata : docs[0].formdata
		});
		 
	});

}


//提交表单
exports.tijiao = function(req,res){
	var id = url.parse(req.url , true).query.id;
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var daan = querystring.parse(fields.daan);
	
		Form.find({"_id" : id} , function(err,docs){
			docs[0].answers.push(daan);
			docs[0].save();
			res.send("");
		});
	});
}


exports.showdaan = function(req,res){
	var id = req.params.id;
	Form.find({"_id" : id} , function(err,docs){
		if(err || docs.length == 0){
			res.send("没有这个表单！");
			return;

		}
		res.json({"result" : docs[0]})
		 
	});
}