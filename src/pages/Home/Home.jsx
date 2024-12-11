import { useEffect, useState } from "react";
import Ebook from "../../components/Ebook";
import Banner from "../../components/Shared/Header/Banner/Banner";
import AdvertisementModal from "../../components/AdvertisementModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check the localStorage value and update the state
    const checkModalState = () => {
      const isModalShown = localStorage.getItem("modal");
      if (isModalShown === "false" || !isModalShown) {
        setShowModal(true);
        localStorage.setItem("modal", "true");
      }
    };

    // Initial check on component mount
    checkModalState();
    // Set a timer to reset the localStorage value to "false" after 24 hours
    const resetTimer = setTimeout(() => {
      localStorage.setItem("modal", "false");
      checkModalState();
    }, 50000); // 24 hours in milliseconds

    // Cleanup the timer
    return () => clearTimeout(resetTimer);
  }, [showModal]);

  return (
    <>
      <div>
        <Banner />
      </div>
      <h1>Home</h1>
      <Ebook />
      <AdvertisementModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default Home;
