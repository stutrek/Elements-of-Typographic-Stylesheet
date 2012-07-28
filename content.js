var localStorageName = 'eotss_'+window.location.host;

function isEnabled() {
	return !localStorage[localStorageName];
}

function enable(){
	console.log('enabling');
	delete localStorage[localStorageName];
	document.documentElement.classList.add('eotss_enabled');
};

function disable(){
	console.log('disabling');
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
	console.log('message', arguments );
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