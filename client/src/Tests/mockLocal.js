var localStorageMock = (function() {
  return {userEmail: 'testUser@gmail.com'}
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });