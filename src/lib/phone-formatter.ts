/**
 * Phone Number Formatter
 * Formats phone numbers into readable style with spaces
 */

/**
 * Formats a phone number into readable style
 * @param phone - Phone number string (can include +, spaces, dashes, etc.)
 * @returns Formatted phone number with spaces
 * 
 * Examples:
 * - "9398263414" -> "93 98 263 414"
 * - "+919398263414" -> "+91 93 98 263 414"
 * - "+91 9398263414" -> "+91 93 98 263 414"
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return phone

  // Remove all spaces, dashes, and parentheses to get clean number
  const cleaned = phone.replace(/[\s\-()]/g, "")

  // Check if it starts with +91 (India country code)
  if (cleaned.startsWith("+91")) {
    const withoutCountryCode = cleaned.slice(3) // Remove +91
    if (withoutCountryCode.length === 10) {
      // Format as: +91 XX XX XXX XXX
      return `+91 ${withoutCountryCode.slice(0, 2)} ${withoutCountryCode.slice(2, 4)} ${withoutCountryCode.slice(4, 7)} ${withoutCountryCode.slice(7)}`
    }
    // If not exactly 10 digits after +91, return with space after country code
    return `+91 ${withoutCountryCode}`
  }

  // Check if it starts with 91 (without +)
  if (cleaned.startsWith("91") && cleaned.length === 12) {
    const withoutCountryCode = cleaned.slice(2)
    // Format as: 91 XX XX XXX XXX
    return `91 ${withoutCountryCode.slice(0, 2)} ${withoutCountryCode.slice(2, 4)} ${withoutCountryCode.slice(4, 7)} ${withoutCountryCode.slice(7)}`
  }

  // For 10-digit numbers, format as: XX XX XXX XXX
  if (cleaned.length === 10 && /^\d+$/.test(cleaned)) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
  }

  // For other formats, return as is (or with minimal formatting)
  return phone
}

