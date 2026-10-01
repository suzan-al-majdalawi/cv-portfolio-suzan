import { describe, it, expect } from "vitest";
import { profileData } from "../data";

describe("Profile data", () => {
  it("ska ha ett namn", () => {
    expect(profileData.name).toBeTruthy();
  });

  it("ska ha en email", () => {
    expect(profileData.contact.email).toBeTruthy();
  });
});