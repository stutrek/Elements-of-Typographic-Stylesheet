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
	}
	
	function disable(){
		localStorage[KEY] = '0';
		document.documentElement.classList.remove('eotss_enabled');
		document.documentElement.classList.remove('eotss_slow');
	}
	
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
	function removeReceiver() {
		safari.self.removeEventListener( 'message', messageReciever, false );
		window.removeEventListener( 'beforeunload', removeReceiver, true );
	}
	
	if (isSafari) {
		console.log(window.safari);
		safari.self.addEventListener( 'message', messageReciever, false);
		window.addEventListener( 'beforeunload', removeReceiver, true);
	} else {
		chrome.extension.onMessage.addListener(messageReciever);
	}
	
	if (localStorage[KEY] !== '0') {
		enable();
	}
	
}());