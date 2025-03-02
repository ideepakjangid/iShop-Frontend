import Footer from "@/components/website/Footer";
import Header from "@/components/website/Header";
import { Montserrat } from 'next/font/google';
import { Toaster } from "react-hot-toast";


const montserrat = Montserrat({
  subsets: ['latin'], // Specify language subsets
  weight: ['400', '600'], // Specify font weights
});


export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body
        className={`${montserrat.className}`}
        >
          <Toaster />
          <Header />
          {children}
        </body>
      </html>
    );
  }