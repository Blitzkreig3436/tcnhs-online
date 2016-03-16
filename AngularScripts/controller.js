angular.module('Controller', [])

.controller('Register', function ($scope,  $location, factory){
	$scope.name="Controller Running";

		$scope.send = function (data){
		console.log(data.email);
	
		console.log("senddd");
		$scope.status= "Please wait"
		factory.Create(data)
		.then(function(res){
			console.log(res.data);
			$scope.status= "Registration Complete"
		})
		.catch(function(res){
			console.log(res)
			$scope.status= "Registration Failed"
		})
	}

})

.controller('Users', function ($scope, factory, $location){
	console.log('Users Controller')

	factory.Get()
	.then(function(res){
			$scope.users = res.data;			
		})
		.catch(function(res){		
			console.log("failure");
		})

	$scope.send = function (user){
		console.log(user)
	}
	

})

.controller('Login', function ($scope, factory, $cookieStore, $location, $rootScope){
	console.log('Login Controller')


	$scope.send = function (data){
		
			 factory.Authenticate(data)
       .then(function(res){
       	console.log(res.data.success)
			if(res.data.success){

				$location.path('/Welcome')
			}else
			{
				$scope.status=res.data.message
			}
		})
		.catch(function(res){		
			console.log(res)
		})
       }
	


})

.controller('Welcome', function ($scope, factory, $cookieStore, $location){
	console.log('Welcome Controller')

		factory.GetSubjects()
		.then(function(res){
			console.log(res.data)
			$scope.subjects = res.data;
		}).catch(function() {
			console.log('error')
		})

		$scope.send = function (subject) {
		factory.CreateSubject(subject)
		.then(function(res) {
			console.log('success')
			
		}).catch(function(){
			console.log('failure')
		})	
	}

		$scope.sendsched = function (subsched) {
			subsched.code=$scope.code;

			console.log(subsched)
		factory.CreateSubSched(subsched)
		.then(function(res) {
			console.log('success')
			
		}).catch(function(){
			console.log('failure')
		})	
	}

	$scope.subjectschedule = function (subject) {
			$scope.code = subject.code;
		factory.SubjectsSchedule(subject)
		.then(function (res){
			$scope.subjectschedules = res.data;
		})
	}

	$scope.enroll = function (subjectschedule){
		console.log($cookieStore.get('currentUser').user)
	}


	$scope.Logout = function () {
		factory.Logout()
		$location.path('/')		
	}
})



