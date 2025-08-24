import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider";
import { ModeToggle } from "./components/ModeToggle";

export const metadata = {
  title: "Next Auth App",
  description: "Authentication with NextJS",
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
          <div className="flex justify-end p-4">
            <ModeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
