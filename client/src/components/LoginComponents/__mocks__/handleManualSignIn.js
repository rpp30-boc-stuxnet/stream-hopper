export default jest.fn((e) => {
  console.log('pretending to handle sign in');
  e.preventDefault();
});