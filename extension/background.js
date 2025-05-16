// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
//     chrome.scripting.executeScript({
//       target: { tabId },
//       files: ["content.js"],
//     });
//   }
// });

let isListening = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startListening") {
    isListening = true;
    sendResponse({ status: "started" });
  } else if (message.action === "stopListening") {
    isListening = false;
    sendResponse({ status: "stopped" });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!isListening) return;

  if (changeInfo.status === "complete" && tab.url.startsWith("http")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
});
