export const pageRoutePaths = {
  home: "/",
  resources: "/resources",
  signup: "/signup",
  getapp: "/get-the-app",
  who: "/who-needs-classy",
  why: "/why-classy",
  pricing: "/pricing",
} as const;

export type MarketingPageType = keyof typeof pageRoutePaths;

export function isMarketingPageType(value: string | null): value is MarketingPageType {
  return Object.prototype.hasOwnProperty.call(pageRoutePaths, value);
}
