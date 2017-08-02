'use strict';

angular.module('myApp.controllers', [])
		.controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
				$scope.slide = '';
				$rootScope.back = function() {
					$scope.slide = 'slide-right';
					$window.history.back();
				}
				$rootScope.forward = function() {
					$scope.slide = 'slide-left';
					$window.history.forward();
				}				
				$rootScope.go = function(path){
					$scope.slide = 'slide-left';
					$location.url(path);
				}
				$scope.isPage = function(path){
					return  $location.path() === path;
				}


				$scope.$on('$viewContentLoaded', function(){

					var scrollDiv = document.createElement("div");
					scrollDiv.className = "scroll__measure";
					document.body.appendChild(scrollDiv);
					var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
					document.body.removeChild(scrollDiv);
					var body = document.querySelector('body');
					body.style.setProperty('--scrollbar-width', scrollbarWidth+'px');
					if( scrollbarWidth > 0 ){
						$('.scroll--hidden').css({
							marginRight: -scrollbarWidth
						});		
					}

					$('img[data-bg="true"]').each(function(){
						var src = $(this).attr('src');
						$(this).parent().css('background-image', 'url('+src+')');
						$(this).css('opacity', 0);
					}); 

				});


		}])
		.service('TabDataService',function(){
			this.bucket = {};

			this.saveData = function(tab_num,tabs_id){
				this.bucket[tabs_id]=tab_num;
			}

			this.getData = function(tabs_id){
				return this.bucket[tabs_id];
			}
		})		
		.controller('TabController', ['$scope', '$attrs', 'TabDataService', function($scope, $attrs, TabDataService) {
			TabDataService.saveData(1, $attrs.number);
			$scope.setTab = function(tab_num){
				TabDataService.saveData(tab_num, $attrs.number);
			}			
			$scope.isSet = function(tab_num){
			  return TabDataService.getData($attrs.number) === tab_num;
			};
		}])		
		.controller('FrontCtrl', ['$scope', function ($scope ) {

			$scope.$on('$viewContentLoaded', function(){
				var slider = new Swiper('.swiper-container', {
					direction: 'horizontal',
					loop: false,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					slidesPerView: 'auto',
					centeredSlides: true,
					preventClicks: false,
					effect: 'coverflow',
					coverflow: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 3,
						slideShadows : false
					},					
					onInit: function(swiper){
						$(swiper.container).on('mousedown touchstart',function(e){
							e.stopPropagation();
						});
						setTimeout(function(){
							swiper.slideTo(1);
						}, 100);
					},
				});	
			});	

		}])
		.controller('CalendarCtrl', ['$scope', '$swipe', function ($scope, $swipe ) {

			$.datetimepicker.setLocale('ru');
			moment.locale('ru');

			var input = $('input[data-role="date"]');
			var selected = document.createElement('div');
			$(selected).addClass('calendar__selected');
			$(input).before( selected );
			$(input).datetimepicker({
				format: 'd.m.Y H:i',
				inline: true,
				lang: 'ru',
				startDate: new Date(),
				timepickerScrollbar: false,
				scrollTime: false,
				scrollMonth: false,
				todayButton: false,
				dayOfWeekStart: 1,
				allowTimes:[
					'10:00', '11:00', '12:00', '13:00', 
					'14:00', '15:00', '16:00', '17:00', 
					'18:00', '20:00', '21:00', '21:00'
				],
				onGenerate: function(ct,$input){
					$(selected).html( moment(ct).format('dddd, DD MMM') );		
				},
				onSelectDate:function(ct,$i){
					$(selected).html( moment(ct).format('dddd, DD MMM') );
				}										
			});	

			var directionX = 0;
			$swipe.bind( $('.xdsoft_datetimepicker'), {'start': function(e){
				directionX = e.x;
				console.log(directionX);
			}});
			$swipe.bind( $('.xdsoft_datetimepicker'), {'start': function(e){
				console.log(directionX);
				directionX-= e.x;
				if( directionX < 0 ){
					console.log('left');
				}else if( directionX > 0 ){
					console.log('right');
				}
				directionX = 0;
			}});			

		}]);
