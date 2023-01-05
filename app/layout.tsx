import '../styles/globals.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html className={`text-gray-300/95 h-max w-screen`}>
        <body>
        <div className="fixed inset-0 flex justify-center sm:px-8 bg-black">
            <div className="flex w-full max-w-7xl lg:px-8">
                <div className="w-full ring-1 bg-zinc-900 ring-zinc-300/20" />
            </div>
        </div>
        <div className="relative">
            {children}
        </div>
        </body>

        </html>
    )
}
