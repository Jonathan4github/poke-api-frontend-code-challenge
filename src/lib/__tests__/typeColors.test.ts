import { getTypeColors, typeHexColors } from "@/lib/typeColors";

describe("getTypeColors", () => {
  it("returns correct classes for a known type", () => {
    const colors = getTypeColors("fire");
    expect(colors.bg).toBe("bg-orange-500");
    expect(colors.text).toBe("text-white");
    expect(colors.border).toBe("border-orange-600");
  });

  it("returns correct classes for electric type", () => {
    const colors = getTypeColors("electric");
    expect(colors.bg).toBe("bg-yellow-400");
    expect(colors.text).toBe("text-yellow-900");
  });

  it("falls back to gray for an unknown type", () => {
    const colors = getTypeColors("faketype");
    expect(colors.bg).toBe("bg-gray-400");
    expect(colors.text).toBe("text-white");
    expect(colors.border).toBe("border-gray-500");
  });

  it("returns the unknown entry for 'unknown'", () => {
    const colors = getTypeColors("unknown");
    expect(colors.bg).toBe("bg-gray-300");
  });
});

describe("typeHexColors", () => {
  const hexRegex = /^#[0-9a-fA-F]{6}$/;

  it("has a valid hex colour for every entry", () => {
    Object.entries(typeHexColors).forEach(([type, hex]) => {
      expect(hex).toMatch(hexRegex);
    });
  });

  it("includes the main 18 types", () => {
    const mainTypes = [
      "normal", "fire", "water", "grass", "electric", "ice",
      "fighting", "poison", "ground", "flying", "psychic", "bug",
      "rock", "ghost", "dark", "dragon", "steel", "fairy",
    ];
    mainTypes.forEach((type) => {
      expect(typeHexColors).toHaveProperty(type);
    });
  });

  it("fire is orange-ish (#F08030)", () => {
    expect(typeHexColors["fire"]).toBe("#F08030");
  });

  it("water is blue-ish (#6890F0)", () => {
    expect(typeHexColors["water"]).toBe("#6890F0");
  });
});