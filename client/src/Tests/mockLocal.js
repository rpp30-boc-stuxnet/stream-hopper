var localStorageMock = (function() {
  return {userEmail: 'testUser@gmail.com'}
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// "jest": {
//   "setupFilesAfterEnv": ["./src/Tests/mockLocal.js"],
//   "testEnvironment": "jsdom"
// },