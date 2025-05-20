let isListening = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startListening") {
    isListening = true;
    chrome.storage.local.set({ exerciseId: message.exerciseId });
    sendResponse({ status: "started", exerciseId: message.exerciseId });
  } else if (message.action === "stopListening") {
    isListening = false;
    chrome.storage.local.remove(["exerciseId"]);
    sendResponse({ status: "stopped", exerciseId: message.exerciseId });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!isListening) return;

  if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
  }
});
