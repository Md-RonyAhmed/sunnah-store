import ScrollToTop from "react-scroll-to-top";

const ScrollToTopBtn = () => {
  return (
    <ScrollToTop
      smooth
      color="#fff"
      top="400"
      className="!z-50 flex items-center justify-center animate-bounce !bg-primary !ring-2 !ring-white"
    />
  );
};

export default ScrollToTopBtn;
