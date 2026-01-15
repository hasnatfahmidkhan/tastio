import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import { Star, Flame, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";

const TrendingNow = ({ trendingRef }) => {
  const axiosPublic = useAxios();

  const { data: trendingFoods = [], isLoading } = useQuery({
    queryKey: ["trending-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/trending");
      return res.data;
    },
  });

  if (isLoading) return null; // Or a skeleton

  return (
    <section ref={trendingRef} className="scroll-mt-14 py-16 overflow-hidden">
      <SectionHeader
        heading="Trending Now"
        subHeading="The most popular dishes people are talking about this week."
        badge="Hot Items"
        icon={Flame}
        badgeColor="text-error"
        align="left"
      ></SectionHeader>

      {/* --- Marquee Slider --- */}
      <Marquee speed={40} pauseOnHover={true} autoFill>
        {trendingFoods.map((item) => (
          <Link
            key={item._id}
            to={`/food-details/${item._id}`}
            className="mx-3 block group"
          >
            <div className="w-72 bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star size={12} className="text-warning fill-warning" />
                  {item.averageRating > 0
                    ? item.averageRating.toFixed(2)
                    : "New"}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">
                  By {item.restaurantName || "Tastio Seller"}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-primary">
                    ${item.price}
                  </span>
                  <span className="text-xs font-medium bg-base-200 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Marquee>
    </section>
  );
};

export default TrendingNow;
