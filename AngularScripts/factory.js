angular.module('Factory',[])

.factory('factory' , function ($http,  $cookieStore){
    return { 

        Create : function(data){
    	console.log("Factore.Create is running");
       	console.log(data);

       	return $http.post('http://localhost:8080/create',data)
 
            .success(function(data) {
            console.log(data);
            return data;
                       
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    },

    Get : function(){       
    	console.log('factory.get')
            return $http.post('http://localhost:8080/users')  
            .success(function(res) {
            	console.log(res)
            	return res;
            })
            .error(function(res){

console.log('failure factory get')
            })
        },
          
   Authenticate : function(data){
        console.log("login factory running")
        return $http.post('http://localhost:8080/Login', data)
        .success(function(res){
           if(res.success){
                console.log('success cookie')
                $cookieStore.put('currentUser', data)
            }
            return res
        })
        .error(function(res){
            console.log("failure login factory")
        })
    },

    Logout : function(){
        $cookieStore.remove('currentUser') 
},

    CurrentUser : function () {     
     return !($cookieStore.get('currentUser') === undefined)
    },
    CreateSubject  : function (subject) {
        console.log('CreateSubject factory running')
        return $http.post('http://localhost:8080/createsubject', subject)
        .success(function(res){
            console.log(res)
        })
        .error(function(){
            console.log('factory error')
        })
    },
    GetSubjects : function (){
        console.log('GetSubjects factory running')
        return $http.post('http://localhost:8080/getsubjects')
        .success(function(res){
            console.log(res)
            return res
        })
        .error(function(){
            console.log('factory error')
        })
    },
    SubjectsSchedule : function (subject){
        console.log('factory running')
        console.log(subject)
              return $http.post('http://localhost:8080/getsubjectschedule', subject)
        .success(function(res){
           console.log('factory success')
           return res
        })
        .error(function(){
            console.log('factory error')
        })
    },
       CreateSubSched : function (subsched){
        console.log('subsched factory running')
              return $http.post('http://localhost:8080/createsubjectschedule', subsched)
        .success(function(res){
            console.log(res)
            return res
        })
        .error(function(){
            console.log('factory error')
        })
    }
    

}
});