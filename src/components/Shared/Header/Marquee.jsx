import { BiSupport } from "react-icons/bi";
import { MdPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import logo from "../../../assets/images/logo.png"

const Marquee = () => {
  const marqueeContent = (
    <>
      <div className="flex items-center text-xs gap-2">
        <img src={logo} alt="logo" className="w-6"/>
        Welcome to Sunnah Store, Multi-vendor Online Shop
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-2  text-xs">
          <BiSupport className="text-base text-[#4caf50] " />
          24/7 Support
        </div>

        <div className="flex items-center space-x-2 ml-2">
          <a
            className="inline-flex items-center gap-2 text-xs"
            href="mailto:assunnahfoundationbd@gmail.com"
          >
            <MdOutlineMailOutline className="text-base text-[#4caf50]" />
            assunnahfoundationbd@gmail.com
          </a>
          <a
            className="inline-flex items-center gap-2 text-xs"
            href="tel:+88-09610-001089"
          >
            <MdPhone className="text-base text-[#4caf50]" />
            88-09610-001089
          </a>
        </div>
      </div>
    </>
  );

  return (
    <section
      aria-label="scrolling text"
      className="overflow-hidden relative bg-[#f2f2f2] "
    >
      <div className="container mx-auto py-3 rounded-sm relative overflow-hidden">
        <div className="flex justify-between space-x-8 min-w-max  px-0">
          {marqueeContent}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
