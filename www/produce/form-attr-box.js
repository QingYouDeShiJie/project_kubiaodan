define(function(require){
	var app = require("../app");

	app.directive("formAttrBox",["formService",function(formService){
		return {
			templateUrl : "./produce/form-attr-box.html",
			link : function(scope,ele){
				//拿到本题的数据
				scope.theq = function(){
					
					return formService.getFormdata().questions[formService.getOnEdit()]
				}

				//拿到正在编辑的题号
				scope.getOnEdit = function(){
					return formService.getOnEdit();
				}

				//增加选项
				scope.addOption = function(event){
					
					var content = event.target.value;
					if(!trim(content)) return;
					//操作数据
					formService.addo(content);
					//控制DOM清空
					event.target.value = "";
				}

				//检查是否是空，如果是空，删除这项
				scope.checkOption = function(event,index){
					var content = event.target.value;

					if(!trim(content)){
						formService.removeo(index);
					}
				}

				//删除选项
				scope.removeo = function(index){
					formService.removeo(index);
				}

				function trim(x) {
   					 return x.replace(/^\s+|\s+$/gm,'');
				}

				//写DOM，拖拽的实现
				var startnumber;
				$(ele[0]).find(".optionsbox").sortable({
					handle: ".handle",
					start : function(event, ui){
						startnumber = $(ui.item).index();
					},
					stop : function(event, ui){
						endnumber = $(ui.item).index();
						
						formService.moveoption(startnumber,endnumber);

						scope.$apply();
					}
				});


				//结束编辑
				scope.finish = function(){
					formService.edit(-1);
				}
			}
		}
	}]);
});