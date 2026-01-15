import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MapPin, Store, ArrowRight, Verified } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import "swiper/css";
import "swiper/css/pagination";
import Marquee from "react-fast-marquee";

const FeaturedRestaurants = () => {
  const axiosPublic = useAxios();

  const { data: restaurants = [], isLoading } = useQuery({
    queryKey: ["featured-restaurants"],
    queryFn: async () => {
      const res = await axiosPublic.get("/restaurants/featured");
      return res.data;
    },
  });

  if (isLoading) return null; // Or skeleton

  return (
    <section className="py-20">
      {/* Header with 'View All' Link */}
      <SectionHeader
        heading="Featured Restaurants"
        subHeading="Top-rated dining spots recommended by our community."
        badge="Top Stalls"
        icon={Store}
        align="left"
      >
        <Link
          to="/all-restaurants"
          className="hidden md:flex btn btn-ghost group hover:text-primary transition-colors"
        >
          View All Stalls{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </SectionHeader>

      {/* Restaurant Slider */}
      <Marquee speed={40} pauseOnHover gradient={false} className="mt-10">
        {restaurants.map((res) => (
          <div key={res._id} className="mx-4 w-[280px]">
            <div className="card bg-base-100 border border-base-200 shadow-md hover:shadow-xl transition-all duration-300 h-full group">
              {/* Cover Image */}
              <figure className="h-40 w-full overflow-hidden relative">
                <img
                  src={
                    res.restaurantImage ||
                    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                  }
                  alt={res.restaurantName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Verified Badge */}
                {res.status === "verified" && (
                  <div
                    className="absolute top-3 right-3 bg-primary p-1 rounded-full shadow-md"
                    title="Verified"
                  >
                    <Verified size={16} className="text-white" />
                  </div>
                )}
              </figure>

              {/* Content */}
              <div className="card-body p-5">
                <h3 className="card-title text-lg font-bold truncate">
                  {res.restaurantName}
                </h3>

                <div className="flex items-start gap-2 text-sm text-gray-500 mt-1 min-h-[40px]">
                  <MapPin size={16} className="shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{res.location}</span>
                </div>

                <div className="card-actions justify-end mt-4 pt-4 border-t border-base-200">
                  <Link
                    to={`/restaurant/${res._id}`}
                    className="btn btn-sm btn-ghost group-hover:text-primary transition-colors gap-1 pl-0"
                  >
                    Visit Stall <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default FeaturedRestaurants;
