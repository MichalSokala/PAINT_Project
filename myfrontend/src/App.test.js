import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Task Manager title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Task Manager/i);
  expect(titleElement).toBeInTheDocument();
});

