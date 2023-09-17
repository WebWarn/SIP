// background.js

// Function to set the badge text and color
function setBadge(status) {
  if (status === 'go') {
    chrome.browserAction.setBadgeText({ text: 'GO' });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'green' });
  } else if (status === 'stop') {
    chrome.browserAction.setBadgeText({ text: 'STOP' });
    chrome.browserAction.setBadgeBackgroundColor({ color: 'red' });
  } else {
    // Clear the badge if needed
    chrome.browserAction.setBadgeText({ text: '' });
  }
}

// Example: Set the badge to "go"
setBadge('go');