// Callback on opening extension popup
window.onload = get();

// Listner for 'Disable' button click
const disableBtn = document.getElementById("disableBtn");
disableBtn.addEventListener("click",() =>{    
		disable();
});

// Listner for 'Enable' button click
const	enableBtn = document.getElementById("enableBtn");
enableBtn.addEventListener("click",() =>{    
		enable();
});

// 'Enabled' chekbox
const enabled = document.getElementById("enabled");

// Icon in the popup
const iconPopup = document.getElementById("icon");

// Enable proxy
function enable() {
	enabled.checked = true;
	apply();
	icoOn();
}

// Disable proxy
function disable() {
	enabled.checked = false;
	apply();
	icoOff();
}

// Apply proxy settings
function apply() {
	if (enabled.checked == true) {
		let proxyHost = document.getElementById("proxyHost").value;
		let proxyPort = document.getElementById("proxyPort").value;
		let passthrough = document.getElementById("passthrough").value;
		let config = {
			mode: "fixed_servers",
			rules: {
				singleProxy: {
					host: proxyHost,
					port: Number(proxyPort)
				},
			bypassList: [passthrough]
			}
		};
		chrome.proxy.settings.set(
			{value: config, scope: 'regular'},
			function() {}
		);
		localStorage.setItem("proxyHost", proxyHost);
		localStorage.setItem("proxyPort", proxyPort);
		localStorage.setItem("passthrough", passthrough);
	} else {
		let config = {
			mode: "system"
		};
		chrome.proxy.settings.set(
			{value: config, scope: 'regular'},
			function() {}
		);
	}
}

// Show current settings JSON
function show() {
	chrome.proxy.settings.get(
		{'incognito': false},
		function(config) {
			alert(JSON.stringify(config));
		}
	);
}

// Initial settings check and popup configuration
function get() {
	chrome.proxy.settings.get(
		{'incognito': false},
		function(config) {
			if (config.value.mode == "system") {
				enabled.checked = false;
				icoOff();
			} else if (config.value.mode == "fixed_servers") {
				enabled.checked = true;
				icoOn();
			}
		}
	);
	if (localStorage.getItem("proxyHost") != null
		&& localStorage.getItem("proxyPort") != null) {
		let proxyHost = document.getElementById("proxyHost");
		let proxyPort = document.getElementById("proxyPort");
		let passthrough = document.getElementById("passthrough");
		proxyHost.value = localStorage.getItem("proxyHost");
		proxyPort.value = localStorage.getItem("proxyPort");
		passthrough.value = localStorage.getItem("passthrough");
	}
}

// Set icons to enabled state
function icoOn() {
	chrome.action.setIcon({path:iconsOn});
	iconPopup.src = "images/on/icon-48.png";
}

// Set icons to disabled state
function icoOff() {
	chrome.action.setIcon({path:iconsOff});
	iconPopup.src = "images/icon-48.png"
}

// Icons path object for enabled state
iconsOn = {
	"16":"images/on/icon-16.png",
	"32":"images/on/icon-32.png",
	"48":"images/on/icon-48.png",
	"128":"images/on/icon-128.png"
}

// Icons path object for disabled state
iconsOff = {
	"16":"images/icon-16.png",
	"32":"images/icon-32.png",
	"48":"images/icon-48.png",
	"128":"images/icon-128.png"
}
