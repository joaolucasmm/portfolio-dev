import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Title', () => {
  render(<App />);
  const title = screen.getByRole("heading", { level: 1, name: /João Lucas/ });
  expect(title).toBeInTheDocument();
});
