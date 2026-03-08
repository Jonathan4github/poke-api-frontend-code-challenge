import { render, screen } from "@testing-library/react";
import { StatBar } from "@/components/StatBar";

describe("StatBar", () => {
  it("displays the correct label for 'hp'", () => {
    render(<StatBar name="hp" value={45} />);
    expect(screen.getByText("HP")).toBeInTheDocument();
  });

  it("displays 'SP.ATK' for 'special-attack'", () => {
    render(<StatBar name="special-attack" value={65} />);
    expect(screen.getByText("SP.ATK")).toBeInTheDocument();
  });

  it("displays 'SP.DEF' for 'special-defense'", () => {
    render(<StatBar name="special-defense" value={65} />);
    expect(screen.getByText("SP.DEF")).toBeInTheDocument();
  });

  it("falls back to the raw stat name when not in STAT_LABELS", () => {
    render(<StatBar name="unknown-stat" value={50} />);
    expect(screen.getByText("unknown-stat")).toBeInTheDocument();
  });

  it("renders the numeric stat value", () => {
    render(<StatBar name="attack" value={84} />);
    expect(screen.getByText("84")).toBeInTheDocument();
  });

  it("calculates bar width correctly (100/255 ≈ 39%)", () => {
    const { container } = render(<StatBar name="hp" value={100} />);
    const bar = container.querySelector("[style]") as HTMLElement;
    expect(bar.style.width).toBe("39%");
  });

  it("caps bar width at 100% when value exceeds max", () => {
    const { container } = render(<StatBar name="hp" value={300} max={255} />);
    const bar = container.querySelector("[style]") as HTMLElement;
    expect(bar.style.width).toBe("100%");
  });

  it("uses a custom max value when provided", () => {
    const { container } = render(<StatBar name="hp" value={50} max={100} />);
    const bar = container.querySelector("[style]") as HTMLElement;
    expect(bar.style.width).toBe("50%");
  });

  it("applies the correct color class for 'attack'", () => {
    const { container } = render(<StatBar name="attack" value={80} />);
    const bar = container.querySelector(".bg-orange-400");
    expect(bar).toBeInTheDocument();
  });

  it("applies the correct color class for 'speed'", () => {
    const { container } = render(<StatBar name="speed" value={80} />);
    const bar = container.querySelector(".bg-pink-400");
    expect(bar).toBeInTheDocument();
  });

  it("falls back to bg-gray-400 for unknown stat name", () => {
    const { container } = render(<StatBar name="mystery-stat" value={50} />);
    const bar = container.querySelector(".bg-gray-400");
    expect(bar).toBeInTheDocument();
  });
});
