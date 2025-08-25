import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import AppHeader from "./components/AppHeader";
export const metadata = {
  title: "AnimeVault",
  description: "Anime Database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppHeader />
          <div className="flex flex-col min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
