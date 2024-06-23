import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import image1 from "../assets/hero1.webp";
import image2 from "../assets/hero2.webp";
import image3 from "../assets/hero3.webp";
import image4 from "../assets/hero4.webp";
import { Card, CardContent } from "./ui/card";

const carouselImages = [image1, image2, image3, image4];

const HeroCarousel = () => {
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {carouselImages.map((img, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className='p-2'>
                    <img
                      src={img}
                      alt='hero'
                      className='w-full h-[24rem] rounded-md object-cover'
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
export default HeroCarousel;
