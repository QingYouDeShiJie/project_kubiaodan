define(function(require){
	var app = require("../app");

	require("../components/canlendar/canlendar.js");	

	app.controller("HomeCtrl",["formService" ,"$state" , function(formService , $state){
		// console.log("我是home控制器，我实例化了");
		//命令服务找服务器拉取数据
		var self = this;
		formService.fetchAllFormData();

		//得到表单数据
		this.getAllFormData = function(){
			return formService.getAllFormData();
		}

		//跳转到编辑页面
		this.goproduce = function(id){
			//设置当前编辑的表单id，为此ID
			formService.setformid(id);
			window.location = ("#/produce");
		}

		this.gobaobiao = function(id){
			//设置当前编辑的表单id，为此ID
			window.location = ("#/baobiao/" + id);
		}
 
	}]);
});