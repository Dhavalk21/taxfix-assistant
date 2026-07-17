import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "AI Tax Assistant — Taxfix Case Study",
  description: "Prototype AI assistant for self-employed Taxfix users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
  async
  src="https://plausible.io/js/pa-XSwOZG_uvP6r4Ss0e_Khe.js"
  strategy="afterInteractive"
/>
<Script
  id="plausible-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
  }}
/>
      </head>
      <body>{children}</body>
    </html>
  );
}
