scrumapp.views["setup"] = {
	self: this,

	init: function(){
		this.setStatus();
		$('#submitName').bind('click', $.proxy(this.setUsername, this));
	},
	setStatus: function(){
		$('footer div#status').text("welcome, guest!");
	},
	setUsername: function(){
		var b = $('#playerNameInput').val();
		if (b){
			scrumapp.ls.set_local_storage_name(b, this.usernameComplete);
		}
	},
	usernameComplete: function(){
		scrumapp.initScreen();
	}
}

