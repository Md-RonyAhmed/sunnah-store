import { BiSupport } from "react-icons/bi";
import { SiShopee } from "react-icons/si";
import { MdPhone } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";

const Marquee = () => {
  const marqueeContent = (
    <>
      <div className="flex items-center text-xs gap-2">
        <SiShopee className="text-base text-[#4caf50]" />
        Welcome to Sunnah, a Multivendor Shop
      </div>

      <div className="flex items-center">
        <div className="flex items-center gap-2 mr-4 text-xs">
          <BiSupport className="text-base text-[#4caf50]" />
          24/7 Support
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs">Contact</span>
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
      className="bg-[#f2f2f2] py-2 md:py-4 overflow-hidden relative"
    >
      <div className="container mx-auto relative overflow-hidden">
        <div className="flex justify-between space-x-8 min-w-max pr-8">
          {marqueeContent}
        </div>
      </div>
    </section>
  );
};

export default Marquee;

