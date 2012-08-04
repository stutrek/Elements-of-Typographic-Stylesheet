(function() {
	function enable(){
		document.documentElement.classList.add('eotss_enabled');
	};
	
	function disable(){
		document.documentElement.classList.remove('eotss_enabled');
	};
	
	safari.self.addEventListener( 'message', function(message){
	    if (message.name === "enable"){
	        enable();
	        return;
	    }
	    if (message.name === "disable"){
	        disable();
	        return;
	    }
	}, false);
}());