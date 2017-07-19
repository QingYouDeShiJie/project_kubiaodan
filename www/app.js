
define(function (require, exports, module) {

    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');
    require('kaola_canlendar');

    var app = angular.module('app', ['ui.router' , 'kaola_canlendar']);

    asyncLoader.configure(app);
    
    module.exports = app;
});