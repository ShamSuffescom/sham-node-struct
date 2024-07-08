// tokenUtils.js

// Example: Assume you have a database or cache to store invalidated tokens
let invalidatedTokens = new Set();

// Function to blacklist a token
const blacklistToken = (token) => {
  invalidatedTokens.add(token); // Add token to invalidated tokens store
};

// Function to check if a token is blacklisted
const isTokenBlacklisted = (token) => {
  return invalidatedTokens.has(token); // Check if token exists in invalidated tokens store
};

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
