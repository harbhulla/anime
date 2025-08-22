import './globals.css'

export const metadata = {
  title: 'Next Auth App',
  description: 'Authentication with NextJS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}