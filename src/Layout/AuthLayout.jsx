import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Loading from "../components/Shared/Loading";
import { StickyNavbar } from "../components/Shared/Header/StickyNavbar";

const AuthLayout = () => {
  const navigation = useNavigation();
  return (
    <div>
      <StickyNavbar/>
      <div className="min-h-screen container">
        {navigation.state === "loading" ? <Loading /> : <Outlet />}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
