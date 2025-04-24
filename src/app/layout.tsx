import './globals.css'

export const metadata = {
  title: 'AI Image Classifier',
  description: 'Classify your images using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins">{children}</body>
    </html>
  )
}