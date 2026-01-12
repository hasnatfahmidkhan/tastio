import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

const categories = [
  { id: 1, name: "Biryani", image: "https://i.ibb.co/image1.jpg", count: 15 },
  { id: 2, name: "Burger", image: "https://i.ibb.co/image2.jpg", count: 8 },
  { id: 3, name: "Pizza", image: "https://i.ibb.co/image3.jpg", count: 12 },
  { id: 4, name: "Dessert", image: "https://i.ibb.co/image4.jpg", count: 20 },
  { id: 5, name: "Drinks", image: "https://i.ibb.co/image5.jpg", count: 5 },
  {
    id: 6,
    name: "Traditional",
    image: "https://i.ibb.co/image6.jpg",
    count: 30,
  },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/all-foods?category=${categoryName}`);
  };

  return (
    <section className="my-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-2">
        Browse by Category
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Find your favorite food by category
      </p>

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        freeMode={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: ".swiper-prev",
          nextEl: ".swiper-next",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 30 },
          1024: { slidesPerView: 5, spaceBetween: 40 },
        }}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id} className="pb-10">
            <div
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer flex flex-col items-center p-4 border rounded-xl hover:shadow-xl transition-all duration-300 bg-base-100 hover:border-primary"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3 ring-2 ring-primary ring-offset-2 group-hover:scale-110 transition-transform">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-gray-400">{cat.count}+ Items</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows Below */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="swiper-prev cursor-pointer p-2">
          <ChevronLeft size={28} className="text-primary" />
        </div>
        <div className="swiper-next cursor-pointer p-2">
          <ChevronRight size={28} className="text-primary" />
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
