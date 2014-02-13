scrumapp.views["jointable"] = {
	

	init: function(){
		this.setStatus();
		console.log("jointable.init() called");
	},
	setStatus: function(){
		console.log($('footer div#status').html());
		var name = scrumapp.ls.get_local_storage_name();
		$('footer div#status').text("welcome to scrum, "+ name +"!");
	},
}

