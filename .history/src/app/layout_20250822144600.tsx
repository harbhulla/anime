import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider"; // if you create one

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
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
