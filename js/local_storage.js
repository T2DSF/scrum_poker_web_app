function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function set_local_storage_name(n){
	console.log('set_local_storage_name called');
	localStorage.name = n;
}

function get_local_storage_name(){
		console.log('get_local_storage_name called');
		if(localStorage.name){
			return localStorage.name;
		}else{
			return false;
		}
}

function clear_local_storage(){
	localStorage.removeItem("name");
}