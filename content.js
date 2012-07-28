var localStorageName = 'eotss_'+window.location.host;

function isEnabled() {
	return !localStorage[localStorageName];
}

function enable(){
	delete localStorage[localStorageName];
	document.documentElement.classList.add('eotss_enabled');
};

function disable(){
	localStorage[localStorageName] = true;
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
        sendResponse( {'enabled': isEnabled()} );
        return;
    }
    if (request.type === "getEnabled") {
    	sendResponse( {'enabled': isEnabled()} );
    	return;
    }
});

if (isEnabled()) {
	enable();
} else {
	disable();
}