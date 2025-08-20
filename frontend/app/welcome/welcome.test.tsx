import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { Welcome } from './welcome';
import { projects, workExperiences } from "~/data/site-data";

function renderWithRouter(ui: React.ReactElement) {
  const router = createMemoryRouter([
    {
      id: 'root',
      path: '/',
      loader: () => ({ projects, workExperiences }),
      element: ui,
    },
  ]);
  return render(<RouterProvider router={router} />);
}

describe('Welcome', () => {
  it('renders main sections', async () => {
    renderWithRouter(<Welcome />);
    expect(await screen.findByText(/Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/featured\s+projects/i)).toBeInTheDocument();
    expect(screen.getByText(/work experience/i)).toBeInTheDocument();
  });

  it('renders some skills', async () => {
    renderWithRouter(<Welcome />);
    expect(await screen.findByText(/TypeScript/i)).toBeInTheDocument();
  });
});
