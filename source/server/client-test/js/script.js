$(document).ready(function() {
	// bind click events to ui elements
	$("#startTable").bind('click', handleStartTableClick);
	$("#joinTable").bind('click', handleJoinTableClick);

	/*$("#startHand").bind('click', function() {
		PokerServer.dealer.startHand();
	});
	$("#endHand").bind('click', function() {
		PokerServer.dealer.endHand();
	});

	$(".pointCard").bind('click', handleScoreSelect);*/
});

// start table button handler
function handleStartTableClick(e) {
	var name = $('#playerNameInput').val();
	PokerServer.startPokerTable(name, handleTableConnect);
}

// join table button handler
function handleJoinTableClick(e) {
	var name = $('#playerNameInput').val();
	var tableId = $('#tableIdInput').val();
	PokerServer.joinPokerTable(tableId, name, handleTableConnect);
}

// callback after node server connects the client to a table
function handleTableConnect(data) {
	console.log("handleTableConnect", PokerServer.tableId, data);
	$("#start").addClass('hidden');
	$("#limbo").removeClass('hidden');
	if(PokerServer.clientType === "dealer") {
		$("#dealerControls").removeClass("hidden");
	}
	$("#tableId").text(PokerServer.tableId);
	console.log(PokerServer+"  "+handlePlayerConnect);
	// after we connect to the table, register callbacks for all the server events
	PokerServer.handlePlayerConnectCallback(handlePlayerConnect);
	PokerServer.handleHandBeginCallback(handleHandBegin);
	PokerServer.handleHandProgressCallback(handleHandProgress);
	PokerServer.handleHandCompleteCallback(handleHandComplete);
}

// callback after a new player joins
function handlePlayerConnect(playerData) {
	console.log("player connected", playerData[0].name, playerData);
}

// callback when the dealer starts a new hand
function handleHandBegin(issueNumber) {
	console.log("hand begin", issueNumber);
	if(!$("#limbo").hasClass("hidden")) {
		$("#limbo").addClass("hidden");
	}
	$("#table").removeClass("hidden");
	if(!$("#results").hasClass('hidden')) {
		$("#results").addClass("hidden");
	}
}

// click handler for score selection
function handleScoreSelect(e) {
	var value = $(this).attr('value');
	console.log('you selected', value);
	PokerServer.player.showHand(value);
	$("#table").addClass("hidden");
	$("#progress").removeClass("hidden");
}

// callback when a player makes a selection
function handleHandProgress(percent) {
	console.log("hand progress", percent);

}

// callback when the dealer ends the hand
function handleHandComplete(handData) {
	console.log("hand end", handData);
	$("#table").addClass("hidden");
	$("#progress").addClass("hidden");
	$("#results").removeClass("hidden");
}