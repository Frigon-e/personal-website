import '../styles/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`text-gray-300/95 bg-background h-max w-screen`}>
      <head />
      <body>{children}</body>
    </html>
  )
}
