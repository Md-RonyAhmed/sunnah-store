import { Carousel } from "@material-tailwind/react"
import BannerImage from "./BannerImage"
import img1 from "../../../../assets/images/cover/img1.png"
import img2 from "../../../../assets/images/cover/image.png"
import img3 from "../../../../assets/images/cover/image2.png"
import img4 from "../../../../assets/images/cover/image3.png"

const Banner = () => {
  return (
    <Carousel className="h-[450px] my-20" autoplay autoplayDelay={4000} loop={true}>
     <BannerImage src={img1} alt={"image 1"}/>
     <BannerImage src={img2} alt={"image 2"}/>
     <BannerImage src={img3} alt={"image 3"}/>
     <BannerImage src={img4} alt={"image 4"}/>
    </Carousel>
  )
}

export default Banner