var scrumapp = {
	views: [],
	colors: {
		color1: "#00afea",
		color2: "#ec2761",
		color3: "#494949",
		color4: "#FFFFFF",
		color5: "#000"
	},
	curScore: 0,
	curScreen: "",
	//initScreen(),

	init: function(){
		this.initScreen();
		var joinView = scrumapp.views["jointable"];
		var limboView = scrumapp.views["limbo"];
		var tableView = scrumapp.views["table"];
		var progressView = scrumapp.views["progress"];
		var resultsView = scrumapp.views["results"];
		// after we connect to the table, register callbacks for all the server events
		
		PokerServer.handlePlayerConnectCallback(joinView.handlePlayerConnect);
		PokerServer.handleHandBeginCallback(tableView.handleHandBegin);
		PokerServer.handleHandProgressCallback(progressView.handleHandProgress);
		PokerServer.handleHandCompleteCallback(progressView.handleHandComplete);
		
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
		console.log("***** setView: "+screenName);
		var $activeScreen = $("#container .active")[0];
	    if ($activeScreen) {
	        $("div.active").toggleClass("active");
	    }
	   var id = "#"+screenName;
	   // console.log(id);
	   this.curScreen=screenName;
	   $(id).addClass('active');
	   // console.log(this.views.length);
	   this.views[screenName].init();

	},
	handleClick: function(e){
		e.preventDefault();
	}
	

};
window.scrumapp = scrumapp;
$(document).ready(function(){
	scrumapp.init();
});