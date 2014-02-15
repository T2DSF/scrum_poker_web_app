scrumapp.views["jointable"] = {
	
	init: function(){
		this.setStatus();
		this.setClearBtn();
		$('#submitCodeBtn').bind('click', $.proxy(this.handleJoinTableClick, this));
		//$('#submitCodeBtn').bind('touchstart', $.proxy(this.handleJoinTableClick, this));
		//
		$('#startTableBtn').bind('click', $.proxy(this.handleStartTableClick, this));
		//$('#startTableBtn').bind('touchstart', $.proxy(this.handleStartTableClick, this));
		// console.log("jointable.init() called");
	},
	setStatus: function(){
		// console.log($('footer div#status').html());
		var name = scrumapp.ls.get_local_storage_name();
		$('footer div#status').text("good to see you, "+ name +"!");
	},
	handleStartTableClick: function(e){
		console.log("handleStartTableClick()");
		// var name = $('#playerNameInput').val();
		var name = scrumapp.ls.get_local_storage_name();
		if(name!=""){
			// console.log("name: "+name);
			PokerServer.startPokerTable(name, this.handleTableConnect);
		}
	},
	// join table button handler
	handleJoinTableClick: function(e) {
		console.log("handleJoinTableClick();");
		var name = scrumapp.ls.get_local_storage_name();
		var tableId = $('#tableIdInput').val();
		PokerServer.joinPokerTable(tableId, name, this.handleTableConnect);
	},
	handleTableConnect: function(data) {
		console.log("handleTableConnect", PokerServer.tableId, data);
	
		scrumapp.setView("limbo");
		scrumapp.views["limbo"].showId(PokerServer.tableId);
		var me = scrumapp.views["jointable"];
		// after we connect to the table, register callbacks for all the server events
		PokerServer.handlePlayerConnectCallback(me.handlePlayerConnect);
		PokerServer.handleHandBeginCallback(me.handleHandBegin);
		PokerServer.handleHandProgressCallback(me.handleHandProgress);
		PokerServer.handleHandCompleteCallback(me.handleHandComplete);
		//
	},
	// callback after a new player joins
	handlePlayerConnect: function(playerData) {
		if(PokerServer.clientType === "dealer") {
			console.log("clientType is -dealer-");
		}else{
			console.log(PokerServer.clientType);	
		}
		console.log("player connected", playerData[0].name, playerData);
	},
	// callback when the dealer starts a new hand
	handleHandBegin: function(issueNumber) {
		console.log("hand begin", issueNumber);
		scrumapp.setView("table");
	},
	// callback when a player makes a selection
	handleHandProgress: function(percent) {
		console.log("hand progress", percent);
		// scrumapp.views["progress"]
	},
	// callback when the dealer ends the hand
	handleHandComplete: function(handData) {
		console.log("hand end", handData);
		scrumapp.setView("results");
		scrumapp.views["results"].drawResults(handData);
		// $("#table").addClass("hidden");
		// $("#progress").addClass("hidden");
		// $("#results").removeClass("hidden");
	},
	setClearBtn: function(){
		$('div#settings').click(function(){
			scrumapp.ls.clear_local_storage();
			scrumapp.initScreen();
			$('#username').val("");
			$('#secretcode').val("");
		})
	}
}

