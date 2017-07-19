require.config({
    //设置依赖根。./表示当前目录，/表示域名根目录。为了防止项目在文件夹中跑，此时用相对路径合理。
    baseUrl: './',
    //设置别名
    paths: {
        'angular' : 'assets/js/angular.min',
        'angular-ui-router': 'assets/js/angular-ui-router.min',
        'angular-async-loader': 'assets/js/angular-async-loader.min',
        'app-routes' : "./app-routes",
        "kaola_canlendar" : "components/canlendar/canlendar"
    },
    //设置垫片
    shim: {
        'angular' : {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']}
    }
});

require(['app-routes' , 'kaola_canlendar'], function () {
    //angualr.element()有轻微的类似jQuery的$()的功能，可以选择DOM
    angular.element(document).ready(function () {
        //下面的bootstrap函数表示命令angular启动，并且以html为根，app名字叫做app。即等价于<html ng-app="app"></html>
        angular.bootstrap(document, ['app']);
        //在html上添加ng-app指令
        angular.element(document).find('html').addClass('ng-app');
    });
});