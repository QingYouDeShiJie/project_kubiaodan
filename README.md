# project_kubiaodan
# 基于Angular的表单系统
# 微博项目 —— 一个基于Angular框架实现前端MVC的单页面应用
# 技术栈
①借助BootStrap可以轻松实现页面的快速搭建及响应式，本项目采用bootstrap搭建页面
②前端MVC借助Angular + Require.js + AngularUIRouter实现，后端MVC借助Node.js + ExpressJS实现。数据库采用MongoDB + Mongoose的配合实现数据库的增删改查工作；
# 项目文件夹：
该项目的文件夹结构如下所示：
		┠ controllers   控制器
		┠ models      nodejs模型，里面放Mongoose数据库模型
		┠ controllers    控制器
		┠ node_modules 依赖
		┠ views        ejs模板
		┠ www	       静态资源
		┠ app.js	 nodejs的运行文件
# 项目特点
    功能
    注册会员
    验证登录
    创建表单
    表单清单查询
    删除表单
    修改表单
    让他人参与做题调查
    此项目使用的是SPA;
# 路由是RESTful风格。
    所谓的RESTful路由风格,简单老说就是利用HTTP的四种请求：GET（获取资源）、POST（新建资源，也可以用于更新资源）、PUT（更新资源）、
DELETE（删除资源），来实现资源表现层的状态转换（Representational State Transfer） 。
以下是改项目的路由：
app.get("/"							, mainctrl.showindex);
app.get("/login" 					, mainctrl.showlogin);
app.get("/regist"     		, mainctrl.showregist);
app.checkout("/regist"              ,  registCtrl.check);
app.post("/regist"              	,  registCtrl.doRegist);
app.post("/login"               	,  loginCtrl.doLogin);
app.post("/create"              	,  mainctrl.docreate);
app.get("/all"               	,  mainctrl.getall);
app.post("/update"             	,  mainctrl.update);
app.get("/form/:id" 		,  mainctrl.showform);
app.get("/daan/:id" 		,  mainctrl.showdaan);
app.post("/tijiao" 			,  mainctrl.tijiao);
# 项目起步
  安装依赖
  npm install
  开数据库
  mongod --dbpath c:\shujuku
  运行
  node app.js	
# 欢迎关注
