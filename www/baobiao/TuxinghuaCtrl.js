define(function(require){
	var app = require("../app");
	//子组件的注册

	require("./bingtu.js");

	app.controller("TuxinghuaCtrl",["$state" , "$http" , "$compile" , "$scope" , function($state , $http , $compile , $scope){
		var id = $state.params.id;

		$http.get("/daan/" + id).then(function(data){
			
			var gongjiti = Object.keys(data.data.result.answers[0]).length;


			for(var tihao = 1 ; tihao <= gongjiti ; tihao++){
				var timu = data.data.result.formdata.questions[tihao - 1].title;
				//统计每个题目中出现了几个：
				var benti = {};
				for(var i = 0 ; i < data.data.result.answers.length ; i++){
	 				if(!benti.hasOwnProperty(data.data.result.answers[i]["no" + tihao])){
						benti[data.data.result.answers[i]["no" + tihao]] = 1;
					}else{
						benti[data.data.result.answers[i]["no" + tihao]] ++ ;
					}
				}
		 	
				var color = ["#f23" , "#de1" , "#666" , "#f45" , "#456"]
				var _data = (function(){
					var arr = [];
					var count = 0;
					for(var k in benti){
						arr.push({name : k , value : benti[k] , color : color[count++]});
					}
					return JSON.stringify(arr);
				})();



	 			$("#tuxinghuabox").append($($compile('<bingtu timu="' + timu + '" tihao="' + tihao +'" data=' + _data + '></bingtu>')($scope)));
			}
		});
	}]);
});