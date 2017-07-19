define(function(require){
	var app = require("../app");
	//子组件的注册

	app.directive("bingtu",[function(){
		return {
			restrict : "E" , 
			templateUrl : "./baobiao/bingtu.html",
			scope : {
				data : "@data",
				timu : "@timu",
				tihao : "@tihao"
			},
			link : function(scope){
				var dataobj = JSON.parse(scope.data);
				scope.id = parseInt(Math.random() * 888889999 );

				$(document).ready(function(){
					var chart = new iChart.Pie3D({
						render : 'canvas' + scope.tihao,//渲染的Dom目标,canvasDiv为Dom的ID
						data: dataobj ,
						title : scope.timu,//设置标题
						width : 800,//设置宽度，默认单位为px
						height : 400,//设置高度，默认单位为px
						shadow:true,//激活阴影
						shadow_color:'#c7c7c7',//设置阴影颜色
						coordinate:{//配置自定义坐标轴
							scale:[{//配置自定义值轴
								 position:'left',//配置左值轴	
								 start_scale: 0,//设置开始刻度为0
								 end_scale: 26,//设置结束刻度为26
								 scale_space:10,//设置刻度间距
								 listeners:{//配置事件
									parseText:function(t,x,y){//设置解析值轴文本
										return {text:t+" 人"}
									}
								}
							}]
						}
					});
					//调用绘图方法开始绘图
					chart.draw();
				});
			}
		}
	}]);
});