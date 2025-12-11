Project Development Guidelines

Audience: Advanced contributors to this repository. This document captures project-specific build, configuration, testing, and development notes that are not obvious unless you’ve explored the codebase.

1. Build and Configuration
- Frontend (React Router + Vite, TypeScript)
  - Package manager: npm (lockfile present)
  - Node runtime: Node 20 (see frontend/Dockerfile)
  - Scripts (frontend/package.json):
    - npm run dev: Development with HMR via react-router dev (default port 5173)
    - npm run build: Production build via react-router build (outputs build/client and build/server)
    - npm start: Starts @react-router/serve serving build/server/index.js on port 3000
    - npm run typecheck: Runs react-router typegen and tsc (this generates .react-router/types)
  - Vite configuration (frontend/vite.config.ts):
    - Plugins: tailwindcss, tsconfigPaths; reactRouter plugin is skipped in test mode (mode === 'test')
    - Path aliases: ~/* -> frontend/app/* (see tsconfig.json)
    - Tailwind: Tailwind CSS 4 via @tailwindcss/vite
  - SSR and routing
    - This template uses React Router’s SSR. Build produces server and client bundles.
    - If you create route modules with loaders/actions, the build and serve flow is already configured in the scripts above.
  - Docker (frontend/Dockerfile)
    - Multi-stage build using Node 20 on Alpine
    - Installs dev deps, builds, rehydrates production node_modules (omit=dev), then runs npm start in final image
    - Exposes service at port 3000 by default
  - React Router Type Generation
    - npm run typecheck runs react-router typegen and tsc. If you add new routes, run this to update .react-router/types and keep TS happy.

- Backend (Go, Gin)
  - Files under server/golang/ include a Gin API entrypoint (api_runner.go) and game modules (tictactoe, battleship)
  - Current state: There is no go.mod in this repository. Imports use paths like "server/golang/tictactoe" which presumes GOPATH-style layout or a future module name matching the repository path.
  - If you plan to work on the Go server:
    - Initialize a module at the repo root or at server/golang with an appropriate module name, and update imports accordingly (or use a replace directive). Example:
      - cd server/golang
      - go mod init personal-website/server/golang
      - Adjust imports to module-relative paths (e.g., personal-website/server/golang/tictactoe)
    - Dependencies: api_runner.go uses github.com/gin-gonic/gin and github.com/gin-contrib/cors
    - Start: gin.Default() serves on :5000 in main(). Confirm CORS and endpoints /api/ttt/move/, /api/bs/move/, /api/certification/

- Docker Compose
  - No docker-compose.yml could be located by tooling in this repository. If you intend to orchestrate services, add docker-compose.yml accordingly and wire frontend (port 3000) and Go API (port 5000) as needed.

2. Testing
- Tooling
  - Test runner: Vitest (configured via frontend/vite.config.ts → test block)
  - Environment: jsdom
  - Globals: enabled (vitest/globals configured via tsconfig + Vite test config)
  - Setup: frontend/setupTests.ts imports @testing-library/jest-dom/vitest (matchers like toBeInTheDocument, etc.)
  - CSS: enabled in tests (css: true) so component-level styles don’t fail imports
  - Libraries: @testing-library/react and user-event available

- Running tests
  - All tests: cd frontend && npm test
    - Note: Running the entire suite currently yields at least one failing test (welcome.test.tsx) due to hydration/DOM assumptions in jsdom. This is not blocking unit testing flow but keep it in mind for CI or merges.
  - Filtered tests: cd frontend && npm test -- path-or-pattern
    - Example: npm test -- app/welcome/welcome.test.tsx

- Adding new tests
  - Place tests next to the code or under app/ using *.test.ts or *.test.tsx
  - For route components depending on loaders/actions, wrap with a Memory Router and provide minimal loader data. Example pattern (similar to existing tests):
    import { render } from '@testing-library/react';
    import { createMemoryRouter, RouterProvider } from 'react-router';
    const router = createMemoryRouter([{ id: 'root', path: '/', loader: () => ({/* data */}), element: <YourComponent/> }]);
    render(<RouterProvider router={router} />);
  - Use screen.findByText for async content when components fetch/load data
  - If you see "No HydrateFallback element provided" warnings in test output, they stem from SSR/hydration semantics under jsdom; they do not necessarily indicate a failing assertion but can appear in console output

- Demo test (verified locally)
  - We verified the testing setup with a simple unit test. The example below passes in this project’s configuration:
    // app/sanity.test.ts
    import { describe, it, expect } from 'vitest';
    describe('sanity', () => {
      it('adds numbers', () => {
        expect(2 + 2).toBe(4);
      });
    });
  - Run it alone: cd frontend && npm test -- app/sanity.test.ts
  - In this session, running the file above passed; running the whole suite showed one unrelated failing test. The demo file has been removed to leave the repository clean; use the snippet above when you need a quick scaffold.

- Guidelines for writing robust tests in this codebase
  - Prefer query patterns that don’t depend on SSR timing; use findBy* with appropriate timeouts
  - When testing route modules, ensure loaders return stable test data; avoid network I/O in unit tests
  - Use vitest.mock for module boundaries, and @testing-library/user-event for realistic interactions

3. Additional Development Notes
- TypeScript Configuration
  - Strict mode enabled; moduleResolution: bundler; jsx: react-jsx; verbatimModuleSyntax: true
  - Paths alias: ~/* → ./app/* (tsconfig.json). Keep this consistent when moving files/tests.
- React Router Dev/Build
  - react-router typegen produces .react-router/types for route typings; run npm run typecheck whenever routes change
  - In test mode, reactRouter plugin is disabled to avoid interference with test bundling
- Tailwind CSS
  - Tailwind 4 via @tailwindcss/vite plugin; includes css: true in test config for compatibility
- Node/Tooling Versions
  - Use Node 20+ to match Docker image; Vite 6 and Vitest 2 are in use
- Known gotchas
  - Hydration warnings in jsdom test runs may appear; they’re usually benign unless they correspond to failing assertions
  - The Go server imports are GOPATH-style; introduce a proper module name to use standard go build/test tools

Appendix: Quick Commands
- Frontend
  - Dev: cd frontend && npm run dev (http://localhost:5173)
  - Build: cd frontend && npm run build
  - Start (serve build): cd frontend && npm start (http://localhost:3000)
  - Typegen + TS: cd frontend && npm run typecheck
  - Tests (all): cd frontend && npm test
  - Tests (one file): cd frontend && npm test -- app/your.test.tsx
- Docker (frontend only)
  - Build: cd frontend && docker build -t personal-website-frontend .
  - Run: docker run -p 3000:3000 personal-website-frontend
