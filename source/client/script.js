var scrumapp = {
	views: [],
	//initScreen(),

	init: function(){
		this.initScreen();
		// addEventListener("touchstart", doTouchStart, false);
		// addEventListener("touchmove", doTouchMove, false);
		// addEventListener("touchend", doTouchEnd, false);
		// addEventListener("mousedown", doTouchStart, false);
		// addEventListener("mouseup", doTouchEnd, false);
		
	},
	initScreen: function(){

		console.log("initScreen");
		if( !this.ls.get_local_storage_name() ){
			this.setView("setup");
		}else{
			this.setView("jointable")
		}
	},
	setView: function(screenName){
		// console.log("***** settingScreen: "+screenName);
		var $activeScreen = $("#container .active")[0];
	    if ($activeScreen) {
	        $("div.active").toggleClass("active");
	    }
	   var id = "#"+screenName;
	   // console.log(id);
	   $(id).addClass('active');
	   // console.log(this.views.length);
	   this.views[screenName].init();

	},
	doTouchMove: function(e){
		e.preventDefault();
	},
	doTouchEnd: function(e){
		e.preventDefault();
		//console.log("released");
	}
	

};
window.scrumapp = scrumapp;
$(document).ready(function(){
	scrumapp.initScreen();
});