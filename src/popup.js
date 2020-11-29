window.onload = function () {
  function updateLabel() {
    var enabled = chrome.extension.getBackgroundPage().enabled;
    if (enabled) {
      document.getElementById("toggle_button").checked = "true";
    } else {
      return false;
    }
  }
  updateLabel();
  document.getElementById("toggle_button").onclick = function () {
    var background = chrome.extension.getBackgroundPage();
    chrome.storage.sync.set(
      { EnabledAllSite: !background.enabled },
      function () {
        console.log("Done!");
      }
    );
    background.enabled = !background.enabled;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
    updateLabel();
  };
};
