var app=angular.module("bourseApp",[]);
app.controller("bourseController",function($scope,$http){
	//variables
	$scope.societe="";
	$scope.stats={
		totalActionsVente:'-',
		totalActionsAchat:'-',
		prixMoyenVente:'-',
		prixMoyenAchat:'-',
		estimationPrixAction:'-'
	};
	$scope.pageOrdres = [];
	$scope.pageCourante = 0;
	$scope.pageSize =3;
	$scope.pages="";

	//initializing variables
	$scope.init = function() {
		$scope.societe="";
		$scope.stats={
			totalActionsVente:'-',
			totalActionsAchat:'-',
			prixMoyenVente:'-',
			prixMoyenAchat:'-',
			estimationPrixAction:'-'
		};
		$scope.pageOrdres = [];
		$scope.pageCourante = 0;
		$scope.pageSize =3;
		$scope.pages="";
	};

	//getting societe function
	$scope.rechercherSociete = function() {
		if($scope.recherche.code) {
			$http.get("http://localhost:8080/v1/societes/find-by-code/" + $scope.recherche.code).success(function (data) {
				$scope.init();
				$scope.societe = data;
				if ($scope.societe.numeroSociete) {
					$scope.setStats();
					$scope.getOrdres();
				}
			});
		}
	};

	//getting stats function
	$scope.setStats = function() {

			$http.get("http://localhost:8080/v1/ordres/total-actions-vente/" + $scope.societe.numeroSociete).success(function (data) {
				$scope.stats.totalActionsVente = data;
			});
			$http.get("http://localhost:8080/v1/ordres/total-actions-achat/" + $scope.societe.numeroSociete).success(function (data) {
				$scope.stats.totalActionsAchat = data;
			});
			$http.get("http://localhost:8080/v1/ordres/prix-moyen-vente/" + $scope.societe.numeroSociete).success(function (data) {
				$scope.stats.prixMoyenVente = data;
			});
			$http.get("http://localhost:8080/v1/ordres/prix-moyen-achat/" + $scope.societe.numeroSociete).success(function (data) {
				$scope.stats.prixMoyenAchat = data;
			});

	};

	//getting orders function
	$scope.getOrdres = function() {
		$http.get(
			"http://localhost:8080/v1/ordres/societe/"
			+$scope.societe.numeroSociete+"?page=" + $scope.pageCourante + "&size=" + $scope.pageSize)
			.success(function(data) {
			$scope.pageOrdres = data;
			$scope.pages = new Array(data.totalPages);
		});
	};
	//move on pages
	$scope.gotoPage = function(n) {
		$scope.pageCourante = n;
		$scope.getOrdres();
	};
	
});