import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop",
    title: "The Authentic Taste of",
    highlight: "Bangladesh",
    desc: "Discover the best Kacchi, Bhuna Khichuri, and street foods near you.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    title: "Honest Reviews from",
    highlight: "Real Foodies",
    desc: "Join our community to rate, review, and find the top-rated stalls.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    title: "Craving Something",
    highlight: "Delicious?",
    desc: "Explore top-rated restaurants and hidden gems in your city.",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Stop page reload
    if (searchText.trim()) {
      // Redirect to All Foods page with search query
      navigate(`/all-foods?search=${searchText}`);
    }
  };

  return (
    <div className="relative group">
      <Swiper
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop={true}
        effect="fade"
        modules={[Pagination, Autoplay, EffectFade]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="h-[550px] md:h-[650px] lg:h-[750px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <img
                src={slide.image}
                alt="Banner"
                className="h-full w-full object-cover"
              />

              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-transparent to-black/30"></div>

              {/* Content Center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-20">
                {/* Text Animation */}
                <div className="max-w-4xl space-y-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                    {slide.title} <br />
                    <span className="text-primary">{slide.highlight}</span>
                  </h1>
                  <p className="text-gray-200 text-lg md:text-2xl font-medium drop-shadow-md max-w-2xl mx-auto">
                    {slide.desc}
                  </p>
                </div>

                {/* --- Search Bar (The WOW factor) --- */}
                <div className="w-full max-w-2xl mt-10">
                  <form
                    onSubmit={handleSearch}
                    className="relative flex items-center bg-white rounded-full p-2 shadow-2xl transform transition-transform focus-within:scale-105"
                  >
                    {/* Icon */}
                    <div className="pl-4 text-gray-400">
                      <Search size={24} />
                    </div>

                    {/* Input */}
                    <input
                      type="text"
                      placeholder="Search for food (e.g. Burger, Biryani)..."
                      className="flex-1 w-full bg-transparent p-4 text-lg md:text-xl text-gray-800 placeholder-gray-400 focus:outline-none"
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                    />

                    {/* Button */}
                    <button
                      type="submit"
                      className="btn btn-primary rounded-full px-8 md:px-10 h-12 md:h-14 text-lg font-bold border-none"
                    >
                      Search
                    </button>
                  </form>

                  {/* Quick Tags (Optional UX booster) */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-white/80">
                    <span>Popular:</span>
                    <button
                      type="button"
                      onClick={() => navigate("/all-foods?category=Biryani")}
                      className="hover:text-primary underline cursor-pointer"
                    >
                      Biryani
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/all-foods?category=Pizza")}
                      className="hover:text-primary underline cursor-pointer"
                    >
                      Pizza
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("/all-foods?category=Burger")}
                      className="hover:text-primary underline cursor-pointer"
                    >
                      Burger
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
