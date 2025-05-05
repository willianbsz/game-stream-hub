import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import type { Metadata } from "next";
import { Providers } from "./providers";
import MainNav from "@/components/core/main-nav";

export const metadata: Metadata = {
  title: "Game Stream Hub",
  description:
    "Bem vindo ao Game Stream Hub, sua plataforma de E-Sports favorita!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <MainNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
