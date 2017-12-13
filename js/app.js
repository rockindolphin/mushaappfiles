'use strict';

angular.module('myApp', [
	'ngTouch',
	'ngRoute',
	'ngAnimate',
	'myApp.controllers',
	'yaMap',
]).
config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/backcall', {templateUrl: 'partials/backcall.html' });
	$routeProvider.when('/booking', {templateUrl: 'partials/booking.html' });
	$routeProvider.when('/booking2', {templateUrl: 'partials/booking2.html' });
	$routeProvider.when('/catalog', {templateUrl: 'partials/catalog.html' });
	$routeProvider.when('/catalog2', {templateUrl: 'partials/catalog2.html' });
	$routeProvider.when('/enter', {templateUrl: 'partials/enter.html' });
	$routeProvider.when('/front', {templateUrl: 'partials/front.html', controller: 'FrontCtrl' });
	$routeProvider.when('/login', {templateUrl: 'partials/login.html' });
	$routeProvider.when('/menu', {templateUrl: 'partials/menu.html' });
	$routeProvider.when('/review_add', {templateUrl: 'partials/review_add.html' });
	$routeProvider.when('/review_open', {templateUrl: 'partials/review_open.html' });
	$routeProvider.when('/reviews', {templateUrl: 'partials/reviews.html' });
	$routeProvider.when('/myprofile', {templateUrl: 'partials/myprofile.html' });
	$routeProvider.when('/myprofile_edit', {templateUrl: 'partials/myprofile_edit.html' });
	$routeProvider.when('/userprofile', {templateUrl: 'partials/userprofile.html' });
	$routeProvider.when('/about', {templateUrl: 'partials/about.html' });
	$routeProvider.when('/beautyclub', {templateUrl: 'partials/beautyclub.html' });
	$routeProvider.when('/contacts', {templateUrl: 'partials/contacts.html' });
	$routeProvider.otherwise({redirectTo: '/front'});
}]);