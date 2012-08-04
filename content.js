(function() {
	function enable(){
		document.documentElement.classList.add('eotss_enabled');
	};
	
	function disable(){
		document.documentElement.classList.remove('eotss_enabled');
	};
	
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	    if (request.type === "enable"){
	        enable();
	        return;
	    }
	    if (request.type === "disable"){
	        disable();
	        return;
	    }
	    console.log(request, sender);
	    throw new Error('Unknown message type! '+request.type);
	});
}());