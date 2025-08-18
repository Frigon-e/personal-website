export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t ">
      <div
        className="container mx-auto flex h-12 items-center justify-between px-4 text-xs sm:text-sm">
        <div className="opacity-90">© {year} Ethan Frigon. All rights
          reserved.
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
