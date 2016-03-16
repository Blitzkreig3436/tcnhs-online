// Apps

angular.module('App', ['ngRoute','ngCookies','Controller', 'Factory', 'Directive'])
.config(function ($routeProvider, $locationProvider){
	$routeProvider.
		when('/', {templateUrl: 'Views/Home.html' ,requireLogin : false, controller: ''}).	
		when('/Login', {templateUrl: 'Views/Login.html', requireLogin : false,controller: 'Login'}).		
		when('/Register', {templateUrl: 'Views/Register.html', requireLogin : false,controller: 'Register'}).
		when('/Users',{templateUrl: 'Views/Users.html',requireLogin : true,controller: 'Users'}).
		when('/Welcome', {templateUrl: 'Views/Welcome.html', requireLogin : true,controller: 'Welcome'}).
		otherwise({ redirectTo: '/' });
	 // $locationProvider.html5Mode({
  //                enabled: true,
  //                requireBase: false
  //         });
})
.run(function($rootScope, $location, $cookieStore, factory) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

      if(next.requireLogin){
        if(!factory.CurrentUser()){
          $location.path('/Login')
        }
      }else{
        if(next.templateUrl == 'Views/Login.html' && factory.CurrentUser()){
          $location.path('/Welcome')
        }
      }
    });
  });


	