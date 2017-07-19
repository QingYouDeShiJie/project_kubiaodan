define(function(require){
	var app = require("../app");

	require("./form-component.js");
	
	app.directive("formShower",["formService","$compile",function(formService,$compile){
		return {
			templateUrl : "./produce/form-shower.html",
			scope : {

			},
			link : function(scope,elements){
				//得到服务数据
				scope.getFormdata = function(){
					return formService.getFormdata();
				}

				//编辑按钮（铅笔按钮被按下）
				scope.edit = function(number){
					//命令服务做edit事件
					formService.edit(number);
				}

				//得到正在编辑的人的序号
				scope.onEdit = function(){
					return formService.getOnEdit();
				}

				//删除题目
				scope.removeq = function(index){
					formService.removeq(index);
				}

				var startnumber , endnumber;
				//可以拖拽
				$(elements[0]).find(".questions_big_box").sortable({
					handle: ".justifybtn",
					connectWith: ".sortablebox",
					"start" : function(event,ui){
						startnumber = $(ui.item).index();
					},
					"stop" : function(event,ui){
						endnumber = $(ui.item).index();
						//命令服务做排序
						formService.movequestion(startnumber , endnumber);
 						
 						scope.$apply();
					}
				});


				scope.jieshubianji = function(){
					alert(123)
				}
			}
		}
	}]);
});