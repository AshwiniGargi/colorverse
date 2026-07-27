import { describe, expect, it } from "vitest";
import { routes } from "@/constants/routes";

describe("routes", () => {
  it("uses the approved colouring-page route prefix", () => {
    expect(routes.coloring).toBe("/coloring");
  });
});
