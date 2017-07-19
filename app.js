var express = require("express");
var mongoose = require('mongoose');
var session = require('express-session');
var app = express();
var mainctrl = require("./controllers/mainctrl.js");
var registCtrl = require("./controllers/registCtrl.js");
var loginCtrl = require("./controllers/loginCtrl.js");

//链接数据库
mongoose.connect('mongodb://localhost/kubiaodan',(err)=>{
	if(err) console.log("你没开数据库！请用mongod开机！");
});

//设置session
app.set('trust proxy', 1) 
app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true,
	resave : false,
	cookie: { maxAge: 7 * 1000 * 60 * 60 * 24 }
}));

//设置模板引擎
app.set("view engine" , "ejs");

//路由清单
app.get("/"							, mainctrl.showindex);
app.get("/login" 					, mainctrl.showlogin);
app.get("/regist"     				, mainctrl.showregist);
app.checkout("/regist"              ,  registCtrl.check);
app.post("/regist"              	,  registCtrl.doRegist);
app.post("/login"               	,  loginCtrl.doLogin);
app.post("/create"              	,  mainctrl.docreate);
app.get("/all"               		,  mainctrl.getall);
app.post("/update"             		,  mainctrl.update);
app.get("/form/:id" 				,  mainctrl.showform);
app.get("/daan/:id" 				,  mainctrl.showdaan);
app.post("/tijiao" 				 ,  mainctrl.tijiao);

//使用静态
app.use(express.static("www"));

app.listen(3000,function(){
	console.log("3000");
});