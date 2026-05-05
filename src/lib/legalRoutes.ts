export const legalRoutePaths = {
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  "acceptable-use": "/acceptable-use-policy",
} as const;

export type LegalPageType = keyof typeof legalRoutePaths;

export function isLegalPageType(value: string): value is LegalPageType {
  return Object.prototype.hasOwnProperty.call(legalRoutePaths, value);
}
