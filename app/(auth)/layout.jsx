import Toast from "@/components-assest/Toast";
import Provider from "app/Provider";
import { Nunito } from "next/font/google";
import "../globals.css";

const lato = Nunito({
  variable: "--font-nunito",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Three AGR - Bookshop",
    template: "%s | Three AGR Bookshop",
  },
  description:
    "Three AGR is the world's most international online bookstore offering over 20 million books with free delivery worldwide",
  icons: {
    icon: `${process.env.NEXT_WEBSITE_URL}/images/icon1.png`,
    apple: `${process.env.NEXT_WEBSITE_URL}/images/apple-touch-icon.png`,
    other: {
      rel: "icon",
      sizes: "16x16",
      url: `${process.env.NEXT_WEBSITE_URL}/images/icon-16x16.png`,
    },
  },
  openGraph: {
    title: {
      default: "Three AGR - Bookshop",
      template: "%s | Three AGR Bookshop",
    },
    description:
      "Three AGR is the world's most international online bookstore offering over 20 million books with free delivery worldwide",
    url: `${process.env.NEXT_WEBSITE_URL}`,
    images: [
      {
        url: `${process.env.NEXT_WEBSITE_URL}/images/three-agr-banner.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Three AGR - Bookshop",
      template: "%s | Three AGR Bookshop",
    },
    description:
      "Three AGR is the world's most international online bookstore offering over 20 million books with free delivery worldwide",

    creator: "@AMK_annamalai",
    images: [`${process.env.NEXT_WEBSITE_URL}/images/three-agr-banner.jpg`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} `}>
      <body>
        <main>
          <Provider>
            {children}
            <Toast />
          </Provider>
        </main>
      </body>
    </html>
  );
}
