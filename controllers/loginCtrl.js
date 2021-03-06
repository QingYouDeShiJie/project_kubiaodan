var formidable = require("formidable");
var User = require("../models/User.js");
var crypto = require("crypto");

exports.doLogin = (req,res) =>{
    //拿到email和pwd

	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var email = fields.email;
		var pwd = fields.pwd;

		User.find({"email":email},(err,docs)=>{
			if(docs.length == 0){
				res.send({"result" : -1});
				return;
			}
			//加密密码
			pwd = crypto.createHash('sha256').update("我爱" + pwd + "考拉").digest("hex");
 
			if(docs[0].pwd == pwd){
				//下发session
				req.session.login = true;
				req.session.email = email;
				res.send({"result" : 1});
			}else{
				res.send({"result" : -2});
			}
		});
	});
}