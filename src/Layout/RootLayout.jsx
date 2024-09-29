import { Outlet } from "react-router";
import Header from "../Components/GlobalComponents/Header";
import Footer from "../Components/GlobalComponents/Footer";
import ScrollToTop from "../Components/ScrollToTop";
export default function RootLayout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet className="w-screen" />
      <Footer />
    </>
  );
}
