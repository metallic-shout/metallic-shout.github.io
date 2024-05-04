import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./provider";
import { getStaticParams } from "@/components/locales/server";
import { WithToolBox } from "@/components/tool-box";
import { TopBar } from "./top-bar";
import { setStaticParamsLocale } from "next-international/server";
import { DetectorTheme } from "./detector-theme";
import { PiMoonFill } from "react-icons/pi";
import { FiSun } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metallic Shout",
  description: "All humans must shout metallic.",
  manifest: "/manifest.webmanifest",
};

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  setStaticParamsLocale(locale);
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Provider>
          <TopBar currentLocale={locale}>
            <DetectorTheme>
              <PiMoonFill className="w-7 h-7" />
              <FiSun className="w-7 h-7" />
            </DetectorTheme>
          </TopBar>
          <WithToolBox />
          <main className="overflow-y-auto overflow-x-hidden">{children}</main>
        </Provider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return getStaticParams();
}
