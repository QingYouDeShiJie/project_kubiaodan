define(function(require){
	var app = require("../app");

	app.factory("formService",["$http" , function($http){
		//正在编辑的表单的id
		var formid = 0;

		var initq = {
			"title" : "这是一个新题目，请点击小铅笔按钮编辑题目",
			"options" : [
				"选项1",
				"选项2",
				"选项3",
				"选项4"
			],
			"type" : "single-option",
			"required" : true,
			"min" : 0,
			"max" : 100,
			"mindate" : "1994-5-4",
			"maxdate" : "2999-1-1",
 			"step" : 1,
			"regexp" : "",
			"ctip" : "我是用户输入正确提示的文字",
			"wtip" : "我是用户输入错误提示的文字"
		};

		//当前表格数据
		var formdata = {
			"title" : "这是一个新表单",
			"questions" : [initq]
		}

		//全部表格数据
		var allformdata = [];

		//正在编辑的题号
		var onEdit = -1;

		return {
			//拉取所有题目数据
			fetchAllFormData : function(){
				$http.get("/all").then(function(data){
					allformdata = data.data.results;
				});
			},
			//暴露全部表格数据
			getAllFormData : function(){
				return allformdata;
			},
			//得到当前所有题目
			getFormdata : function(){
				if(formid == 0){
					//新建表单
					return formdata;
				}else{
					//寻找id
					for(var i = 0 ; i < allformdata.length ; i++){
						if(allformdata[i]._id == formid){
							formdata = allformdata[i].formdata
							return formdata;
						}
					}
				}	 
			},
			//编辑 SETTER
			edit : function(number){
				onEdit = number;
			},
			//得到编辑的那个人
			getOnEdit : function(){
				return onEdit;
			},
			//移动选项
			moveoption : function(s,e){
				formdata.questions[onEdit].options.splice(e,0,formdata.questions[onEdit].options.splice(s,1)[0]);
			},
			//删除选项
			removeo : function(index){
				formdata.questions[onEdit].options.splice(index, 1);
			},
			//增加选项
			addo : function(content){
				formdata.questions[onEdit].options.push(content);
			},
			//移动问题
			movequestion : function(s,e){
				formdata.questions.splice(e,0,formdata.questions.splice(s,1)[0]);
			 	onEdit = -1;
			},
			//增加问题
			add : function(type , index){
				var o = deepclone(initq);
				o.type = type;
				formdata.questions.splice(index, 0 , o);
				onEdit = index;
			},
			//删除问题
			removeq : function(index){
				formdata.questions.splice(index,1);
				onEdit = -1;
			},
			//告知服务器表单已经更新
			submitform : function(callback){
				//此时有两个情况，是更新还是创建？此时可以用闭包中的formid来判断。如果是0表示创建，如果是16位id此时修改。
				if(formid == 0){
					$http.post("/create" , {formdata : formdata}).then(function(data){
						console.log(data);
						callback(data);
					});
				}else{
					$http.post("/update" , {formdata : formdata , _id : formid}).then(function(data){
						callback(data);
					});
				}
					
			},
			//得到表单id
			getformid : function(){
				return formid;
			},
			//设置表单id
			setformid : function(id){
				formid = id;
			}
		}
	}]);




	function deepclone(o){
		if(typeof o == "number" || typeof o == "string"  || typeof o == "boolean"  ||  typeof o == "undefined" || o == null){
			//基本类型值
			return o;
		}else if(typeof o == "function"){
			//函数的克隆
			return eval("(" + o + ")");
		}else if(o instanceof RegExp){
			//正则表达式的克隆
			return new RegExp(o);
		}else if(Object.prototype.toString.call(o) == "[object Array]"){
			//数组的克隆
			var _o = [];
			for(var i = 0 ; i < o.length ; i++){
				_o[i] = deepclone(o[i]);
			}
			return _o;
		}else if(typeof o == "object"){
			//创建一个_o，让_o和o有相同的__proto__
			//这里要借助一个F过渡一下：
			//在ES6中，下面4条语句可以简写为Object.create(o.__proto__)
			var F = function(){};
			F.prototype = o.__proto__;
			var _o = new F();
			F = null;

			for(var k in o){
				if(o.hasOwnProperty(k)){
					_o[k] = deepclone(o[k]);
				}
			}
			return _o;
		}
	}
});