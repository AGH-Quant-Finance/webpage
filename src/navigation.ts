export function navigationItems(isProjectsPage: boolean) {
  const home = isProjectsPage ? "/" : "";
  return [
    { href: `${home}#paths`, key: "paths" },
    { href: `${home}#approach`, key: "approach" },
    { href: `${home}#community`, key: "community" },
    { href: "/projects", key: "projects" },
  ] as const;
}

export function recruitmentHref(isProjectsPage: boolean) {
  return isProjectsPage ? "/#recruitment" : "#recruitment";
}
