define(function(require){
	var app = require("../app");

	app.factory("mathService",[function(){
		var a = 66666666666;
		return {
			getA : function(){
				return a;
			}
		}
	}]);
});