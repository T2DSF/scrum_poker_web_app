var scrumapp = {
	c: undefined,
	ctx: undefined,
	fibNums: ["0", ".5", "1", "2", "3", "5", "8", "13", "20"],
	fontSize: 30,
	gridCount: 3,
	buttonCount: 9,
	btnArr: [],
	margin: 20,
	btnRadius:140-(this.margin*2),
	w: 320,
	h: 480,
	gridW: undefined, 
	gridH: undefined,
	headerSize: 40,
	test: {x:0, y:0},
	xOffset: undefined, 
	yOffset: undefined,
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

		// console.log("initScreen");
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