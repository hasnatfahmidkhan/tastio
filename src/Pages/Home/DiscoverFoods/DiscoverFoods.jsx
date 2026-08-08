import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Star, Flame, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import SectionHeader from "../../../Components/SectionHeader/SectionHeader";
import CardSkeleton from "../../../Components/CardSkeleton/CardSkeleton";

const tabs = [
  { id: "trending", label: "Trending Now", icon: Flame, color: "text-error" },
  {
    id: "top-rated",
    label: "Top Rated",
    icon: Star,
    color: "text-warning",
  },
];

const DiscoverFoods = ({ trendingRef }) => {
  const [activeTab, setActiveTab] = useState("trending");
  const axiosPublic = useAxios();

  // Fetch trending foods
  const { data: trendingFoods = [], isLoading: trendingLoading } = useQuery({
    queryKey: ["trending-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/trending");
      return res.data;
    },
  });

  // Fetch top rated foods
  const { data: topRatedFoods = [], isLoading: topRatedLoading } = useQuery({
    queryKey: ["top-rated-foods"],
    queryFn: async () => {
      const res = await axiosPublic.get("/foods/top-rated");
      return res.data;
    },
  });

  return (
    <section ref={trendingRef} className="scroll-mt-14 py-16 overflow-hidden">
      {/* Section Header */}
      <SectionHeader
        heading="Discover Foods"
        subHeading="Explore what's hot and what's loved by our community."
        badge="Food Picks"
        icon={Sparkles}
        badgeColor="text-primary"
        align="left"
      >
        <Link
          to="/all-foods"
          className="hidden md:flex btn btn-ghost group hover:text-primary transition-colors"
        >
          View All Foods{" "}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </SectionHeader>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              <Icon
                size={16}
                className={isActive ? "fill-white" : tab.color}
              />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "trending" ? (
          <motion.div
            key="trending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {trendingLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Marquee
                speed={40}
                pauseOnHover={true}
                autoFill
                gradient={false}
              >
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
                          loading="lazy"
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                          <Star
                            size={12}
                            className="text-warning fill-warning"
                          />
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
            )}
          </motion.div>
        ) : (
          <motion.div
            key="top-rated"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {topRatedLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <Marquee
                speed={35}
                pauseOnHover={true}
                autoFill
                gradient={false}
                direction="right"
              >
                {topRatedFoods.map((item) => (
                  <Link
                    key={item._id}
                    to={`/food-details/${item._id}`}
                    className="mx-3 block group"
                  >
                    {/* Overlay-style marquee card */}
                    <div className="w-72 h-80 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                      <img
                        loading="lazy"
                        src={item.image}
                        alt={item.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-300" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          {item.category}
                        </span>
                        <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                          <Star
                            size={12}
                            className="text-warning fill-warning"
                          />
                          {item.averageRating > 0
                            ? item.averageRating.toFixed(1)
                            : "New"}
                        </div>
                      </div>

                      {/* Bottom Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-white font-bold text-lg leading-tight mb-1 drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-extrabold text-white drop-shadow-lg">
                            ${item.price}
                          </span>
                          <span className="text-white/60 text-xs font-medium">
                            By {item.restaurantName || "Tastio Seller"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </Marquee>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DiscoverFoods;
