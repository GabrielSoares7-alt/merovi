/**
 * Resolves to the real production domain once one is set in Vercel's
 * Project Settings > Domains, and to the *.vercel.app URL before that —
 * VERCEL_PROJECT_PRODUCTION_URL tracks whichever is currently assigned, so
 * metadata/sitemap/robots never point at a domain that isn't live yet.
 */
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = productionHost
  ? `https://${productionHost}`
  : "http://localhost:3000";
