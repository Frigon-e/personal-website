import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import ProjectsPage from "./projects";
import { projects, workExperiences, education } from "~/data/site-data";

function renderProjects() {
  const router = createMemoryRouter([
    {
      id: "root",
      path: "/",
      loader: () => ({ projects, workExperiences, education }),
      children: [
        {
          id: "routes/projects",
          path: "/projects",
          element: <ProjectsPage />,
        },
      ],
    },
  ], {
    initialEntries: ["/projects"],
  });

  return render(<RouterProvider router={router} />);
}

describe("ProjectsPage", () => {
  it("renders projects and thumbnails", async () => {
    renderProjects();
    expect(await screen.findByRole("heading", { name: /projects/i })).toBeInTheDocument();
    // At least the first project's name should render
    expect(screen.getByText(projects[0].name)).toBeInTheDocument();

    // Thumbnails should exist for the first project
    const thumb = screen.getAllByRole("img", { name: new RegExp(`${projects[0].name} screenshot`, "i") })[0];
    expect(thumb).toBeInTheDocument();
  });

  it("opens lightbox on image click and supports navigation + close", async () => {
    const user = userEvent.setup();
    renderProjects();

    // Click the first image of the first project
    const openBtns = await screen.findAllByRole("button", { name: new RegExp(`Open ${projects[0].name} image 1`, "i") });
    await user.click(openBtns[0]);

    // Lightbox dialog should appear
    const dialog = await screen.findByRole("dialog", { name: new RegExp(`${projects[0].name} images`, "i") });
    expect(dialog).toBeInTheDocument();

    // If multiple images exist, Next should work
    const total = projects[0].photos.length;
    if (total > 1) {
      const nextBtn = screen.getByRole("button", { name: /next image/i });
      await user.click(nextBtn);
    }

    // Close with Escape
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /images/i })).not.toBeInTheDocument();
  });
});
