import '../styles/globals.css';
import NavBar from "../components/NavBar";
import { Container } from "../components/Container";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`text-gray-300/95`}>
      <body>
        <div className="fixed inset-0 flex justify-center bg-black sm:px-8 z-0">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-zinc-900 ring-1 ring-zinc-300/20" />
          </div>
        </div>
          <Container >
        <NavBar />
        <main>
            {children}
        </main>
          </Container>
      </body>
    </html>
  )
}
