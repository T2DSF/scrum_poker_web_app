scrumapp.views["setup"] = {
	self: this,

	init: function(){
		this.setStatus();
		//this.setUsername();
	$('#submitName').bind('click', $.proxy(this.setUsername, this));
	},
	setStatus: function(){
		// console.log($('footer div#status').html());
		$('footer div#status').text("welcome, guest!");
	},
	setUsername: function(){
		console.log("view.setup.setUsername() called ");
		// console.log("caller is " + arguments.callee.caller.toString());
		var b = $('#playerNameInput').val();
		if (b){
			// console.log("setting username "+ this.usernameComplete);
			scrumapp.ls.set_local_storage_name(b, this.usernameComplete);
		}else{
			// console.log("username doesnt is");
		}
	},
	usernameComplete: function(){
		// console.log('usernameComplete');
		//console.log('username is successfully added: '+ scrumapp.ls.get_local_storage_name());
		scrumapp.initScreen();
	}
}

