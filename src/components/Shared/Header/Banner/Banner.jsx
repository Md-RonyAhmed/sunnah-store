import { Carousel } from "@material-tailwind/react";
import BannerImage from "./BannerImage";
import img1 from "../../../../assets/images/cover/img1.png";
import img2 from "../../../../assets/images/cover/image6.png";
import img3 from "../../../../assets/images/cover/image2.png";
import img4 from "../../../../assets/images/cover/image3.png";
import img5 from "../../../../assets/images/cover/img4.webp";
import img6 from "../../../../assets/images/cover/img5.webp";
import img7 from "../../../../assets/images/cover/image.png";

const Banner = () => {
  return (
    <Carousel
      className="h-[450px] my-3"
      autoplay
      autoplayDelay={4000}
      loop={true}
    >
      <BannerImage src={img1} alt={"image 1"} />
      <BannerImage src={img2} alt={"image 2"} />
      <BannerImage src={img3} alt={"image 3"} />
      <BannerImage src={img4} alt={"image 4"} />
      <BannerImage src={img5} alt={"image 5"} />
      <BannerImage src={img6} alt={"image 6"} />
      <BannerImage src={img7} alt={"image 7"} />
    </Carousel>
  );
};

export default Banner;
