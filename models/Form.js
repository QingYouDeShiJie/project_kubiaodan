//引包
var mongoose = require('mongoose');
//创建一个schema
var formSchema = new mongoose.Schema({
	"owner" 	: String,
	"formdata" 	: JSON , 
	"answers"   : [JSON]
});

//创建一个模型
var Form = mongoose.model("form" , formSchema);

//暴露
module.exports = Form;