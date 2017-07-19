define(function(require){
	var app = require("../app");

	app.directive("formToolBox",["formService", function(formService){
		return {
			templateUrl : "./produce/form-tool-box.html",
			scope : {
				"refresh" : "&refresh"
			},
			link : function(scope,ele){
				var backup;

				//可以拖拽
				$(ele[0]).find(".toolbox ul").sortable({
					//与右侧盒子链接
			      	connectWith: ".sortablebox",
			      	forcePlaceholderSize: true,
			      	"start" : function(event,ui){
			      		backup = $(this).html();

			      	 
			      	},
			      	"stop" : function(event,ui){
			      		var type = $(ui.item).attr("data-v");
			      		var index = $(ui.item).index();
 
			      		formService.add(type , index);
			      		scope.refresh();

			      		//恢复左侧
			      		$(this).empty().append($(backup)).find("li").css({
			      			"position" : "static" , 
			      			"width" : "50%"
			      		});
			      		$(this).find(".ui-sortable-placeholder").remove();
			      	}
			    });
			}
		}
	}]);
});