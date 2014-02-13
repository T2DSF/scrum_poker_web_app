scrumapp.views["setup"] = {
	

	init: function(){
		this.setStatus();
		//this.setUsername();
	},
	setStatus: function(){
		console.log($('footer div#status').html());
		$('footer div#status').text("welcome, guest!");
	},
	setUsername: function(){
		// console.log("view.setup.setUsername() called");
		//console.log("caller is " + arguments.callee.caller.toString());
		var b = $('#username').val();
		if (b){
			// console.log("setting username");
			scrumapp.ls.set_local_storage_name(b, this.usernameComplete);
		}else{
			// console.log("username doesnt is");
		}
	},
	usernameComplete: function(){

		console.log('username is successfully added: '+ scrumapp.ls.get_local_storage_name());
		scrumapp.initScreen();
	}
}

