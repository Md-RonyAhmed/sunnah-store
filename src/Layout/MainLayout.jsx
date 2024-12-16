import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Loading from "../components/Shared/Loading";
import ScrollToTopBtn from "../components/Shared/ScroollToTop/ScrollToTopBtn";

const MainLayout = () => {
  const navigation = useNavigation();
  
  const location = useLocation();
  // Scroll to top when the location changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <div>
      <ScrollToTopBtn />
      <Header />
      <div className="container min-h-screen">
        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
