define(function(require){
	var app = require("../app");
	//子组件的注册
	require("./form-shower.js");
	require("./form-attr-box.js");
	require("./form-tool-box.js");
	
	app.controller("ProduceCtrl",["$compile" , "$scope" , function($compile , $scope){
		this.refresh = function(){
			$(".form-shower-box").empty();
			$($compile("<form-shower></form-shower>")($scope)).appendTo($(".form-shower-box"));
		}
	}]);
});