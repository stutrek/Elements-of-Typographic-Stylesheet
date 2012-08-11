var activeTabId = null;
var HOST_REGEX = /https?:\/\/([^\/]+)*/

function getEnabled( tab ) {
	var host = HOST_REGEX.exec(tab.url)[1];
	
	if (localStorage[host] === "off") {
		return false;
	} else {
		return true;
	}
}

function enableOrDisableTab( tab ) {
	if (getEnabled(tab)) {
		chrome.tabs.sendMessage(tab.id, {name: 'enable', url: tab.url});
		chrome.pageAction.setIcon({path: "img/Chrome/enabled.png", tabId: tab.id});
	} else {
		chrome.tabs.sendMessage(tab.id, {name: 'disable', url: tab.url});
		chrome.pageAction.setIcon({path: "img/Chrome/disabled.png", tabId: tab.id});
	}
	chrome.pageAction.show(tab.id);
}

chrome.pageAction.onClicked.addListener(function(tab){
	var host = HOST_REGEX.exec(tab.url)[1];
	
	if (getEnabled(tab)) {
		localStorage[host] = "off";
	} else {
		delete localStorage[host];
	}
	
	enableOrDisableTab( tab );
});

chrome.tabs.onActivated.addListener( function( activeInfo ) {
	activeTabId = activeInfo.tabId || activeInfo.tabIds[0];
	chrome.tabs.get( activeTabId, function(tab) {
		if ( tab.url.substring(0, 4) !== 'http') {
			chrome.pageAction.hide(tab.id);
			return;
		}
		enableOrDisableTab( tab );
	})
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	enableOrDisableTab( tab );
});
