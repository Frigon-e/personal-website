import React from "react";
import { Link, NavLink } from "react-router";
import { ModeToggle } from "~/components/theme/mode-toggle";
import { buttonVariants } from "~/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-semibold">Ethan Frigon</Link>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `hidden sm:inline-flex px-3 py-2 rounded-md text-sm ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
              }
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume in a new tab"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
