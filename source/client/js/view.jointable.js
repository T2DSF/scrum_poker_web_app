scrumapp.views["jointable"] = {
	joinPause:true,
	newPause:true,

	init: function(){
		this.setStatus();
		this.setClearBtn();
		$('#submitCodeBtn').bind('mousedown touchstart', $.proxy(this.handleJoinTableClick, this));
		//
		$(window).bind()
		$('#newTableBtn').bind('mousedown touchstart', $.proxy(this.handleNewTableClick, this));
	},
	setStatus: function(){
		var name = scrumapp.ls.get_local_storage_name();
		$('footer div#status').text("good to see you, "+ name +"!");
	},
	handleNewTableClick: function(e){
		var self = this;
		$('footer div#status').text("starting new table");

		if(this.newPause){
			console.log("handleNewTableClick()");

			this.newPause = false;
			
			var name = scrumapp.ls.get_local_storage_name();
			if(name!=""){
				PokerServer.createNewPokerTable(name, this.handleTableConnect);
			}

		}
		setTimeout(function(){self.newPause = true},2000);
		
	},

	// join table button handler
	handleJoinTableClick: function(e) {
		var self = this;
		//the event is fired twice for some reason, added the joinPause functionality to prevent code execution
		if(this.joinPause){
			console.log("handleJoinTableClick ");
		
			this.joinPause = false;
			//console.log("handleJoinTableClick();");
			$('#submitCodeBtn').unbind('mouseup touchend', $.proxy(this.handleJoinTableClickEnd, this));
			if($('#input').hasClass('transp')){
				$('#input').removeClass('transp');
				$('#newTableBtn').toggleClass('transp');
				$('#newTableBtn').unbind('mousedown touchstart', $.proxy(this.handleNewTableClick, this));
			}else{
				var name = scrumapp.ls.get_local_storage_name();
				var tableId = $('#tableIdInput').val().toUpperCase();
				if(tableId != ""){
					// console.log("PokerServer.connected: "+PokerServer.connected);
					PokerServer.joinPokerTable(tableId, name, this.handleTableConnect);
				}
			}
		}
		setTimeout(function(){self.joinPause = true},1000);
		
	},
	handleTableConnect: function(data) {
		scrumapp.setView("limbo");
		scrumapp.views["limbo"].showId(PokerServer.tableId);
		
		if(PokerServer.clientType == "dealer"){
			$('footer div#status').text("start when you're ready");
		}else{
			$('#startHand').remove();
		}
		//
	},
	// callback after a new player joins
	handlePlayerConnect: function(playerData) {
		//console.log("player connected");
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

