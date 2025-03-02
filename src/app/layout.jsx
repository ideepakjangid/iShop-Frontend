import "@/app/globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"], // Specify language subsets
  weight: ["400", "600"], // Specify font weights
});

export default function Layout({ children }) {
    return (
      <html>
        <body className={`${montserrat.className}`}>
          <Toaster />
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    );
  }
  