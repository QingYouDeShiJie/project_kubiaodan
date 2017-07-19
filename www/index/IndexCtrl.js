define(function(require){
	var app = require("../app");

	app.controller("IndexCtrl",["formService" , "$state" , function(formService , $state){
		this.getUrl = function(){
			//当前路径
			return $state.current.url;
		}

		//点击"结束编辑，保存退出"绿色按钮
		this.submitform = function(){
			//命令服务告知服务器，表单已经更新
			formService.submitform(function(data){
				if(data.data.result == 1){
					alert("表单创建/修改成功！");
				}else{
					alert("失败！");
				}
			});
		}

		//前往表单制作页面
		this.goproduce = function(){
			formService.setformid(0);
			window.location = "#/produce";
		}

		this.gohome = function(){
			formService.setformid(0);
			window.location = "#/home";		
		}

		//决定菜单栏显示的是创建还是修改
		this.getword = function(){
			return formService.getformid() == 0 ? "创建新的表单" : "修改表单";
		}


	}]);
});