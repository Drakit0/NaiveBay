import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ButtonThemeProvider from "../../components/Contexts/ButtonThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NaiveBay",
  description: "An auction site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ButtonThemeProvider>{children}</ButtonThemeProvider>
      </body>
    </html>
  );
}
