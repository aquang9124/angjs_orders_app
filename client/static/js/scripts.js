var myApp = angular.module('myApp', ['ngRoute']);

	myApp.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'partials/customers.html'
		})
		.when('/orders', {
			templateUrl: 'partials/orders.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	});

	myApp.factory('customerFactory', function() {
		var factory = {};
		var customers = [
			{ name: 'Michael Choi', created_at: new Date() }
		];
		var orders = [];

		factory.getCustomers = function(callback) {
			callback(customers);
		};

		factory.getOrders = function(callback) {
			callback(orders);
		}

		factory.addCustomer = function(customer) {
			for (var i = 0; i < customers.length; i++) {
				if (customers[i].name === customer.name) {
					return false;
				}
			}

			customers.push(customer);
			return true;
		};

		factory.removeCustomer = function(customer) {
			customers.splice(customers.indexOf(customer), 1);
		};

		factory.addOrder = function(order) {
			orders.push(order);
		};

		return factory;
	});

	myApp.controller('customersController', function($scope, customerFactory) {
		$scope.customers = [];

		customerFactory.getCustomers(function(data) {
			$scope.customers = data;
		});

		$scope.addCustomer = function() {
			$scope.newCustomer.created_at = new Date();
			if (customerFactory.addCustomer($scope.newCustomer) === false)
			{
				$scope.message = "Sorry, that customer already exists.";
			}
			else {
				$scope.message = "";
			}
			$scope.newCustomer = {};
		};

		$scope.removeCustomer = function(customer) {
			customerFactory.removeCustomer(customer);
		};

	});

	myApp.controller('ordersController', function($scope, customerFactory) {
		$scope.customers = [];
		$scope.orders = [];
		customerFactory.getCustomers(function(data) {
			$scope.customers = data;
		});

		customerFactory.getOrders(function(data) {
			$scope.orders = data;
		});

		$scope.addOrder = function() {
			$scope.newOrder.created_at = new Date();
			customerFactory.addOrder($scope.newOrder);
			$scope.newOrder = {};
		};
	});