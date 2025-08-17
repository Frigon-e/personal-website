import { render, screen, within } from '@testing-library/react';
import { Welcome } from './welcome';

describe('Welcome', () => {
  it('renders the heading and resource links', () => {
    render(<Welcome />);

    // Check the heading text
    expect(
      screen.getByText(/what's next\?/i)
    ).toBeInTheDocument();

    // Check that the React Router Docs link is present with correct href
    const list = screen.getByRole('navigation');
    const link = within(list).getByRole('link', { name: /react router docs/i });
    expect(link).toHaveAttribute('href', 'https://reactrouter.com/docs');
  });

  it('renders the brand image with alt text', () => {
    render(<Welcome />);

    // Either of the light/dark images should exist with the alt text
    const imgs = screen.getAllByAltText(/react router/i);
    expect(imgs.length).toBeGreaterThan(0);
  });
});
