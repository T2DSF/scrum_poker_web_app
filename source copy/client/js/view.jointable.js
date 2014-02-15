scrumapp.views["jointable"] = {
	
	init: function(){
		this.setStatus();
		this.setClearBtn();
		$('#submitCodeBtn').bind('click', $.proxy(this.handleJoinTableClick, this));
		$('#startTableBtn').bind('click', $.proxy(this.handleStartTableClick, this));
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
		}else{
			console.log("no name");
			//code is blank
		}
	},
	// join table button handler
	handleJoinTableClick: function(e) {
		console.log("handleJoinTableClick();");
		var name = $('#playerNameInput').val();
		var tableId = $('#tableIdInput').val();
		PokerServer.joinPokerTable(tableId, name, this.handleTableConnect);
	},
	handleTableConnect: function(data) {
		console.log("handleTableConnect", PokerServer.tableId, data);
		// if(PokerServer.clientType === "dealer") {
		// 	$("#dealerControls").removeClass("hidden");
		// }
		// $("#tableId").text(PokerServer.tableId);
		scrumapp.setView("table");
		// after we connect to the table, register callbacks for all the server events
		PokerServer.handlePlayerConnectCallback(this.handlePlayerConnect);
		PokerServer.handleHandBeginCallback(this.handleHandBegin);
		PokerServer.handleHandProgressCallback(this.handleHandProgress);
		PokerServer.handleHandCompleteCallback(this.handleHandComplete);
	},
	// callback after a new player joins
	handlePlayerConnect: function(playerData) {
		console.log("player connected", playerData[0].name, playerData);
	},
	// callback when the dealer starts a new hand
	handleHandBegin: function(issueNumber) {
		console.log("hand begin", issueNumber);
		if(!$("#limbo").hasClass("hidden")) {
			$("#limbo").addClass("hidden");
		}
		$("#table").removeClass("hidden");
		if(!$("#results").hasClass('hidden')) {
			$("#results").addClass("hidden");
		}
	},

	// click handler for score selection
	handleScoreSelect: function(e) {
		var value = $(this).attr('value');
		console.log('you selected', value);
		PokerServer.player.showHand(value);
		$("#table").addClass("hidden");
		$("#progress").removeClass("hidden");
	},
	// callback when a player makes a selection
	handleHandProgress: function(percent) {
		console.log("hand progress", percent);

	},
	// callback when the dealer ends the hand
	handleHandComplete: function(handData) {
		console.log("hand end", handData);
		$("#table").addClass("hidden");
		$("#progress").addClass("hidden");
		$("#results").removeClass("hidden");
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

