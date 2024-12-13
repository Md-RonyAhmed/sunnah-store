import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header/Header";
import Footer from "../components/Shared/Footer/Footer";
import Pride from "../components/pride/Pride";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <div className="min-h-full container">
        <Outlet />
      </div>
      <div>
        <Pride />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
