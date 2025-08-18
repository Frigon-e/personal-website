import { useRouteLoaderData } from "react-router";
import type { SiteData } from "~/data/site-data";

export function useSiteData(): SiteData {
  // This hook expects to be used under the root route. In tests or cases without a router,
  // this will throw. Tests should render with a RouterProvider. For safety, we coerce type.
  const data = useRouteLoaderData("root") as Partial<SiteData> | undefined;
  // Merge with sane defaults so tests or pages that don't provide all fields still work
  return { projects: [], workExperiences: [], education: [], ...(data ?? {}) } as SiteData;
}
