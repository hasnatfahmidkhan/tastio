// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
const images = [
  "https://wallpapers.com/images/hd/enticing-beef-biryani-alxjyx8lqihcmcfx.jpg",
  "https://media.istockphoto.com/id/1029701094/photo/jhalmuri-mixture-chaat-being-sold-by-a-fast-food-vendor.jpg?s=612x612&w=0&k=20&c=HC-ZbsmqPDX_edBFjsNHNR8jEYJQ2dAXdpKJ1ZA7t3I=",
  "https://img.freepik.com/free-photo/indian-dhal-spicy-curry-bowl-spices-herbs-rustic-black-wooden-table_2829-18712.jpg?semt=ais_hybrid&w=740&q=80",
  "https://media.istockphoto.com/id/1314329942/photo/goal-gappa-or-pani-puri.jpg?s=612x612&w=0&k=20&c=l6akiKMfTLE9nR4VonhiOZpZGDY4aEjimAN-BSskF-A=",
];
const Banner = () => {
  return (
    <div className="md:mt-5">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
        }}
        className="h-[300px] md:h-[450px] xl:h-[650px] 2xl:h-[700px] rounded-md overflow-hidden"
      >
        {images.map((img) => (
          <SwiperSlide>
            <div className="relative h-full w-full ">
              <img src={img} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 text-base-100 flex flex-col items-center justify-center text-center bg-black/35 px-4">
                <h1 className="text-3xl md:text-5xl font-semibold uppercase mb-2 md:mb-4 tracking-wide">
                  Taste. Share. Belong.
                </h1>
                <p className="text-base md:text-2xl font-medium tracking-wide uppercase">
                  Tastio, the local food lover networks — where every bite tells
                  a story.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
