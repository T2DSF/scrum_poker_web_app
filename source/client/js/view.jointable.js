scrumapp.views["jointable"] = {
	

	init: function(){
		this.setStatus();
		this.setClearBtn();
		// console.log("jointable.init() called");
	},
	setStatus: function(){
		// console.log($('footer div#status').html());
		var name = scrumapp.ls.get_local_storage_name();
		$('footer div#status').text("good to see you, "+ name +"!");
	},
	attemptToJoin: function(){
		var b = $('#secretcode').val();
		console.log("jointable.attemptToJoin(): "+ b);
		if(b!=""){
			//attempt to join(b);
		}else{
			//code is blank
		}
	},
	setClearBtn: function(){
		$('div#settings').click(function(){
			scrumapp.ls.clear_local_storage();
			scrumapp.initScreen();
		})
	}
}

