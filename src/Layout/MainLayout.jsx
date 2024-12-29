import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Loading from "../components/Shared/Loading";
import ScrollToTopBtn from "../components/Shared/ScroollToTop/ScrollToTopBtn";
import { StickyNavbar } from "../components/Shared/Header/StickyNavbar";
import Marquee from "../components/Shared/Header/Marquee";

const MainLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <ScrollToTopBtn />
      <Marquee />
      <StickyNavbar/>
      <div className="container min-h-screen">
        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
