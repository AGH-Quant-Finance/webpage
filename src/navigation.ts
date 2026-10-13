export function navigationItems(isProjectsPage: boolean) {
  const home = isProjectsPage ? "/" : "";
  return [
    { href: `${home}#paths`, key: "paths" },
    { href: "/projects", key: "projects" },
    { href: `${home}#approach`, key: "approach" },
    { href: `${home}#community`, key: "community" },
    { href: `${home}#recruitment`, key: "recruitment" },
  ] as const;
}
