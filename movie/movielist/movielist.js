(function(angular){
	//1.创建模块：
	var app=angular.module("movielist",["ngRoute","serviceJSP"]);
	//2.创建路由：
	app.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/:movieType/:page?",{
			templateUrl:"movielist/movielist.html",
			controller:"movielistController"
		})
	}])
	//创建控制器：
	app.controller("movielistController",["$scope",
		"$http",
		"myservice",
		"$routeParams",
		"$route",
		function($scope,$http,myservice,$routeParams,$route){
		// console.log($routeParams);//关联page页面的页数
		//设置页数显示
		$scope.pageCount=5;
		$scope.page=($routeParams.page||"1")-0;
		//添加loding动画
		$scope.loding=true;

		//每一页加载数据的开始位置为：

		var start=($scope.page-1)*$scope.pageCount;
		myservice.jsonp("http://api.douban.com/v2/movie/"+$routeParams.movieType,
		{start:start,count:$scope.pageCount,q:$routeParams.q},
		function(result){
			$scope.data=result;
			//根据总条数得到总页数：--小数部分向上取整
			$scope.totalPage=Math.ceil($scope.data.total/$scope.pageCount)
			$scope.loding=false;
			console.log(result);
			$scope.$apply();//记得通知angular数据改变呢
		})
		//上下翻页功能：
		$scope.getPage=function(now){
			if(now<=0||now>$scope.totalPage){
				return;
			}
			$route.updateParams({page:now});
		}
	}])
})(angular)