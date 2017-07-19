//CMD的壳子
define(function (require) {
    //使用app模块
    var app = require('./app');
    //定义路由
    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
       
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: './index/index.html',
                controllerUrl : './index/IndexCtrl',
                controller : 'IndexCtrl as indexctrl',
                dependencies: ['services/formService']
            })
            .state('index.home', {
                url: 'home',    
                templateUrl: './home/home.html',
                controllerUrl : './home/HomeCtrl',
                controller : 'HomeCtrl as homectrl',
                dependencies: ['services/formService']
            })
            .state('index.produce', {
                url: 'produce',   
                templateUrl: './produce/produce.html',
                controllerUrl : './produce/ProduceCtrl',
                controller : 'ProduceCtrl as producectrl',
                dependencies: ['services/formService']
            })
            .state('index.baobiao', {
                url: 'baobiao',
                templateUrl: './baobiao/baobiao.html',
                controllerUrl : './baobiao/BaobiaoCtrl',
                controller : 'BaobiaoCtrl as baobiaoctrl' 
            })
             .state('index.baobiao.tuxinghua', {
                url: '/:id',
                templateUrl: './baobiao/tuxinghua.html',
                controllerUrl : './baobiao/TuxinghuaCtrl',
                controller : 'TuxinghuaCtrl as tuxinghuactrl' 
            })
    }]);
});