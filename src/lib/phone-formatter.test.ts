import { describe, it, expect } from "vitest"
import { formatPhoneNumber } from "./phone-formatter"

describe("formatPhoneNumber", () => {
  describe("empty and invalid inputs", () => {
    it("should return empty string for empty input", () => {
      expect(formatPhoneNumber("")).toBe("")
    })

    it("should return original string for non-numeric input", () => {
      expect(formatPhoneNumber("abc")).toBe("abc")
    })

    it("should return original string for invalid format", () => {
      expect(formatPhoneNumber("123")).toBe("123")
    })
  })

  describe("10-digit numbers", () => {
    it("should format 10-digit number correctly", () => {
      expect(formatPhoneNumber("9398263414")).toBe("93 98 263 414")
    })

    it("should format 10-digit number with spaces", () => {
      expect(formatPhoneNumber("93 98 263 414")).toBe("93 98 263 414")
    })

    it("should format 10-digit number with dashes", () => {
      expect(formatPhoneNumber("939-826-3414")).toBe("93 98 263 414")
    })

    it("should format 10-digit number with parentheses", () => {
      expect(formatPhoneNumber("(939)8263414")).toBe("93 98 263 414")
    })
  })

  describe("numbers with +91 country code", () => {
    it("should format number starting with +91 correctly", () => {
      expect(formatPhoneNumber("+919398263414")).toBe("+91 93 98 263 414")
    })

    it("should format number with +91 and spaces", () => {
      expect(formatPhoneNumber("+91 9398263414")).toBe("+91 93 98 263 414")
    })

    it("should format number with +91 and dashes", () => {
      expect(formatPhoneNumber("+91-939-826-3414")).toBe("+91 93 98 263 414")
    })

    it("should handle +91 with non-10-digit number", () => {
      expect(formatPhoneNumber("+91123")).toBe("+91 123")
    })

    it("should handle +91 with more than 10 digits", () => {
      expect(formatPhoneNumber("+91939826341456")).toBe("+91 939826341456")
    })
  })

  describe("numbers with 91 country code (without +)", () => {
    it("should format 12-digit number starting with 91 correctly", () => {
      expect(formatPhoneNumber("919398263414")).toBe("91 93 98 263 414")
    })

    it("should format 91 with spaces", () => {
      expect(formatPhoneNumber("91 9398263414")).toBe("91 93 98 263 414")
    })

    it("should not format 91 if not exactly 12 digits", () => {
      expect(formatPhoneNumber("91123")).toBe("91123")
    })
  })

  describe("edge cases", () => {
    it("should handle mixed separators", () => {
      expect(formatPhoneNumber("+91 (939) 826-3414")).toBe("+91 93 98 263 414")
    })

    it("should return original for non-standard formats", () => {
      expect(formatPhoneNumber("+1-555-123-4567")).toBe("+1-555-123-4567")
    })

    it("should handle very long numbers", () => {
      expect(formatPhoneNumber("12345678901234567890")).toBe("12345678901234567890")
    })
  })
})

