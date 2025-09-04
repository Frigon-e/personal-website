import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { ThemeProvider } from "~/components/theme/theme-provider";
import { Navbar } from "~/components/navbar";
import { Footer } from "~/components/footer";
import type { Route } from "./+types/root";
import "./app.css";
import { projects, workExperiences, education } from "~/data/site-data";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  // { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

function parseCookieTheme(cookieHeader?: string | null): 'light' | 'dark' | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/(?:^|; )theme=(light|dark)/);
  return match ? (match[1] as 'light' | 'dark') : null;
}

export async function loader({ request }: Route.LoaderArgs) {
  const initialTheme = parseCookieTheme(request.headers.get('cookie')) ?? null;
  return { projects, workExperiences, education, initialTheme };
}

export function Layout({children}: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const theme = data?.initialTheme ?? null;
  const isDark = theme ? theme === 'dark' : true;
  return (
    <html lang="en" className={isDark ? 'dark' : undefined} style={{ colorScheme: isDark ? 'dark' as const : 'light' as const }}>
    <head>
      <title>Ethan Frigon — Portfolio</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="color-scheme" content="dark light" />
      {/* Cloudflare Web Analytics */}
      <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "4868f31dad78404e841415c4984c2fa1"}'></script>
      {/* End Cloudflare Web Analytics */}
      <Meta/>
      <Links/>
    </head>
    <body>
    {children}
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </ThemeProvider>
  );
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
