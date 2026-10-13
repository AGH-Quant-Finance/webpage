export type RecruitmentConfig = {
  state: "closed" | "open";
  applicationUrl: string | null;
};

// Open only after Board approval and verification of the public respondent URL.
export const recruitmentConfig: RecruitmentConfig = {
  state: "closed",
  applicationUrl: null,
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
