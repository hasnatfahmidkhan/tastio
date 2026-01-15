import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Utensils } from "lucide-react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

const CategorySection = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxios(); // Use public axios (no token needed)

  // FETCH DYNAMIC CATEGORIES
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosPublic.get("/categories");
      return res.data;
    },
  });

  if (isLoading) return <div>Loading Categories...</div>;

  const handleCategoryClick = (categoryName) => {
    navigate(`/all-foods?category=${categoryName}`);
  };

  return (
    <section className="py-20 bg-base-100 relative">
      <div className="">
        {/* Header Section */}
        <SectionHeader
          heading="Browse by Category"
          subHeading="Explore our diverse menu curated just for you."
          badge="Categories"
          icon={Utensils}
          align="left"
        >
          {/* Right Side Content: Custom Navigation Buttons */}
          <div className="flex gap-2">
            <button className="swiper-prev w-12 h-12 rounded-full border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer bg-base-100 z-10">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-next w-12 h-12 rounded-full border border-base-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer bg-base-100 z-10">
              <ChevronRight size={24} />
            </button>
          </div>
        </SectionHeader>

        {/* Swiper Slider */}
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          freeMode={true}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 30 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
            1280: { slidesPerView: 6, spaceBetween: 30 },
          }}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          className="mySwiper px-4 py-8"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat.id} className="pb-12">
              <div
                onClick={() => handleCategoryClick(cat.name)}
                className="group shadow-lg relative cursor-pointer flex flex-col items-center p-6 bg-base-100 border border-base-200 rounded-3xl transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-2 h-full "
              >
                {/* Image Container */}
                <div className="relative w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
                  <img
                    loading="lazy"
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-500 border-4 border-base-100"
                  />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors mb-1">
                  {cat.name}
                </h3>
                <span className="text-xs font-semibold text-gray-400 bg-base-200 px-3 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {cat.count} Items
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategorySection;
