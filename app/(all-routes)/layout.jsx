import Toast from "@/components-assest/Toast";
import Footer from "@/components-navigation/Footer";
import Nav from "@/components-navigation/Nav";
import TopBar from "@/components-navigation/TopBar";
import Provider from "app/Provider";
import { Nunito, Roboto_Mono, Josefin_Sans, Itim } from "next/font/google";
import "../globals.css";

const josefin = Josefin_Sans({
  variable: "--font-josefin-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const lato = Nunito({
  variable: "--font-nunito",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto_Mono({
  variable: "--font-roboto-mono",
  weight: ["100", "300", "400", "700"],
  subsets: ["greek"],
  display: "swap",
});

const itim = Itim({
  variable: "--font-itim",
  weight: ["400"],
  display: "swap",
  subsets: ["vietnamese"],
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
    <html
      lang="en"
      className={`${lato.variable} ${josefin.variable} ${roboto.variable} ${itim.variable}`}
    >
      <body>
        <main>
          <Provider>
            <div className=" z-40 sticky top-0">
              <TopBar />
              <Nav />
            </div>
            {children}
            <Footer />
            <Toast />
          </Provider>
        </main>
      </body>
    </html>
  );
}
