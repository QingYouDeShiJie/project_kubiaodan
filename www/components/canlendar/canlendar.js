var kaola_canlendar = angular.module("kaola_canlendar", []);
kaola_canlendar.directive("canlendar", [function() {
	return {
		restrict: "E",
		templateUrl: "/components/canlendar/canlendar.html",
		scope: {
			"ngModel": "=ngModel",
			"min": "@min",
			"max": "@max"
		},
		link: function(scope, elements) {
			var jintian = new Date();
			if (!scope.ngModel) {
				scope.ngModel = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			var matcharr = scope.ngModel.match(/^(\d+)\-(\d+)\-(\d+)$/);
			if (scope.min == "today") {
				scope.min = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			if (scope.max == "today") {
				scope.max = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			scope.y = Number(matcharr[1]);
			scope.m = Number(matcharr[2]);
			scope.d = Number(matcharr[3]);
			scope.$watch("d", function() {
				scope.isShowbox = false;
				scope.ngModel = scope.y + "-" + scope.m + "-" + scope.d
			});
			scope.$watch("y", function() {
				scope.ngModel = scope.y + "-" + scope.m + "-" + scope.d
			});
			scope.$watch("m", function() {
				scope.ngModel = scope.y + "-" + scope.m + "-" + scope.d
			});
			scope.type = "m";
			scope.ystart = scope.y - scope.y % 10 - 10;
			scope.isShowbox = false;
			scope.changeshowbox = function() {
				scope.isShowbox = !scope.isShowbox
			}
		}
	}
}]);
kaola_canlendar.directive("canlendarBox", ["$compile", function($compile) {
	return {
		restrict: "E",
		templateUrl: "/components/canlendar/canlendar-box.html",
		scope: {
			"y": "=y",
			"m": "=m",
			"d": "=d",
			"ystart": "=ystart",
			"type": "=type",
			"min": "@min",
			"max": "@max"
		},
		link: function(scope, elements) {
			var $dom = $(elements[0]).find(".canlendar-box");
			var min = Date.parse(new Date(scope.min));
			var max = Date.parse(new Date(scope.max));
			scope.goNext = function() {
				if (scope.type == "m") {
					var A = Date.parse(new Date(scope.y, scope.m - 1 + 1, 1));
					var B = Date.parse(new Date(scope.y, scope.m - 1 + 2, 0));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.m++;
					if (scope.m > 12) {
						scope.m = 1;
						scope.y++
					}
				} else if (scope.type == "y") {
					var A = Date.parse(new Date(scope.y + 1, 0, 1));
					var B = Date.parse(new Date(scope.y + 1, 11, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.y++
				} else if (scope.type == "ys") {
					var A = Date.parse(new Date(scope.ystart + 30, 0, 1));
					var B = Date.parse(new Date(scope.ystart + 30 + 29, 12, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.ystart += 30
				}
			}
			scope.goPrev = function() {
				if (scope.type == "m") {
					var A = Date.parse(new Date(scope.y, scope.m - 1 - 1, 1));
					var B = Date.parse(new Date(scope.y, scope.m - 1, 0));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.m--;
					if (scope.m < 1) {
						scope.m = 12;
						scope.y--
					}
				} else if (scope.type == "y") {
					var A = Date.parse(new Date(scope.y - 1, 0, 1));
					var B = Date.parse(new Date(scope.y - 1, 11, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.y--
				} else if (scope.type == "ys") {
					var A = Date.parse(new Date(scope.ystart - 30, 0, 1));
					var B = Date.parse(new Date(scope.ystart - 30 + 29, 12, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.ystart -= 30
				}
			}
			$dom.bind("mousewheel", function(event, delta) {
				event.preventDefault();
				if (delta < 0) {
					scope.goNext()
				} else {
					scope.goPrev()
				}
				scope.$apply()
			})
		}
	}
}]);
kaola_canlendar.directive("canlendarNav", [function() {
	return {
		restrict: "E",
		templateUrl: "/components/canlendar/canlendar-nav.html",
		scope: {
			"y": "=y",
			"m": "=m",
			"type": "=type",
			"ystart": "=ystart",
			"yend": "=yend",
			"min": "@min",
			"max": "@max"
		},
		link: function(scope, elements) {
			var jintian = new Date();
			if (scope.min == "today") {
				scope.min = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			if (scope.max == "today") {
				scope.max = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			var min = Date.parse(new Date(scope.min));
			var max = Date.parse(new Date(scope.max));
			scope.changetype = function() {
				if (scope.type == "y") {
					scope.type = "ys"
				} else if (scope.type == "ys") {
					scope.type = "m"
				} else if (scope.type == "m") {
					scope.type = "y"
				}
			}
			scope.goNext = function() {
		 
				if (scope.type == "m") {
					var A = Date.parse(new Date(scope.y, scope.m - 1 + 1, 1));
					var B = Date.parse(new Date(scope.y, scope.m - 1 + 2, 0));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.m++;
					if (scope.m > 12) {
						scope.m = 1;
						scope.y++
					}
				} else if (scope.type == "y") {
					var A = Date.parse(new Date(scope.y + 1, 0, 1));
					var B = Date.parse(new Date(scope.y + 1, 11, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.y++
				} else if (scope.type == "ys") {
					var A = Date.parse(new Date(scope.ystart + 30, 0, 1));
					var B = Date.parse(new Date(scope.ystart + 30 + 29, 12, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.ystart += 30
				}
			}
			scope.goPrev = function() {
				if (scope.type == "m") {
					var A = Date.parse(new Date(scope.y, scope.m - 1 - 1, 1));
					var B = Date.parse(new Date(scope.y, scope.m - 1, 0));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.m--;
					if (scope.m < 1) {
						scope.m = 12;
						scope.y--
					}
				} else if (scope.type == "y") {
					var A = Date.parse(new Date(scope.y - 1, 0, 1));
					var B = Date.parse(new Date(scope.y - 1, 11, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.y--
				} else if (scope.type == "ys") {
					var A = Date.parse(new Date(scope.ystart - 30, 0, 1));
					var B = Date.parse(new Date(scope.ystart - 30 + 29, 12, 31));
					if (A < min && B < min || A > max && B > max) {
						return
					}
					scope.ystart -= 30
				}
			}
		}
	}
}]);
kaola_canlendar.directive("canlendarTableM", [function() {
	return {
		restrict: "E",
		templateUrl: "/components/canlendar/canlendar-table-m.html",
		scope: {
			y: "=y",
			m: "=m",
			d: "=d",
			changeshowbox: "&changeshowbox",
			"min": "@min",
			"max": "@max"
		},
		link: function(scope) {
			var jintian = new Date();
			if (scope.min == "today") {
				scope.min = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			if (scope.max == "today") {
				scope.max = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			var min = Date.parse(new Date(scope.min));
			var max = Date.parse(new Date(scope.max)) + 1000 * 60 * 60 * 24;
			scope.getClass = function(item) {
				return {
					'gray': item.prevMonth || item.nextMonth,
					'cur': item.thisMonth && item.date == d,
					"diabled": (item.timestamp <= min) || (item.timestamp > max)
				}
			}
			var y;
			var m;
			var d;
			var erweishuzu = [];
			scope.getArr = function(_y, _m, _d) {
				if (_y == y && _m == m && _d == d) {
					return erweishuzu
				}
				y = _y;
				m = _m;
				d = _d;
				datearr = [];
				erweishuzu = [];
				var thismonthfirstdateday = (new Date(y, m - 1, 1)).getDay();
				var prevmonthlastdatedate = (new Date(y, m - 1, 0)).getDate();
				var thismonthdateamount = (new Date(y, m - 1 + 1, 0)).getDate();
				while (thismonthfirstdateday--) {
					datearr.unshift({
						prevMonth: true,
						date: prevmonthlastdatedate--,
						timestamp: Date.parse(new Date(y, m - 2, prevmonthlastdatedate))
					})
				}
				var count = 1;
				while (thismonthdateamount--) {
					datearr.push({
						thisMonth: true,
						date: count++,
						timestamp: Date.parse(new Date(y, m - 1, count))
					})
				}
				var target = datearr.length <= 35 ? 35 : 42;
				var count = 1;
				while (datearr.length < target) {
					datearr.push({
						nextMonth: true,
						date: count++,
						timestamp: Date.parse(new Date(y, m - 1 + 1, count))
					})
				}
				while (datearr.length > 0) {
					erweishuzu.push(datearr.splice(0, 7))
				}
				return erweishuzu
			}
			scope.changed = function(item) {
				if (item.prevMonth) {
					scope.m--;
					if (scope.m < 1) {
						scope.m = 12;
						scope.y--
					}
				} else if (item.nextMonth) {
					scope.m++;
					if (scope.m > 12) {
						scope.m = 1;
						scope.y++
					}
				}
				scope.changeshowbox();
				scope.d = item.date
			}
		}
	}
}]);
kaola_canlendar.directive("canlendarTableY", [function() {
	return {
		restrict: "E",
		templateUrl: "/components/canlendar/canlendar-table-y.html",
		scope: {
			"m": "=m",
			"y": "@y",
			"min": "@min",
			"max": "@max",
			"type": "=type"
		},
		link: function(scope) {
			var jintian = new Date();
			if (scope.min == "today") {
				scope.min = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			if (scope.max == "today") {
				scope.max = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
			}
			var min = Date.parse(new Date(scope.min));
			var max = Date.parse(new Date(scope.max));
			scope.changem = function(month) {
				scope.m = month;
				scope.type = "m"
			}
			scope.getClass = function(month) {
				var A = Date.parse(new Date(scope.y, month - 1, 1));
				var B = Date.parse(new Date(scope.y, month - 1 + 1, 0));
				return {
					"disabled": (A < min && B < min) || (A > max && B > max)
				}
			}
		}
	}
}]);
kaola_canlendar.directive("canlendarTableYs", [function() {
	return {
		restrict: "E",
		templateUrl: "/components/canlendar/canlendar-table-ys.html",
		scope: {
			"ystart": "=ystart",
			"y": "=y",
			"type": "=type",
			"min": "@min",
			"max": "@max"
		},
		link: function(scope) {
			var ystart;
			var arr = [];
			scope.getClass = function(year) {
				var A = Date.parse(new Date(year, 0, 1));
				var B = Date.parse(new Date(year + 1, 0, 0));
				var jintian = new Date();
				if (scope.min == "today") {
					scope.min = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
				}
				if (scope.max == "today") {
					scope.max = jintian.getFullYear() + "-" + (jintian.getMonth() + 1) + "-" + jintian.getDate()
				}
				var min = Date.parse(new Date(scope.min));
				var max = Date.parse(new Date(scope.max));
				return {
					"cur": year == scope.y,
					"disabled": A < min && B < min || A > max && B > max
				}
			}
			scope.getArr = function(_ystart) {
				if (_ystart == ystart) {
					return arr
				}
				ystart = scope.ystart;
				arr = [];
				for (var i = 0; i < 3; i++) {
					var _arr = [];
					for (var j = 0; j < 10; j++) {
						_arr.push(ystart + i * 10 + j)
					}
					arr.push(_arr)
				}
				return arr
			}
			scope.changey = function(year) {
				if (scope.getClass(year).disabled) {
					return
				}
				scope.y = year;
				scope.type = "y"
			}
		}
	}
}]);