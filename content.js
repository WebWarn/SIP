// content.js

// code to check if the current page is safe
const isSafe = checkSafety(); // Implement your safety check logic here

// Send a message to background.js to set the badge
chrome.runtime.sendMessage({ action: isSafe ? 'set_go' : 'set_stop' });

function checkSafety() {
  // is this page safe.
  // return true for safe and false for unsafe.
}
// content.js

// function code to check for typosquatting.
function isTyposquatting(currentHostname, maliciousDomains) {
    for (const maliciousDomain of maliciousDomains) {
      if (isSimilar(currentHostname, maliciousDomain)) {
        return true;
      }
    }
    return false;
  }
  
  // Function to check similarity between two domains.
function isSimilar(domainA, domainB) {
    // typosquatting similarity. 
    // comparing domain strings for similarity.
    // distance between the two domains is within a certain threshold.
    const threshold = 2; // Adjust this threshold as needed
    const distance = calculateLevenshteinDistance(domainA, domainB);
    return distance <= threshold;
  }
  
  // Function to calculate Levenshtein distance between two strings.
  function calculateLevenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
  
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
  
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
  
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }
  
    return matrix[b.length][a.length];
  }
  
  // List of potentially malicious domains (typosquatting examples).
  const maliciousDomains = [
    "goggle.com",
    "faecbook.com",
    "lnstagram.com",
    "twtter.com",
    "yahhoo.com",
    "wikipeda.org",
    "reddlt.com",
    "stackoveflow.com",
    "amazoon.com",
    "outlookk.com",
    "gihub.com",
    "lncodepen.io",
    "msnnews.com",
    "tumbler.com",
    "googgle.com"
    
  ];
  
  // Check if the current page's domain is typosquatting.
  const currentHostname = window.location.hostname;
  if (isTyposquatting(currentHostname, maliciousDomains)) {
    // Implement your action here (e.g., display a warning).
    console.warn(`Possible typosquatting: ${currentHostname}`);
  }