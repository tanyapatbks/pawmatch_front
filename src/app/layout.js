import './globals.css'

export const metadata = {
  title: 'WebPawMatch',
  description: 'Find your perfect pet match',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}