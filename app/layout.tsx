import type { Metadata } from "next";
import { Roboto } from "next/font/google";
// import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from './components/Navbar';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const roboto = Roboto({
  subsets: ["latin"],
  weight: "500",
  display: "swap"
});

export const metadata: Metadata = {
  title: "AYLLU",
  description: "Keep your family close",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${roboto.className} w-screen h-screen antialiased bg-gradient-to-b from-orange-500 to-orange-400 text-slate-50`}
          >
            <div className ="z-40 absolute w-15 h-full grid-col shadow-2xl pr-5 py-5 justify-between items center backdrop-blur-sm bg-transparent/20 text-black">

{/* <a href="/"><p className="rounded-xl bg-nuetral-900 hover:bg-neutral-400 active:bg-neutral-500 transition-all duration-200 px-3 py-2">test nav</p></a> */}

</div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
