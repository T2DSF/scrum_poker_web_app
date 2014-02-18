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
		if(this.checkifPopupNeeded){
			// this.popup();
			console.log("this is not standalone");			
		}else{
			// this.popup();
			console.log("this is in the standalone");
		}
		console.log(window.navigator.platform);
		this.initScreen();
		var joinView = scrumapp.views["jointable"];
		var limboView = scrumapp.views["limbo"];
		var tableView = scrumapp.views["table"];
		var progressView = scrumapp.views["progress"];
		var resultsView = scrumapp.views["results"];
		//
		//$('#newTableBtn').bind('mousedown touchstart', $.proxy(this.handleNewTableClick, this));
		$('#container').bind('touchmove', $.proxy(this.prevent, this));
		//
		$(window).bind('resize', $.proxy(this.resized, this));
		// after we connect to the table, register callbacks for all the server events
		PokerServer.handlePlayerConnectCallback(joinView.handlePlayerConnect);
		PokerServer.handleHandBeginCallback(tableView.handleHandBegin);
		PokerServer.handleHandProgressCallback(progressView.handleHandProgress);
		PokerServer.handleHandCompleteCallback(progressView.handleHandComplete);
		PokerServer.handleTableErrorCallback(this.handleTableErrorCallback);
		//
	},
	checkifPopupNeeded:function(){
		if (("standalone" in window.navigator) && !window.navigator.standalone){
			//standalone property exists, standalone not set
			return true;
		}else{
			//either standalone isnt possible or standalone is set
			return false;
		}

	},
	prevent: function(e){
		e.preventDefault();
		console.log(e);
	},
	initScreen: function(){

		console.log("initScreen");
		if( !this.ls.get_local_storage_name() ){
			this.setView("setup");
		}else{
			this.setView("jointable");
			$('#input').addClass('transp');
		}
	},
	setView: function(screenName){
		// console.log("***** setView: "+screenName);
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
	},
	handleTableErrorCallback: function(e){
		console.log("*   *error: "+ e);
		for(var p in e){
			console.log(p+ " "+ e[p]);
		}
		if(e.type == "invalidId"){
			$('footer div#status').text("that id doesn't exist!");
		}
	},
	resized: function(event){
		console.log("ersize");
		scrumapp.views["progress"].initCanvas();
	},
	popup:function(){
		$('#container header').after("<div class='popup' id='installPopup'></div>")
		// $('#container header').after("<div class='popup' id='installPopup'><h2>Please install this to your phone's homescreen.</h2></div>")
	}
	

};
window.scrumapp = scrumapp;
$(document).ready(function(){
	scrumapp.init();
});