(function() {
	
	var KEY = 'ELEMENTS_OF_TYPOGRAPHIC_STYLESHEET_STATE';
	
	var isSafari = (!!window.safari);
	var isChrome = (!!window.chrome);
	
	function enable(){
		document.documentElement.classList.add('eotss_enabled');
		if (isSafari) {
			document.documentElement.classList.add('eotss_safari');
		}
		setTimeout(function() {
			document.documentElement.classList.add('eotss_slow');
		}, 0);
		delete localStorage[KEY];
	};
	
	function disable(){
		localStorage[KEY] = '0';
		document.documentElement.classList.remove('eotss_enabled');
		document.documentElement.classList.remove('eotss_slow');
	};
	
	function messageReciever(message){
	    if (message.name === "enable"){
	        enable();
	        return;
	    }
	    if (message.name === "disable"){
	        disable();
	        return;
	    }
	}
	
	if (isSafari) {
		safari.self.addEventListener( 'message', messageReciever, false);
	} else {
		chrome.extension.onMessage.addListener(messageReciever);
	}
	
	if (localStorage[KEY] !== '0') {
		enable();
	}
	
}());