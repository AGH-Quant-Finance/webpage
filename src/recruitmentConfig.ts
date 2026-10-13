export type RecruitmentConfig = {
  state: "closed" | "open";
  applicationUrl: string | null;
};

// Supplied by the society; publication/respondent access still needs launch verification.
// A saved respondent URL does not open recruitment or expose an application link.
export const recruitmentConfig: RecruitmentConfig = {
  state: "closed",
  applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSej9QB3LeBTa2dCFedgb-AirSSzWYmJh1WDehHt5PF9sTYo3w/viewform",
};

// An incomplete or invalid configuration keeps the existing How to Join flow.
export function getApplicationUrl(config: RecruitmentConfig): string | null {
  if (config.state !== "open" || !config.applicationUrl) return null;
  try {
    const url = new URL(config.applicationUrl);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    const isShortForm = url.hostname === "forms.gle" && /^\/[\w-]+\/?$/.test(url.pathname);
    const isResponseForm = url.hostname === "docs.google.com"
      && /^\/forms\/d\/(?:e\/)?[\w-]+\/viewform\/?$/.test(url.pathname);
    return isShortForm || isResponseForm ? url.href : null;
  } catch {
    return null;
  }
}
