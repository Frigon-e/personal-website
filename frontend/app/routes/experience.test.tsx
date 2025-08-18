import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import ExperiencePage from "./experience";
import { projects, workExperiences, education } from "~/data/site-data";

function renderExperience() {
  const router = createMemoryRouter([
    {
      id: "root",
      path: "/",
      loader: () => ({ projects, workExperiences, education }),
      children: [
        {
          id: "routes/experience",
          path: "/experience",
          element: <ExperiencePage />,
        },
      ],
    },
  ], {
    initialEntries: ["/experience"],
  });

  return render(<RouterProvider router={router} />);
}

describe("ExperiencePage", () => {
  it("renders experience list items from loader data", async () => {
    renderExperience();

    expect(await screen.findByRole("heading", { name: /work experience/i })).toBeInTheDocument();

    for (const exp of workExperiences) {
      expect(screen.getByText(exp.title)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
      expect(screen.getByText(exp.duration)).toBeInTheDocument();
    }
  });
});
