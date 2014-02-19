scrumapp.views["jointable"] = {
	pause:true,

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
		// console.log("handleNewTableClick()");
		$('footer div#status').text("starting new table");
		var name = scrumapp.ls.get_local_storage_name();
		if(name!=""){
			PokerServer.createNewPokerTable(name, this.handleTableConnect);
		}
	},

	// join table button handler
	handleJoinTableClick: function(e) {
		var self = this;
		// console.log("click "+this.pause);
		//the event is fired twice for some reason, added the pause functionality to prevent code execution
		if(this.pause){
			this.pause = false;
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
		setTimeout(function(){console.log(self.pause = true)},1000);
		
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

