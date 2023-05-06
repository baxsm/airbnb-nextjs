import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import getCurrentUser from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import Providers from "@/providers/Providers";

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
        <ToasterProvider />
        <Providers>
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
          <div className="pb-20 pt-28">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
