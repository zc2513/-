(function(angular){
	var app=angular.module("auto-active",[]);
	app.directive("autoActive",["$location",function($location){
		return {
			link:function(scope,element,attribute){
				element.on("click",function(){
					element.parent().children().removeClass("active");
					element.addClass("active");
				})
				//获取锚点值：
				scope.loc=$location
				scope.$watch("loc.url()",function(now,old){
					console.log(now);
					var has=element.find("a").attr("href").substr(1);
					if(now.startsWith(has)){
						element.parent().children().removeClass("active");
						element.addClass("active");
					}
				})
			}
		}
	}])
})(angular)