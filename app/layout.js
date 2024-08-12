import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/Components/Footer";
import SessionWrapper from "@/Components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Buy Me A Cookie - Support Your Favorite Creators!",
  description:
    "Buy Me A Cookie is a platform for creators to receive support from their fans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} text-white top-0 z-[-2] min-h-screen min-w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] flex flex-col`}
      >
        <SessionWrapper>
          <div className="flex-1">{children}</div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
