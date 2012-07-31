(function() {
	var localStorageName = 'eotss_'+window.location.host;
	
	function isEnabled() {
		return document.documentElement.classList.contains('eotss_enabled');
	}
	
	function enable(){
		try {
			delete localStorage[localStorageName];
		} catch (e) {
		}
		document.documentElement.classList.add('eotss_enabled');
	};
	
	function disable(){
		try {
			localStorage[localStorageName] = true;
		} catch (e) {
		}
		document.documentElement.classList.remove('eotss_enabled');
	};
	
	function toggle() {
		if (isEnabled()) {
			disable();
		} else {
			enable();
		}
	}
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	    if (request.type === "toggle"){
	        toggle();
	        sendResponse( {'enabled': isEnabled(), 'url': window.location.href} );
	        return;
	    }
	    if (request.type === "getEnabled") {
	        sendResponse( {'enabled': isEnabled(), 'url': window.location.href} );
	    	return;
	    }
	    console.log(request, sender);
	    throw new Error('Unknown message type! '+request.type);
	});
	
	if (isEnabled()) {
		enable();
	} else {
		disable();
	}
}());