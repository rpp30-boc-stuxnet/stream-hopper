import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main app div', () => {
  render(<App />);
  const mainAppDiv = screen.getByTestId('main-app-div');
  expect(mainAppDiv).toBeInTheDocument();
});
