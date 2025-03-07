// Callback on browser startup
chrome.runtime.onStartup.addListener(get);
chrome.runtime.onInstalled.addListener(get);

// Initial settings check for status icon setup
function get() {
  chrome.proxy.settings.get(
    {'incognito': false},
    function(config) {
      if (config.value.mode == "system") {
        icoOff();
      } else if (config.value.mode == "fixed_servers") {
        icoOn();
      }
    }
  );
}

// Set icons to enabled state
function icoOn() {
  chrome.action.setIcon({path:iconsOn});
}

// Set icons to disabled state
function icoOff() {
  chrome.action.setIcon({path:iconsOff});
}

// Icons path object for enabled state
const iconsOn = {
  "16":"images/on/icon-16.png",
  "32":"images/on/icon-32.png",
  "48":"images/on/icon-48.png",
  "128":"images/on/icon-128.png"
}

// Icons path object for disabled state
const iconsOff = {
  "16":"images/icon-16.png",
  "32":"images/icon-32.png",
  "48":"images/icon-48.png",
  "128":"images/icon-128.png"
}