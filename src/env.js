// Minimal env config — portfolio has no server-side secrets
export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
