import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/containers/Header";
import { ThemeProvider } from "@/context/ThemeProvider";

const nunito = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Rest Countries",
  description: "A simple app to view information about countries",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
