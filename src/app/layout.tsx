import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import Providers from "@/providers/Providers";
import { Toaster } from "@/components/Toast";
import ToggleTheme from "@/components/ToggleTheme";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata = {
  title: "AirBnB",
  description: "AirBnB Clone in NextJS 13",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster position="bottom-right" />
        <Providers>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28 bg-[#f5f5f5] dark:bg-[#050505]/[0.5]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
