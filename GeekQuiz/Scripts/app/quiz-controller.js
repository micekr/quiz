﻿angular.module('QuizApp', [])
    .controller('QuizCtrl', function ($scope, $http) {
        $scope.answered = false;
        $scope.title = "loading question...";
        $scope.options = [];
        $scope.correctAnswer = false;
        $scope.working = false;

        $scope.answer = function () {
            return $scope.correctAnswer ? 'correct' : 'incorrect';
        };

        /*
        Note: This function retrieves the next question 
from the Trivia Web API created in the previous 
exercise and attaches the question data to the $scope object.
        */

        $scope.nextQuestion = function () {
            $scope.working = true;
            $scope.answered = false;
            $scope.title = "loading question...";
            $scope.options = [];

            $http.get("/api/trivia").success(function (data, status, headers, config) {
                $scope.options = data.options;
                $scope.title = data.title;
                $scope.answered = false;
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "Oops... something went wrong";
                $scope.working = false;
            });
        };


        /*
Note: This function sends the answer selected by the user to the 
Trivia Web API and stores the result –i.e. if the answer is 
correct or not– in the $scope object.
        */

        $scope.sendAnswer = function (option) {
            $scope.working = true;
            $scope.answered = true;

            $http.post('/api/trivia', { 'questionId': option.questionId, 'optionId': option.id }).success(function (data, status, headers, config) {
                $scope.correctAnswer = (data === "true");
                $scope.working = false;
            }).error(function (data, status, headers, config) {
                $scope.title = "Oops... something went wrong";
                $scope.working = false;
            });
        };

        /*
        The nextQuestion and sendAnswer functions from above use the 
        AngularJS $http object to abstract the communication with the 
            Web API via the XMLHttpRequest JavaScript object from the 
        browser. AngularJS supports another service that brings a higher 
        level of abstraction to perform CRUD operations against a 
        resource through RESTful APIs. The AngularJS $resource 
        object has action methods which provide high-level behaviors 
        without the need to interact with the $http object. 
        Consider using the $resource object in scenarios that 
        requires the CRUD model 
        (fore information, see the $resource documentation).

        */

    });