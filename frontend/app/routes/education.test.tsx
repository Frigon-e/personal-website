import { render, screen } from "@testing-library/react";
import EducationPage from "./education";

// Education route is currently static and does not use loader data.

describe("EducationPage", () => {
  it("renders the education heading and card", () => {
    render(<EducationPage />);
    expect(screen.getByRole("heading", { name: /education/i })).toBeInTheDocument();
    expect(screen.getByText(/b\.s\./i)).toBeInTheDocument();
  });
});
