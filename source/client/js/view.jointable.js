scrumapp.views["jointable"] = {
	
	init: function(){
		this.setStatus();
		this.setClearBtn();
		$('#submitCodeBtn').bind('mousedown touchstart', $.proxy(this.handleJoinTableClick, this));
		//
		$('#newTableBtn').bind('mousedown touchstart', $.proxy(this.handleNewTableClick, this));
	},
	setStatus: function(){
		// console.log($('footer div#status').html());
		var name = scrumapp.ls.get_local_storage_name();
		$('footer div#status').text("good to see you, "+ name +"!");
	},
	handleNewTableClick: function(e){
		console.log("handleNewTableClick()");
		$('footer div#status').text("starting new table");
		// var name = $('#playerNameInput').val();
		var name = scrumapp.ls.get_local_storage_name();
		if(name!=""){
			// console.log("name: "+name);
			PokerServer.createNewPokerTable(name, this.handleTableConnect);
		}
	},
	// join table button handler
	handleJoinTableClick: function(e) {
		// console.log("handleJoinTableClick();");
		var name = scrumapp.ls.get_local_storage_name();
		var tableId = $('#tableIdInput').val().toUpperCase();
		PokerServer.joinPokerTable(tableId, name, this.handleTableConnect);
	},
	//
	//
	//
	handleTableConnect: function(data) {
		// console.log("handleTableConnect", PokerServer.tableId, data, +"  "+PokerServer.clientType);

		scrumapp.setView("limbo");
		scrumapp.views["limbo"].showId(PokerServer.tableId);
		if(PokerServer.clientType == "dealer"){
			$('#startHand').removeClass('hidden');
			$('footer div#status').text("start when you're ready");
		}else{
			$('#startHand').addClass('hidden');
		}
		//
	},
	// callback after a new player joins
	handlePlayerConnect: function(playerData) {
		//console.log("player connected");
		for (var i = 0; i < playerData.length; i++) {
			console.log('player '+i+": "+playerData[i].name);	
		}
		// console.log("passing this: "+ playerData.length);
		scrumapp.views["limbo"].updatePlayerCount(playerData.length);

	},
	//used for testing, disable before release
	setClearBtn: function(){
		$('div#settings').click(function(){
			scrumapp.ls.clear_local_storage();
			scrumapp.initScreen();
			$('#playerNameInput').val("");
			$('#tableIdInput').val("");
		})
	}
}

