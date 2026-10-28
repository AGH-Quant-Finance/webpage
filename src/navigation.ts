export function navigationItems(isProjectsPage: boolean) {
  const home = isProjectsPage ? "/" : "";
  return [
    { href: `${home}#paths`, key: "paths" },
    { href: `${home}#approach`, key: "approach" },
    { href: `${home}#community`, key: "community" },
    { href: "/projects", key: "projects" },
  ] as const;
}

export const applicationUrl = "https://forms.gle/9hbMR9nEBuQKZyLo7";
