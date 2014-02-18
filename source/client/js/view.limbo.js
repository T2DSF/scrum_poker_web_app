scrumapp.views["limbo"] = {
	tId: undefined,
	currentNumberOfPlayers: 0,
	//
	init: function(){
		this.setStatus();
		if(PokerServer.clientType == "dealer"){
			$('#startHand').bind('click', $.proxy(this.startHand, this));
		}else{
			$('startHand').remove();
		}
		
	},
	startHand: function(e){
		PokerServer.dealer.startHand();
	},
	setStatus: function(){
		var name = scrumapp.ls.get_local_storage_name();
		$('footer div#status').text(name+", pls wait for dealer");
	},
	handleHandBegin: function(issueNumber) {
		console.log("hand begin", issueNumber);
	},
	updatePlayerCount: function(n){
		this.currentNumberOfPlayers = n;
		this.showId();
	},
	showId: function(tableId){
		if(tableId){
			this.tId = tableId;
		}else{

		}
		$('#tableId').text("ID: "+ this.tId+" ppl: "+this.currentNumberOfPlayers);
	}
}

