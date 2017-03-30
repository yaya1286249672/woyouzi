// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var kmstr=[]
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(["$stateProvider","$urlRouterProvider","$ionicConfigProvider",function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
	$ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

	$stateProvider
	.state("tabs",{
		url:"/tab",
		templateUrl:"templates/tabs.html"
	})
	.state("tabs.home",{
		url:"/home",
		views:{
			"tab-home":{
				templateUrl:"templates/home.html",
				controller:"indexctrl"
			}
		}
	})
	.state("tabs.sort",{
		url:"/sort",
		views:{
			"tab-sort":{
				templateUrl:"templates/sort.html",
				controller:"sortctrl"
			}
		}
	})
	.state("tabs.detial",{
		url:"/sort/:gsort/:id",
		views:{
			"tab-sort":{
				templateUrl:"templates/detial.html",
				controller:"detctrl"
			}
		}
	})
	.state("tabs.car",{
		url:"/car",
		views:{
			"tab-car":{
				templateUrl:"templates/car.html",
				controller:"carctrl"
			}
		}
	})
	.state("tabs.mine",{
		url:"/mine",
		views:{
			"tab-mine":{
				templateUrl:"templates/mine.html",
				controller:'lctrl'
			}
		}
	})
	.state("tabs.login",{
        url:"/login",
        views:{
            "tab-mine":{
                templateUrl:"templates/login.html",
                controller:'lctrl1'
            }
        }
    })
        .state("tabs.success",{
            url:"/success",
            views:{
                "tab-mine":{
                    templateUrl:"templates/success.html"
                }
            }
        })
	$urlRouterProvider.otherwise("/tab/home")
	
}])
.controller("sortctrl",function($scope,$http,$ionicActionSheet,$ionicBackdrop,$timeout){
	$scope.sortclick=function(){
		//console.log(this.lis.detimg);
		$scope.loaddet=this.lis.detimg;
	}
	
	$http({
		url:"js/sort.json"
	}).success(function(data){
		//console.log(data);
		$scope.sortlist=data;
		$scope.sortFilter=data[0].sortFilter;
		//console.log($scope.data[0].sortFilter)
	});
	$scope.saleclick=function(){
		//console.log("haha");
		//console.log(this.fil);	
	}
	//添加分享
	 $scope.tap=function(){
      // 显示上拉菜单
       var hideSheet = $ionicActionSheet.show({
         buttons: [
           { text: '分享微信' },
           { text: '选分享QQ' },
           { text: '分享QQ好友'}
         ],
         titleText: 'action sheet',
         cancelText: '取消',
         cancel: function() {
              // 这里添加取消代码
              console.log('取消了')

          },
         buttonClicked: function(index) {
            if (index==0) {
              console.log('分享微信')
            }else{
              console.log('选分享QQ')
            };
         }
       });
       // 2秒后再次调用隐藏菜单
       $timeout(function() {
         hideSheet();
       }, 2000);
    };
})
.controller("detctrl",function($scope,$http,$stateParams){
	
	$http({
		url:"js/sort.json"
	}).success(function(data){
		//console.log(data);
		$scope.str=data[$stateParams.gsort].detimg[$stateParams.id]
		console.log($scope.str)
		$scope.gcount=1
		$scope.addcar=function(){
		//console.log("heihei");
			var gp=$scope.str.price;
			var gn=$scope.str.title;
			var gm=$scope.str.img;
			var gc=$scope.gcount;
			var gdmes=JSON.stringify({"gprice":gp,"gname":gn,"gimg":gm})
			localStorage.setItem(gn,gdmes);
			console.log(localStorage.getItem(gn));
			kmstr.push(localStorage.getItem(gn))//数组
			console.log(kmstr);
			//kmstr=JSON.stringify(kmstr)
			localStorage.setItem("yaya",kmstr);		
		}
	})
})
.controller("carctrl",function($scope){
	var e=localStorage.getItem("yaya")
	var tar=e.replace("},,","},").split(",,")[0];
	tar = "["+tar+"]";
	console.log(tar);
	tar=JSON.parse(tar);
	console.log(tar);
	$scope.frstr=tar;
	//console.log(window.localStorage.不莱玫2017新款钱包女短款学生零钱可爱小清新折叠钱夹);
	console.log(window.localStorage.length);
	console.log(typeof(window.localStorage));
})
.controller("indexctrl",function($scope,$http){
	$http({
		url:"js/index.json"
	}).success(function(data){
		console.log(data);
		$scope.lunlist=data;
	});
})	
.controller("lctrl",function($scope){
		$scope.bt=function(){
			var uname = document.getElementById("uname").value;
			var pwd = document.getElementById("pwd").value;
			var good = "users.php";
			getJson(good,uname,pwd,Log);
			function Log(data){
				if(data.login){
					console.log(data.msg);
                    alert("登陆成功！");
                    window.location.href = "#/tab/success";
				}else {
					console.log(data.msg);
                    err.textContent = "账号或密码错误！";
                    err.style.color = "red";
                    err.style.fontSize = "18px";
                    window.location.href = "javascript:;";

				}
			}
		}
	})
    .controller('lctrl1',function($scope){
        $scope.btt=function(){
             var uname = document.getElementById("cuname").value;
             var pwd = document.getElementById("cpwd").value;
             var rpwd = document.getElementById("crpwd").value;
            if(uname.length < 6 || uname.length>16 ){
                var unErr = document.getElementById("un-err");
                unErr.innerHTML = "账号不合法!";
                unErr.style.color = "red";
                return;
            }
            if(pwd.length >= 6 && uname.length<16){
                if(pwd != rpwd){
                    var pwdErr = document.getElementsByClassName("pwd-err");
                    pwdErr[0].innerHTML = "输入的密码不一致！";
                    pwdErr[1].innerHTML = "输入的密码不一致！";
                    pwdErr[0].style.color = "red";
                    pwdErr[1].style.color = "red";
                    return;
                }
            }else {
                var pwdE = document.getElementsByClassName("pwd-err");
                pwdE[0].innerHTML = "密码不合法！";
                pwdE[0].style.color = "red";
                return;
            }

             var good = "pwd.php";
             getJson(good,uname,pwd,Loo);

             function Loo(data){
                 if(data.login){
                     alert(data.msg);
                     window.location.href = "#/tab/mine";
                 }else {
                     console.log(data.msg);
                 }
             }
         }
    })

function getJson(address,uname,pwd,Good){
	var http;
	if(window.XMLHttpRequest){
		http = new XMLHttpRequest();
	}else{
		http = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//处理数据
	http.onreadystatechange = function (){
		if(http.readyState == 4 && http.status == 200){
			var JsonStr = http.responseText;
			var json = JSON.parse(JsonStr);
			//处理数据
			Good(json);
		}
	};
	//发送请求
	http.open("POST",address,true);
	http.setRequestHeader("content-type","application/x-www-form-urlencoded");
	http.send("uname="+ uname + "&pwd="+pwd);
}
