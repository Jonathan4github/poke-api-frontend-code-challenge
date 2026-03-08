import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BackButton } from "@/components/BackButton";

const mockBack = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: mockBack }),
}));

beforeEach(() => mockBack.mockClear());

describe("BackButton", () => {
  it("renders with default label", () => {
    render(<BackButton />);
    expect(screen.getByRole("button", { name: "← Back" })).toBeInTheDocument();
  });

  it("renders with a custom label", () => {
    render(<BackButton label="← Go back" />);
    expect(screen.getByRole("button", { name: "← Go back" })).toBeInTheDocument();
  });

  it("calls router.back() when clicked", async () => {
    const user = userEvent.setup();
    render(<BackButton />);
    await user.click(screen.getByRole("button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});