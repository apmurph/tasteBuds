/*global $ */

$('.toggleMenu').click(function(){
	$('.sideMenu').toggleClass('showSideMenu');
	$('.container-fluid').toggleClass('moveRight');
	$('.navbar-brand').toggleClass('hide-navbar-brand');
});