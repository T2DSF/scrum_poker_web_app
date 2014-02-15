scrumapp.views["limbo"] = {
	
	init: function(){
		this.setStatus();

		$('#startHand').bind('click', $.proxy(this.startHand, this));
		
		
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
	showId: function(tableId){
		$('#tableId').text("table: "+ tableId);
	}
}

