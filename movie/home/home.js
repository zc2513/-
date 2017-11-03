(function(angular){
	"use strict";
	//1.创建home模块的路由
	var app=angular.module("home",["ngRoute"]);
	//2.创建home的路由规则：
	app.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/home_page",{//内容会显示在ng-view的标签中
			templateUrl:"home/home.html"
		})
	}])


})(angular);