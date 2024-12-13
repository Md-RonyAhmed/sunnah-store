import { useEffect, useState } from "react";
import Ebook from "../../components/Ebook";
import Banner from "../../components/Shared/Header/Banner/Banner";
import AdvertisementModal from "../../components/AdvertisementModal";
import OfferTimer from "./OfferTimer";
import Categories from "./categories/Categories";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const targetDate = "2024-12-15T00:00:00";

  useEffect(() => {
    // Check the sessionStorage value and update the state
    const checkModalState = () => {
      const isModalShown = sessionStorage.getItem("modal");
      if (isModalShown === "false" || !isModalShown) {
        setShowModal(true);
        sessionStorage.setItem("modal", "true");
      }
    };

    // Initial check on component mount
    const initialModalLoad = setTimeout(()=> {
      checkModalState();
    }, 3000);
    
    // Set a timer to reset the sessionStorage value to "false" after 30 mins
    const resetTimer = setTimeout(() => {
      sessionStorage.setItem("modal", "false");
      checkModalState();
    }, 1800000);

    // Cleanup the timer
    return () => {
      clearTimeout(initialModalLoad);
      clearTimeout(resetTimer);
    };

  }, [showModal, setShowModal]);

  return (
    <>
      <div>
        <Banner />
      </div>
      
      <Categories />
      <OfferTimer targetDate={targetDate} />
      <Ebook />
      <AdvertisementModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
