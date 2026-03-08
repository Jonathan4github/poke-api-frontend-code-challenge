import { render, screen } from "@testing-library/react";
import { TypeBadge } from "@/components/TypeBadge";

describe("TypeBadge", () => {
  it("renders the type name", () => {
    render(<TypeBadge type="fire" />);
    expect(screen.getByText("fire")).toBeInTheDocument();
  });

  it("renders a <span> when linkable is false (default)", () => {
    render(<TypeBadge type="water" />);
    const el = screen.getByText("water");
    expect(el.tagName).toBe("SPAN");
  });

  it("renders an <a> link when linkable is true", () => {
    render(<TypeBadge type="grass" linkable />);
    const link = screen.getByRole("link", { name: "grass" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/type/grass");
  });

  it("applies type-specific color classes from getTypeColors", () => {
    render(<TypeBadge type="electric" />);
    const el = screen.getByText("electric");
    expect(el.className).toContain("bg-yellow-400");
    expect(el.className).toContain("text-yellow-900");
  });
});
