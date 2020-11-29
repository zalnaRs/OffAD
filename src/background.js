var enabled = true;

chrome.storage.sync.get(["EnabledAllSite"], function (items) {
  enabled = items[1];
});

chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    if (enabled) {
      console.log("blocking:", details.url);
    }
    return { cancel: enabled };
  },
  { urls: blocked_domains },
  ["blocking"]
);
