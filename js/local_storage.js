scrumapp.ls = {
	usernameCompleteCallback: undefined,

	supports_html5_storage: function() {
	  try {
	    return 'localStorage' in window && window['localStorage'] !== null;
	  } catch (e) {
	    return false;
	  }
	},
	set_local_storage_name: function(n, callback){
		console.log('set_local_storage_name called');
		localStorage.name = n;
		callback();
	},
	get_local_storage_name: function(){
		// console.log('get_local_storage_name called');
		if(localStorage.name){
			return localStorage.name;
		}else{
			return false;
		}	
	},
	clear_local_storage:function(){

		localStorage.removeItem("name");
		console.log("name erased");
	}
}