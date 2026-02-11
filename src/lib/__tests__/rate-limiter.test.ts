import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { isRateLimited } from "../rate-limiter";

describe("isRateLimited", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to 10 requests per minute", () => {
    for (let i = 0; i < 10; i++) {
      expect(isRateLimited("1.2.3.4")).toBe(false);
    }
  });

  it("blocks the 11th request in the same window", () => {
    for (let i = 0; i < 10; i++) {
      isRateLimited("5.6.7.8");
    }
    expect(isRateLimited("5.6.7.8")).toBe(true);
  });

  it("resets after the window expires", () => {
    for (let i = 0; i < 10; i++) {
      isRateLimited("9.0.1.2");
    }
    expect(isRateLimited("9.0.1.2")).toBe(true);

    // Advance past the 1-minute window
    vi.advanceTimersByTime(61_000);

    expect(isRateLimited("9.0.1.2")).toBe(false);
  });

  it("tracks IPs independently", () => {
    for (let i = 0; i < 10; i++) {
      isRateLimited("ip-a");
    }
    expect(isRateLimited("ip-a")).toBe(true);
    expect(isRateLimited("ip-b")).toBe(false);
  });
});
