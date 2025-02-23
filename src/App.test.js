import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders presentation', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello, I am João Lucas/i);
  expect(linkElement).toBeInTheDocument();
});
