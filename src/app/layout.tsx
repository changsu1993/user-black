import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./header";
import fonts from "@/config/fonts";
import Footer from "./footer";
import AlertDialog from "@/components/dialogs/Alert";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "Who is Black",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(fonts.appleSDGothic.className, "bg-white")}>

        <Header user={false} />
        <AlertDialog />
        <div>{children} <ToastContainer
          position="top-center"
          style={{ fontSize: "16px" }}
        /></div>
        <Footer />


      </body>
    </html>
  );
}
