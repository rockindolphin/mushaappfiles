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
		.controller('PickadateCtrl', ['$scope', '$element', function ($scope, $element) {

			var selected = document.createElement('div');
			$(selected).addClass('picker__selected');
			$( $element ).find('[data-role=date]').pickadate({
				monthsFull: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
				monthsShort: ['янв', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'],
				weekdaysFull: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
				weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],				
				today: 'сегодня',
				clear: 'очистить',
				close: 'закрыть',					
				closeOnSelect: false,
				closeOnClear: false,
				firstDay: 1,
				format: 'dddd, dd mmm',
				onStart: function() {
					this.open();
					this.set('select', new Date());
					$(this.$node).hide();
					$(selected).text( $(this.$node).val() );
					$(this.$holder).parent().prepend(selected);
				},	
				onSet: function(thingSet) {
					$(selected).text( $(this.$node).val() );
				}							
			});	
	
			$( $element ).find('[data-role=time]').pickatime({
				monthsFull: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
				monthsShort: ['янв', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'],
				weekdaysFull: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
				weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],				
				today: 'сегодня',
				clear: 'очистить',
				close: 'закрыть',				
				formatLabel: 'HH:i',
				disable: [
					true,
					[10,0],
					[11,0],
					[12,0],
					[13,0], 
					[14,0],
					[15,0],
					[16,0],
					[17,0], 
					[18,0],
					[19,0],
					[20,0],
					[21,0]
				],				
				onStart: function() {
					this.open();
					$(this.$node).hide();
				},				
			});	
	

		}]);
