import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "@/components/Pagination";

const noop = () => {};

describe("Pagination", () => {
  it("renders nothing when totalPages is 1", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={noop} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders all page buttons when totalPages ≤ 7", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={noop} />);
    [1, 2, 3, 4, 5].forEach((n) => {
      expect(screen.getByRole("button", { name: String(n) })).toBeInTheDocument();
    });
  });

  it("renders ellipsis for large page ranges", () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={noop} />);
    const ellipses = screen.getAllByText("…");
    expect(ellipses.length).toBeGreaterThanOrEqual(1);
  });

  it("always shows first and last page buttons", () => {
    render(<Pagination currentPage={5} totalPages={10} onPageChange={noop} />);
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "10" })).toBeInTheDocument();
  });

  it("marks the current page with aria-current='page'", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={noop} />);
    const active = screen.getByRole("button", { name: "3" });
    expect(active).toHaveAttribute("aria-current", "page");
  });

  it("other pages do not have aria-current", () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={noop} />);
    const inactive = screen.getByRole("button", { name: "1" });
    expect(inactive).not.toHaveAttribute("aria-current");
  });

  it("disables Prev button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={noop} />);
    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={noop} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  it("calls onPageChange with correct page when a page button is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with currentPage+1 when Next is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with currentPage-1 when Prev is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    render(<Pagination currentPage={4} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByRole("button", { name: /prev/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
